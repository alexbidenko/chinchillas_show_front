<template>
  <div class="evaluation">
    <table class="w-100">
      <thead>
        <tr>
          <th>критерии/criterias</th>
          <th>максимальное количество балов/maximum quantity of points</th>
          <th>оценка/points</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>качество шерсти/quality</td>
          <td>
            <v-btn
              text
              type="button"
              class="m-0 px-2 evaluation__button"
              @click="quality = 10"
            >
              10
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="quality = 12"
            >
              12
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="quality = 14"
            >
              14
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="quality = 16"
            >
              16
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="quality = 17"
            >
              17
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="quality = 18"
            >
              18
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="quality = 19"
            >
              19
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="quality = 20"
            >
              20
            </v-btn>
          </td>
          <td>
            <input
              id="quality"
              v-model="quality"
              type="number"
              min="10"
              max="20"
              step="1"
              @blur="qualityBlur"
            />
            <input
              id="qualityAdd"
              v-model="qualityAdd"
              type="number"
              step="0.5"
            />
          </td>
        </tr>
        <tr>
          <td>размер/size</td>
          <td>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="size = 10"
            >
              10
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="size = 12"
            >
              12
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="size = 14"
            >
              14
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="size = 16"
            >
              16
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="size = 17"
            >
              17
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="size = 18"
            >
              18
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="size = 19"
            >
              19
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="size = 20"
            >
              20
            </v-btn>
          </td>
          <td>
            <input
              id="size"
              v-model="size"
              type="number"
              min="10"
              max="20"
              step="1"
              @blur="sizeBlur"
            />
            <input id="sizeAdd" v-model="sizeAdd" type="number" step="0.5" />
          </td>
        </tr>
        <tr>
          <td>форма тела/body shape</td>
          <td>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="shape = 1"
            >
              1
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="shape = 2"
            >
              2
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="shape = 3"
            >
              3
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="shape = 4"
            >
              4
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="shape = 5"
            >
              5
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="shape = 6"
            >
              6
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="shape = 7"
            >
              7
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="shape = 8"
            >
              8
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="shape = 9"
            >
              9
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="shape = 10"
            >
              10
            </v-btn>
          </td>
          <td>
            <input
              id="shape"
              v-model="shape"
              type="number"
              min="1"
              max="10"
              step="1"
              @blur="shapeBlur"
            />
            <input id="shapeAdd" v-model="shapeAdd" type="number" step="0.5" />
          </td>
        </tr>
        <tr>
          <td>форма головы/head</td>
          <td>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="head = 1"
            >
              1
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="head = 2"
            >
              2
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="head = 3"
            >
              3
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="head = 4"
            >
              4
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="head = 5"
            >
              5
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="head = 6"
            >
              6
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="head = 7"
            >
              7
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="head = 8"
            >
              8
            </v-btn>
          </td>
          <td>
            <input
              id="head"
              v-model="head"
              type="number"
              min="1"
              max="8"
              step="1"
              @blur="headBlur"
            />
            <input id="headAdd" v-model="headAdd" type="number" step="0.5" />
          </td>
        </tr>
        <tr>
          <td>окрас/color</td>
          <td>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="color = 10"
            >
              10
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="color = 12"
            >
              12
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="color = 14"
            >
              14
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="color = 16"
            >
              16
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="color = 17"
            >
              17
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="color = 18"
            >
              18
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="color = 19"
            >
              19
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="color = 20"
            >
              20
            </v-btn>
          </td>
          <td>
            <input
              id="color"
              v-model="color"
              type="number"
              min="10"
              max="20"
              step="1"
              @blur="colorBlur"
            />
            <input id="colorAdd" v-model="colorAdd" type="number" step="0.5" />
          </td>
        </tr>
        <tr>
          <td>рисунок/clearlines</td>
          <td>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="clearlines = 8"
            >
              8
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="clearlines = 10"
            >
              10
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="clearlines = 12"
            >
              12
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="clearlines = 14"
            >
              14
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="clearlines = 16"
            >
              16
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="clearlines = 17"
            >
              17
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="clearlines = 18"
            >
              18
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="clearlines = 19"
            >
              19
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="clearlines = 20"
            >
              20
            </v-btn>
          </td>
          <td>
            <input
              id="clearlines"
              v-model="clearlines"
              type="number"
              min="10"
              max="20"
              step="1"
              @blur="clearlinesBlur"
            />
            <input
              id="clearlinesAdd"
              v-model="clearlinesAdd"
              type="number"
              step="0.5"
            />
          </td>
        </tr>
        <tr>
          <td>шелковистость/silkines</td>
          <td>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="silkines = 1"
            >
              1
            </v-btn>
          </td>
          <td>
            <input
              id="silkines"
              v-model="silkines"
              type="number"
              min="0"
              max="1"
              @blur="silkinesBlur"
            />
            <input
              id="silkinesAdd"
              v-model="silkinesAdd"
              type="number"
              step="0.5"
            />
          </td>
        </tr>
        <tr>
          <td>окрас живота/belly</td>
          <td>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="belly = 1"
            >
              1
            </v-btn>
          </td>
          <td>
            <input
              id="belly"
              v-model="belly"
              type="number"
              min="0"
              max="1"
              @blur="bellyBlur"
            />
            <input id="bellyAdd" v-model="bellyAdd" type="number" step="0.5" />
          </td>
        </tr>
        <tr>
          <td>Ангора/RPA</td>
          <td>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="RPA = 1"
            >
              1
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="RPA = 2"
            >
              2
            </v-btn>
            <v-btn
              type="button"
              text
              class="m-0 px-2 evaluation__button"
              @click="RPA = 3"
            >
              3
            </v-btn>
          </td>
          <td>
            <input
              id="RPA"
              v-model="RPA"
              type="number"
              min="0"
              max="3"
              step="1"
              @blur="RPABlur"
            />
            <input id="RPAAdd" v-model="RPAAdd" type="number" step="0.5" />
          </td>
        </tr>
        <tr>
          <td>итого/total</td>
          <td>
            <p>100</p>
          </td>
          <td>
            <p>{{ total }}</p>
          </td>
        </tr>
      </tbody>
    </table>

    <p class="mb-0 mt-2" style="font-size: 16px">комментарии/comments</p>
    <div class="input-field m-0">
      <textarea
        id="comments"
        v-model="comments"
        class="materialize-textarea m-0"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    quality: '',
    size: '',
    shape: '',
    head: '',
    color: '',
    clearlines: '',
    silkines: '',
    belly: '',
    RPA: '',

    qualityAdd: '',
    sizeAdd: '',
    shapeAdd: '',
    headAdd: '',
    colorAdd: '',
    clearlinesAdd: '',
    silkinesAdd: '',
    bellyAdd: '',
    RPAAdd: '',

    comments: '',
  }),

  computed: {
    total() {
      return (
        Number(this.quality) +
        Number(this.size) +
        Number(this.shape) +
        Number(this.head) +
        Number(this.color) +
        Number(this.clearlines) +
        Number(this.silkines) +
        Number(this.belly) +
        Number(this.RPA)
      )
    },
  },
  methods: {
    qualityBlur() {
      const arr = [10, 12, 14, 16, 17, 18, 19, 20]
      if (!arr.includes(Number(this.quality))) this.quality = ''
    },
    sizeBlur() {
      const arr = [10, 12, 14, 16, 17, 18, 19, 20]
      if (!arr.includes(Number(this.size))) this.size = ''
    },
    shapeBlur() {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      if (!arr.includes(Number(this.shape))) this.shape = ''
    },
    headBlur() {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8]
      if (!arr.includes(Number(this.head))) this.head = ''
    },
    colorBlur() {
      const arr = [10, 12, 14, 16, 17, 18, 19, 20]
      if (!arr.includes(Number(this.color))) this.color = ''
    },
    clearlinesBlur() {
      const arr = [8, 10, 12, 14, 16, 17, 18, 19, 20]
      if (!arr.includes(Number(this.clearlines))) this.clearlines = ''
    },
    silkinesBlur() {
      const arr = [0, 1]
      if (!arr.includes(Number(this.silkines))) this.silkines = ''
    },
    bellyBlur() {
      const arr = [0, 1]
      if (!arr.includes(Number(this.belly))) this.belly = ''
    },
    RPABlur() {
      const arr = [0, 1, 2, 3]
      if (!arr.includes(Number(this.RPA))) this.RPA = ''
    },
  },
}
</script>

<style scoped lang="scss">
.evaluation {
  & &__button {
    min-width: 36px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }
  td {
    line-height: 36px;
  }
  td,
  th {
    padding: 1px 3px;
    border: 1px solid black;
    text-align: center;
    font-size: 16px;
  }
  input {
    border: 0;
    width: 40%;
    text-align: center;
    display: inline-block;
  }
  p {
    display: inline-block;
    margin-bottom: 0;
  }
  input[type='number'] {
    width: 40px !important;
    display: inline;
  }
}
</style>
