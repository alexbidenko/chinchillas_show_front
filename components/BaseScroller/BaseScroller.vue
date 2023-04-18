<template>
  <div v-bar class="baseScroller">
    <div ref="scroller" @scroll="onUpdate">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseScroller',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  watch: {
    count() {
      this.$nextTick(() => {
        this.onUpdate()
      })
    },
  },

  methods: {
    onUpdate() {
      if (this.$refs.scroller) {
        this.$emit(
          'scroll',
          this.$refs.scroller.scrollHeight -
            this.$refs.scroller.scrollTop -
            this.$refs.scroller.clientHeight
        )
      }
    },
  },
}
</script>

<style lang="scss">
.baseScroller {
  width: calc(100% + 24px);
  position: relative;

  &.vb-visible::after {
    content: '';
    background: #e5edf4;
    width: 6px;
    border-radius: 10px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
  }

  .vb-dragger {
    border-radius: 10px;
    right: 1px;
    z-index: 5;
    background: #d79b00;
    width: 4px;
    margin: 1px 0;
  }

  .vb-content {
    padding-right: 24px !important;
    box-sizing: border-box !important;
    width: calc(100% + 15px) !important;
  }
}
</style>
