<template>
  <div class="login-container" @keyup.enter="login">
    <h1>Login</h1>
    <label for="your-team">Username</label>
    <input
      v-model="cred.username"
      class="username form-el"
      type="text"
      placeholder="Enter Username"
    />
    <label for="your-team">Password</label>
    <input
      v-model="cred.password"
      class="password form-el"
      type="password"
      placeholder="Enter Password"
    />
    <div v-if="isError" class="validation-error">{{ error }}</div>
    <div class="list-footer">
      <button class="btn" @click="login">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-page',
  data() {
    return {
      cred: {
        username: '',
        password: '',
      },
      error: '* Must enter username and password',
      isError: false,
    };
  },
  methods: {
    async login() {
      try {
        const { username, password } = this.cred;
        if (!password || !username) {
          this.isError = true;
          return;
        }
        this.isError = false;
        this.$store.dispatch('login', this.cred);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    appearance: unset;
    padding-left: 6px;
  }
  .validation-error {
    color: red;
    font-size: 0.9em;
    height: 14px;
  }
}
</style>