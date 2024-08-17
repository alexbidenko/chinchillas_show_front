<script lang="ts" setup>
const settingsStore = useSettingsStore();
</script>

<template>
  <div
    class="grid sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 sm:gap-2 md:gap-3"
    :class="{
        'grid-cols-4 gap-1': settingsStore.gridCountValue === 'sm',
        'grid-cols-3 gap-2': settingsStore.gridCountValue === 'md',
        'grid-cols-2 gap-2': settingsStore.gridCountValue === 'lg',
        'grid-cols-1 gap-3': settingsStore.gridCountValue === 'xl',
      }"
  >
    <slot />
  </div>
</template>
