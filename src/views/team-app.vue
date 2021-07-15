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

    <label for="partner-team1">Partner Name</label>
    <select
      v-model="team.member2"
      id="partner-team1"
      class="select-partner-name form-el"
    >
      <option v-for="(student, idx) in students" :key="idx" :value="student">
        {{ student }}
      </option>
    </select>

    <label v-if="isBiggerTeam" for="partner-team2"
      >Partner Name number two</label
    >
    <select
      v-if="isBiggerTeam"
      v-model="team.member3"
      id="partner-team2"
      class="select-partner-name form-el"
    >
      <option v-for="(student, idx) in students" :key="idx" :value="student">
        {{ student }}
      </option>
    </select>
    <div class="list-footer">
      <button @click="toggleStudent" class="toggle-member-btn btn">
        toggle member
      </button>
      <button @click="submitTeam" class="submit-team btn">Submit</button>
    </div>
  </main>
</template>

<script>
import { teamService } from "../services/team.service.js";
export default {
  name: "team-app",
  data() {
    return {
      isBiggerTeam: false,
      team: {
        member1: "",
        member2: "",
        member3: "",
      },
      students: [],
    };
  },
  async created() {
    this.students = await teamService.getStudents();
    this.$store.dispatch("getTeams");
  },
  methods: {
    toggleStudent() {
      this.isBiggerTeam = !this.isBiggerTeam;
      this.team.member3 = "";
    },
    async submitTeam() {
      if (!this.isVerified()) return;
      this.$store.dispatch("addTeam", this.team);
      this.team = {
        member1: "",
        member2: "",
        member3: "",
      };
    },

    isVerified() {
      const { member1, member2, member3 } = this.team;
      if (
        member1 === "" ||
        member2 === "" ||
        (this.isBiggerTeam && member3 === "")
      ) {
        this.$store.commit("sendMsg", {
          txt: "Must choose both your name and your partner's name",
          type: "warning",
        });
        return false;
      } else if (
        member1 === member2 ||
        member1 === member3 ||
        member2 === member3
      ) {
        this.$store.commit("sendMsg", {
          txt: "Can't choose your own name as your partner!",
          type: "warning",
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

  .toggle-member-btn {
    margin-bottom: 30px;
  }
}
</style>