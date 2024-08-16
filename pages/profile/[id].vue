<template>
  <ProfilePage
    :user-id="userId"
    :user="user"
    :sold-chinchillas="soldChinchillas"
    :chinchillas="chinchillas"
  />
</template>

<script setup>
const route = useRoute()
const cookies = useCookie('USER_ID')

const userId = +route.params.id || +cookies.value

const { data } = await useAsyncData(() => Promise.all([
  $request(`user/details/${userId}`),
  $request(`chinchilla/get/${userId}`),
  $request(`chinchilla/sold/${userId}`),
]));
const [
  user,
  chinchillasData,
  soldChinchillas,
] = data.value;

const chinchillas = computed(() => chinchillasData.reduce((arr, el) => {
  if (soldChinchillas.some(f => f.id === el.id)) return arr
  if (!el.status || el.status.name === 'breeding')
    arr[el.sex] = [el, ...(arr[el.sex] || [])]
  else arr[el.status.name] = [el, ...(arr[el.status.name] || [])]
  return arr
}, {}));
</script>
