<template>
  <section class="team-list-container">
    <table class="team-list" v-if="teamsForDisplay">
      <thead>
        <tr>
          <th>Member 1</th>
          <th>Member 2</th>
          <th></th>
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
          <td class="remove-team" @click="removeTeam(team.id)">X</td>
        </tr>
      </tbody>
    </table>
    <div class="list-footer">
      <export-sheet />
    </div>
  </section>
</template>


<script>
import exportSheet from '../cmps/export-sheet';
export default {
  name: 'team-list',
  created() {
    this.$store.dispatch('getTeams');
  },
  computed: {
    teamsForDisplay() {
      return this.$store.getters.teamsForDisplay;
    },
  },
  methods: {
    removeTeam(teamId) {
      this.$store.dispatch('removeTeam', teamId);
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