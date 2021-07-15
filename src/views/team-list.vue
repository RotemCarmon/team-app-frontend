<template>
  <section class="team-list-container">
    <div class="table-container">
      <table class="team-list" v-if="teamsForDisplay">
        <thead>
          <tr>
            <th>Member 1</th>
            <th>Member 2</th>
            <th>Member 3</th>
            <th></th>
            <!-- <th></th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="team in teamsForDisplay"
            :key="team.id"
            :class="{ 'is-match': team.isMatch }"
          >
            <td>{{ team.member1 }}</td>
            <td>{{ team.member2 }}</td>
            <td>{{ team.member3 }}</td>
            <!-- <td>{{ team._id }}</td> -->
            <td class="remove-team" @click="removeTeam(team._id)">X</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="list-footer">
      <div class="students-load">
        <h3>enter students as a CSV text</h3>
        <input class="form-el" type="text" v-model="students" />
        <p>{{ students }}</p>
        <button class="btn" @click="changeStudents">Load Students</button>
      </div>
      <export-sheet />
    </div>
  </section>
</template>


<script>
import exportSheet from "../cmps/export-sheet";
export default {
  name: "team-list",
  data() {
    return {
      students: null,
    };
  },
  created() {
    this.$store.dispatch("getTeams");
  },
  computed: {
    teamsForDisplay() {
      return this.$store.getters.teamsForDisplay;
    },
  },
  methods: {
    removeTeam(teamId) {
      this.$store.dispatch("removeTeam", teamId);
    },
    changeStudents() {
      if (this.students) this.$store.dispatch("changeStudents", this.students);
      else {
        console.log("No students found");
        this.$store.commit("sendMsg", {
          txt: "You must enter students to the list, CSV only",
          type: "warning",
        });
      }
    },
  },
  components: {
    exportSheet,
  },
};
</script>

<style lang="scss" scoped>
.team-list-container {
  padding-top: 20px;

  .students-load {
    margin-bottom: 30px;
  }

  .table-container{
    max-height: 350px;
    overflow-x:overlay;
  }

  table {
    margin: auto;
    border-collapse: collapse;
    min-width: 340px;
    td,
    th {
      text-align: start;
      padding: 6px;
    }
    th {
      background-color: #d8d8d8;
    }

    td.remove-team {
      padding: 8px;
      font-weight: 600;
      text-align: center;
      cursor: pointer;
    }

    tr:not(:last-child) {
      border-bottom: 1px solid #e9e9e9;
    }
    tr.is-match {
      background-color: rgba(255, 217, 47, 0.178);
    }
  }
}
@media (max-width: 400px) {
  .team-list-container {
    table {
      min-width: 96vw;
    }
  }
}
</style>