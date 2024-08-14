<template>
  <span class="baseSpinner" :class="{ 'baseSpinner--light': isLight }" />
</template>
<script>
export default {
  name: 'BaseSpinner',

  props: {
    isLight: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style src="./BaseSpinner.scss" lang="scss"></style>
