<script lang="ts" setup>
const settingsStore = useSettingsStore();
</script>

<template>
  <Html lang="ru" :style="`font-size: ${settingsStore.interfaceScale}px`" />
  <Head>
    <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d79b00" />
    <Meta name="msapplication-TileColor" content="#d79b00" />
    <Meta name="theme-color" content="#ffffff" />
  </Head>
  <Body class="p-light" />

  <VitePwaManifest />
  <NuxtLoadingIndicator />
  <NuxtPage />

  <ClientOnly>
    <ConfirmDialog />
  </ClientOnly>
</template>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
