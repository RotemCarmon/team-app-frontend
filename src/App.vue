<template>
  <div id="app">
    <app-header />
    <router-view />
    <user-msg />
  </div>
</template>
<script>
import appHeader from './cmps/app-header';
import userMsg from './cmps/user-msg';

export default {
  name: 'App',
  components: {
    userMsg,
    appHeader,
  },
};
</script>
<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  padding: 0 6px;
  max-width: 980px;
  margin: 0 auto;
}
@media (max-width: 980px) {
  .container {
    max-width: 700px;
  }
}
@media (max-width: 700px) {
  .container {
    padding: 0 10px;
    max-width: 480px;
  }
}

button {
  all: unset;
  text-align: center;
  cursor: pointer;
  color: #222222;
  min-width: 80px;
  border-radius: 4px;
}

.btn {
  background-color: rgb(230, 230, 230);
  border: 1px solid rgb(179, 179, 179);
  padding: 12px 8px;
  font-size: 1.2em;
  &:hover {
    border: 1px solid rgb(221, 221, 221);
  }
}
.form-el {
  margin-bottom: 18px;
  min-width: 260px;
  height: 40px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  border-image: initial;
}
label {
  font-size: 1.1em;
  margin-bottom: 3px;
}
.list-footer {
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 420px;
  bottom: unset;
  display: flex;
  height: 80px;
  width: 100%;
}
@media (max-width: 600px) {
  .list-footer {
    top: unset;
    bottom: 0;
    background-color: whitesmoke;
  }
}
</style>
