<template>
  <div class="usersPage baseContainer">
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<script setup>
const users = useState(() => [])
const page = useState(() => 1)
const perPage = useState(() => 10)
const isLoading = useState(() => false)
const isFinish = useState(() => false)

const onRequest = async () => {
  if (!isLoading.value && !isFinish.value) {
    isLoading.value = true
    const newUsers = await $request(`user/search/${page.value}/${perPage.value}`)
    users.value = users.value.concat(newUsers)
    page.value++
    isLoading.value = false
    if (newUsers.length < perPage.value) isFinish.value = true;
  }

  return 'users';
}

const onScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    onRequest()
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

await useAsyncData(() => onRequest());
</script>

<style lang="scss">
.usersPage {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 32px;
  padding-top: 32px;
  padding-bottom: 32px;

  @include mq('desktop') {
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 24px;
  }

  @include mq('desktop-small', 'tablet') {
    grid-template-columns: repeat(4, 1fr);
  }

  @include mq('tablet') {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 16px;
  }
}
</style>
