<template>
  <main class="team-app-container main-container">
    <h1>Hello Teams</h1>

    <label for="your-team">Your Name</label>
    <select
      v-model="team.member1"
      id="your-team"
      class="select-your-name form-el"
    >
      <option v-for="(student, idx) in students" :key="idx" :value="student">
        {{ student }}
      </option>
    </select>

    <label for="partner-team">Partner Name</label>
    <select v-model="team.member2" class="select-partner-name form-el">
      <option v-for="(student, idx) in students" :key="idx" :value="student">
        {{ student }}
      </option>
    </select>

    <div class="list-footer">
      <button @click="submitTeam" class="submit-team btn">Submit</button>
    </div>
  </main>
</template>

<script>
import { teamService } from '../services/team.service.js';
export default {
  name: 'team-app',
  data() {
    return {
      team: {
        member1: '',
        member2: '',
      },
      students: [],
    };
  },
  created() {
    this.students = teamService.getStudents();
    this.$store.dispatch('getTeams');
  },
  methods: {
    async submitTeam() {
      if (!this.isVerified()) return;
      this.$store.dispatch('addTeam', this.team);
      this.team = {
        member1: '',
        member2: '',
      };
    },

    isVerified() {
      const { member1, member2 } = this.team;
      if (member1 === '' || member2 === '') {
        this.$store.commit('sendMsg', {
          txt: "Must choose both your name and your partner's name",
          type: 'warning',
        });
        return false;
      } else if (member1 === member2) {
        this.$store.commit('sendMsg', {
          txt: "Can't choose your own name as your partner!",
          type: 'warning',
        });
        return false;
      } else return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.team-app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  select {
    cursor: pointer;
  }
}
</style>