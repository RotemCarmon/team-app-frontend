import { teamService } from '../../services/team.service.js';

export default {
  state: {
    teams: []
  },
  getters: {
    teamsForDisplay(state) {
      const teams = state.teams;
      const teamsToFilterOut = []
      const filteredTeams = teams.filter((team, idx) => {
        const dupIdx = teams.findIndex(t => {
          return t.member2 === team.member1 && t.member1 === team.member2
        })
        if (dupIdx !== -1) {
          teamsToFilterOut.push(dupIdx);
          team.isMatch = true;
        }
        if (teamsToFilterOut.includes(idx)) return false
        return team;
      })
      return filteredTeams;
    },
  },
  mutations: {
    addTeam(state, team) {
      state.teams.push(team)
    },
    setTeams(state, teams) {
      state.teams = teams;
    },
    removeTeam(state, teamId) {
      const idx = state.teams.findIndex(team => team._id === teamId);
      console.log('idx:', idx)
      if (idx === -1) throw new Error('Cant find team id: ' + teamId)
      state.teams.splice(idx, 1)
    },
  },
  actions: {
    async changeStudents({ commit, dispatch }, sutdents) {
      const res = await teamService.addStudents(sutdents);
      let msg;
      if (res.type === 'Custom Message' || res.type === 'message') {
        const type = (res.code === 1) ? 'success' : 'warning';
        msg = { txt: res.message || 'please login', type }
      } else {
        const txt = `Students Submitted successfully`;
        dispatch('getTeams')
        msg = { txt, type: 'success' }
      }
      commit('sendMsg', msg);
    },
    async getTeams({ commit }) {
      const teams = await teamService.getTeams();
      commit('setTeams', teams)
    },
    async addTeam({ commit }, team) {
      const res = await teamService.addTeam(team);
      let msg;
      if (res.type === 'Custom Message') {
        const type = (res.code === 1) ? 'success' : 'warning';

        msg = { txt: res.message, type }
      }
      else {
        const txt = `Submitted successfully\nTeam: ${team.member1} & ${team.member2} ${(team.member3) ? ' & ' + team.member3 : ''}`;
        msg = { txt, type: 'success' }
      }
      commit('sendMsg', msg);
      commit('addTeam', team);
    },
    async removeTeam({ commit }, teamId) {
      try {
        const bla = await teamService.removeTeam(teamId);
        console.log(bla);
        commit('removeTeam', teamId)
      } catch (err) {
        console.log(err);
      }
    }
  },
};