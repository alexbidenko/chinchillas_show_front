<script>
import statuses from '~/assets/datas/statuses.json'
import {mapStores} from "pinia";

const CURRENCIES = {
  RUB: '₽',
  EUR: '€',
}

export default {
  name: 'ChinchillaHeaderStatus',

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      statusesDialog: false,
      updatedStatus: null,
      prices: [
        {
          currency: 'RUB',
          symbol: '₽',
          value: '',
        },
        {
          currency: 'EUR',
          symbol: '€',
          value: '',
        },
      ],
      breederId: 0,
      notInSite: false,
      userId: +this.$cookies.get('USER_ID'),
      isOpenComments: false,
      showTimeline: true,
      isRequest: false,
      breederItems: [],
      isLoadingBreeder: false,
      breederSearch: '',
      timers: {},
    }
  },

  computed: {
    ...mapStores(useUserStore),
    statuses() {
      return statuses
    },
  },

  watch: {
    updatedStatus() {
      this.showTimeline = false
    },
    breederSearch(val) {
      this.searchBreeder(val)
    },
  },

  methods: {
    dateFormat(timestamp) {
      return dateFormat(timestamp, 'yyyy.MM.dd hh:mm')
    },
    status(key) {
      return this.data ? statuses.find((el) => el.key === key)?.label ?? '' : ''
    },
    saveStatus() {
      this.isRequest = true
      $request('chinchilla/create/status', {
        method: 'post',
        body: {
          name: this.updatedStatus,
          chinchillaId: this.data.id,
          prices:
            this.updatedStatus === 'sale'
              ? this.prices
                .filter((f) => f.value)
                .map(({ currency, value }) => ({
                  currency,
                  value,
                }))
              : undefined,
          targetUserId:
            this.updatedStatus === 'sold'
              ? this.notInSite
                ? null
                : this.breederId
              : undefined,
          sourceUserId: this.updatedStatus === 'sold' ? this.userId : undefined,
        },
      })
        .then((data) => {
          this.isRequest = false
          this.statusesDialog = false
          this.breederSearch = ''
          this.breederId = 0
          this.$emit('updateStatuses', [data, ...this.data.statuses])
          this.$emit('updateOwner')
        })
        .catch(() => alert('Что-то пошло не так'))
    },
    forOvervalue() {
      $request(`chinchilla/color/for-overvalue/${this.data.id}`, { method: 'post' })
        .then(() => {
          this.$emit('updateConclusion', 'overvalue')
        })
    },
    getCurrencies(price) {
      if (!Array.isArray(price) || !price.length) return ''
      return price
        .filter(
          (el) =>
            this.data.owner_id === this.userId ||
            (el.currency === 'RUB' && this.userStore.isRussian) ||
            (el.currency !== 'RUB' && !this.userStore.isRussian)
        )
        .map((el) => `${CURRENCIES[el.currency]}${el.value}`)
        .join(', ')
    },
    searchBreeder(val) {
      clearTimeout(this.timers.breeder)
      this.timers.breeder = setTimeout(() => {
        this.isLoadingBreeder = true
        $request(`user/search?q=${val || ''}&perPage=20`)
          .then((data) => {
            this.breederItems = data.concat(data).map((el) => ({
              ...el,
              fullName: `${el.first_name} ${el.last_name} (${el.login})`,
            }))
            this.isLoadingBreeder = false
          })
      }, 500)
    },
  },
}
</script>

<template>
  <div class="status">
    {{
      status(
        (
          data.statuses.find((el) =>
            statuses.find((s) => el.name === s.key)
          ) || { name: '' }
        ).name
      )
    }}

    <v-menu bottom left>
      <template #activator="{ props }">
        <v-btn
          dark
          icon
          style="margin-right: -12px; margin-left: 12px"
          v-bind="props"
        >
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="statusesDialog = true">
          <v-list-item-title>История статусов</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="userId === data.owner_id && data.conclusion === 'disagree'"
          @click="forOvervalue"
        >
          <v-list-item-title>На переоценку</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-tooltip
      v-if="['disagree', 'overvalue'].includes(data.conclusion)"
      bottom
    >
      <template #activator="{ props }">
        <v-btn
          dark
          icon="info"
          color="warning"
          style="margin-right: -12px; margin-left: 12px"
          v-bind="props"
          @click="isOpenComments = !isOpenComments"
        />
      </template>
      <span>Не соответствует окрас<br />(нажмите для подробностей)</span>
    </v-tooltip>

    <v-dialog v-model="statusesDialog" max-width="520">
      <v-card class="pt-4 status__dialog">
        <v-card-text>
          <v-container
            v-if="userId === data.owner_id"
            style="padding: 0"
          >
            <v-select
              v-model="updatedStatus"
              class="my-2"
              :items="statuses"
              label="Изменить статус"
              item-title="label"
              item-value="key"
            />
          </v-container>

          <v-container v-if="updatedStatus === 'sale'">
            <v-row>
              <v-col
                v-for="price in prices"
                :key="price.currency"
                cols="12"
                sm="6"
                class="px-0"
              >
                <v-text-field
                  v-model="price.value"
                  :prefix="price.symbol"
                  :label="`Цена ${price.currency}`"
                  solo
                  dense
                  type="number"
                />
              </v-col>
            </v-row>
          </v-container>

          <v-container v-else-if="updatedStatus === 'sold'">
            <v-row>
              <v-col cols="12" class="px-0">
                <v-checkbox v-model="notInSite" label="Нет на сайте" />
                <v-autocomplete
                  v-if="!notInSite"
                  v-model="breederId"
                  v-model:search="breederSearch"
                  :items="breederItems"
                  :loading="isLoadingBreeder"
                  item-title="fullName"
                  item-value="id"
                  label="Заводчик"
                  placeholder="Введите имя заводчика"
                  clearable
                />
              </v-col>
            </v-row>
          </v-container>

          <v-row class="mb-2">
            <v-col>
              <p class="font-weight-bold py-2 my-0">История статусов</p>
            </v-col>
            <v-spacer />
            <v-col cols="auto">
              <v-btn :icon="showTimeline ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" variant="text" @click="showTimeline = !showTimeline" />
            </v-col>
          </v-row>

          <v-expand-transition>
            <v-timeline v-show="showTimeline" align-top dense>
              <template v-for="s in data.statuses">
                <v-timeline-item
                  v-if="statuses.find((el) => el.key === s.name)"
                  :key="s.timestamp"
                  small
                  dot-color="primary"
                >
                  <div>
                    <div class="font-weight-normal">
                      <strong>{{ status(s.name) }}</strong>
                      {{
                        getCurrencies(
                          s.prices.filter(
                            (el) => el.currency === (userStore.isRussian ? 'RUB' : 'EUR')
                          )
                        )
                      }}
                    </div>
                    <div>{{ dateFormat(s.timestamp) }}</div>
                  </div>
                </v-timeline-item>
              </template>
            </v-timeline>
          </v-expand-transition>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            v-if="
              updatedStatus &&
              userId === data.owner_id &&
              (updatedStatus !== 'sale' || prices.some((f) => f.value)) &&
              (updatedStatus !== 'sold' || breederId || notInSite)
            "
            color="darken-1"
            variant="text"
            :loading="isRequest"
            @click="saveStatus"
          >
            Сохранить
          </v-btn>

          <v-btn color="darken-1" variant="text" @click="statusesDialog = false">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isOpenComments" max-width="400">
      <v-card>
        <v-toolbar dark color="primary">
          Комментарии
          <v-spacer />
          <v-btn icon dark @click="isOpenComments = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text
          v-for="(comment, index) in data.color_comments"
          :key="comment.id"
          :style="{
            paddingBottom: index !== data.color_comments.length - 1 && 0,
          }"
        >
          <span>{{ comment.content }}</span>
          <v-divider v-if="index !== data.color_comments.length - 1" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.status {
  display: flex !important;
  align-items: center;

  &__dialog {
    .v-text-field__details {
      display: none;
    }
  }
}
</style>
