import httpService from './http.service.js'

async function getStudents() {
  // return students.sort();
  return await httpService.get(`student`);
}

async function addStudents(students) {
  console.log(students);
  return await httpService.post('student', { students })
}


async function addTeam(team, isForce) {
  return await httpService.post(`team`, { team, isForce });
}

async function getTeams() {
  return await httpService.get(`team`);
}

async function removeTeam(teamId) {
  console.log(teamId);
  return await httpService.delete(`team/${teamId}`);
}


export const teamService = {
  getStudents,
  addTeam,
  // getTeamsForDisplay,
  getTeams,
  removeTeam,
  addStudents
}