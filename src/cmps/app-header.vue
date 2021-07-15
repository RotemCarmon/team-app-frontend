<template>
  <header class="">
    <div class="header-container container">
      <div class="nav-bar">
        <router-link to="/">Home</router-link>
        <div class="divider"></div>
        <router-link to="/teams">List</router-link>
      </div>
      <router-link v-if="!loggedinUser" to="/login">Login</router-link>
      <a v-else @click="logout">Logout</a>
    </div>
  </header>
</template>

<script>
export default {
  name: "app-header",
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      const goTo = "/";
      if (!this.$router.currentRoute.path === goTo)
        this.$router.push(goTo).catch(() => {});
    },
  },
};
</script>

<style lang="scss">
header {
  background-color: whitesmoke;
  padding: 2px 0;
  margin-bottom: 40px;
}
.header-container {
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  .nav-bar {
    display: flex;
    height: 100%;
  }
  a {
    display: flex;
    font-size: 1.2em;
    align-items: center;
    font-weight: bold;
    height: 100%;
    color: #2c3e50;
    text-decoration: none;
    cursor: pointer;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .divider {
    margin: 12px 10px;
    width: 1px;
    background-color: #2c3e50;
  }
}
</style>