<template>
  <div class="usersPage baseContainer">
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<script>
import UserCard from '~/components/UserCard/UserCard'

export default {
  name: 'UsersPage',
  components: { UserCard },
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
        return $request
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
