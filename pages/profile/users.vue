<script setup>
const PER_PAGE = 24;

const users = useState(() => [])
const page = useState(() => 1)
const isLoading = useState(() => false)
const isFinish = useState(() => false)

const onRequest = async () => {
  if (!isLoading.value && !isFinish.value) {
    isLoading.value = true
    const newUsers = await $request(`user/search/${page.value}/${PER_PAGE}`)
    users.value = users.value.concat(newUsers)
    page.value++
    isLoading.value = false
    if (newUsers.length < PER_PAGE) isFinish.value = true;
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

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 py-6 baseContainer">
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>
