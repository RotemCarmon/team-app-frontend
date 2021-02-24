<template>
  <div v-if="message" class="screen">
    <div class="user-msg modal" :class="message.type">
      <h1>{{ message.txt }}</h1>
      <button class="btn" @click="closeMsg">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-msg',
  computed: {
    message() {
      return this.$store.getters.message;
    },
  },

  methods: {
    closeMsg() {
      this.$store.commit('sendMsg', null);
    },
  },
};
</script>

<style>
.screen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.76);
}
.modal {
   white-space: pre-line;
  position: fixed;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  top: 50%;
  left: 50%;
  width: 400px;
  min-height: 160px;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 4px black;
  padding: 12px;
  line-height: 1.2;
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.973);
  border-radius: 3px;
}
@media(max-width:480px) {
  .modal {
  width: 90%;

  }
}
.warning {
  border: 4px solid rgb(155, 59, 59);
}
.success {
  border: 4px solid rgb(90, 199, 90);
}
</style>