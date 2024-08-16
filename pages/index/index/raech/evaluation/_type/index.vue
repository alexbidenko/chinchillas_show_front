<template>
  <div class="evaluationContainer baseContainer">
    <Evaluation50 v-if="type === '50'" />
    <Evaluation100 v-else-if="type === '100'" />
    <Evaluation100n v-else-if="type === '100n'" />
    <Evaluation81 v-else-if="type === '81'" />
    <Evaluation60 v-else-if="type === '60'" />
  </div>
</template>

<script>
import Evaluation100 from '~/components/evaluations/Evaluation100'
import Evaluation100n from '~/components/evaluations/Evaluation100n'
import Evaluation50 from '~/components/evaluations/Evaluation50'
import Evaluation60 from '~/components/evaluations/Evaluation60'
import Evaluation81 from '~/components/evaluations/Evaluation81'

export default {
  components: {
    Evaluation100,
    Evaluation100n,
    Evaluation50,
    Evaluation60,
    Evaluation81,
  },

  data() {
    return {
      type: this.$route.params.type,
    }
  },

  created() {
    if (!['100', '100n', '50', '60', '81'].includes(this.$route.params.type))
      this.$router.push('/raech')
  },
}
</script>

<style scoped lang="scss">
.evaluationContainer {
  width: 100%;
  padding-top: 120px;
  padding-bottom: 120px;

  & > * {
    width: 100%;
  }
}
</style>
