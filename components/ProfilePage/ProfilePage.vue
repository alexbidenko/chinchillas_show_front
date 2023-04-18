<template>
  <div class="profilePage">
    <ProfileInfo
      v-if="user"
      :user="user"
      :is-owner="isOwner"
      @update="user = $event"
    />
    <div class="profilePage__settings baseContainer">
      <v-select
        v-model="gridCountValue"
        solo
        label="В ряд"
        :items="gridCountItems"
        item-text="label"
        item-value="value"
        class="profilePage__gridCount"
      />
      <v-select
        v-model="sortValue"
        solo
        label="Сортировка шиншилл"
        :items="sortItems"
        item-text="label"
        item-value="value"
        class="profilePage__sorting"
      />
    </div>
    <div
      v-for="(list, key) in sortedChinchillas"
      :key="key"
      :class="`gridCount__${gridCountValue}`"
    >
      <CardSection
        v-if="list.length && key !== 'dead'"
        :section-key="key"
        :items="list"
        :title="
          (statuses.find((el) => el.key === key) || { label: 'Без статуса' })
            .label
        "
      />
    </div>
    <CardSection
      v-if="soldChinchillas && soldChinchillas.length"
      title="Проданные"
      section-key="extra-sold"
      :items="soldChinchillas"
      :default-expand="false"
    />
    <CardSection
      v-if="sortedChinchillas.dead && sortedChinchillas.dead.length"
      :items="sortedChinchillas.dead"
      section-key="extra-dead"
      title="На радуге"
      :default-expand="false"
    />
    <v-fab-transition>
      <v-btn
        v-if="isOwner"
        color="primary"
        style="background-color: #d79b00"
        dark
        fixed
        bottom
        right
        fab
        nuxt
        to="/profile/chinchillas/create"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script src="./ProfilePage.js"></script>

<style lang="scss">
.profilePage {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;

  &__title {
    @include buttonReset;
    font-size: 24px;
  }

  &__settings {
    padding-top: 32px;
    padding-bottom: 0;
    display: flex;
    justify-content: flex-end;
    column-gap: 16px;

    @include mq('tablet-small') {
      column-gap: 8px;
    }
  }

  & &__gridCount {
    display: none;
    max-width: 120px;

    @include mq('tablet-small') {
      display: block;
    }
  }

  & &__sorting {
    max-width: 180px;
  }
}
</style>
