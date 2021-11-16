<template>
  <div class="usersPage">
    <UserBlock v-for="user in users" :key="user.id" :user="user" small />
  </div>
</template>

<script>
import UserBlock from '~/components/UserBlock/UserBlock'

export default {
  name: 'UsersPage',
  components: { UserBlock },
  layout: 'profileLayout',

  data() {
    return {
      users: [],
      page: 1,
      perPage: 10,
      isLoading: false,
      isFinish: false,
    }
  },

  async fetch() {
    await this.onRequest()
  },

  mounted() {
    if (typeof window !== 'undefined')
      window.addEventListener('scroll', this.onScroll)
  },

  beforeDestroy() {
    if (typeof window !== 'undefined')
      window.addEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        this.onRequest()
      }
    },
    onRequest() {
      if (!this.isLoading && !this.isFinish) {
        this.isLoading = true
        return this.$axios
          .$get(`user/search/${this.page}/${this.perPage}`)
          .then((users) => {
            this.page++
            this.users = this.users.concat(users)
            this.isLoading = false
            if (users.length < this.perPage) this.isFinish = true
          })
      }
    },
  },
}
</script>

<style lang="scss">
.usersPage {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
}
</style>
