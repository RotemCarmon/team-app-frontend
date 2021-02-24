import httpService from './http.service.js'
const students = ['Arthur Volkov', 'Ori Rose', 'Avi Koenig', 'Almog Lemberg', 'Avi Lugassi', 'Aviv Zohar', 'Ofir Dahan', 'Oren Karaso', 'Oshri Yoktan', 'Izek Golland', 'Anton Zebnitski', 'Erez Hershkovitz', 'Ari Gabay', 'Bari Avni', 'Guy Zohar', 'Gali Nickel', 'Gilad Peltz', 'Lian Skopis', 'Dariya Kartko', 'Dor Shaul', 'Dorran Gavish', 'Hadar Harush', 'Hadar Marom', 'Zina Mihailov', 'Noy Hason', 'Chen Sella', 'Timophei Tchitchkan', 'Yonatan Mizrahi', 'Yoni Bar', 'Ytav Peer', 'Yaniv Soudneko', 'Ifat Braslavi', 'Carmit Vaknin', 'Lotan Mashiah', 'Liz Hajaj', 'Leetal Rivlin Tal', 'Michael Peer', 'Noa Reisman', 'Nofar Gabso', 'Oded Ron', 'Omer Golan', 'Eran Sevil', 'Ream Lasry', 'Rom Soloman', 'Roi Levy', 'Ran Porath', 'Shoshana Elsa', 'Shachar Dorfzaun', 'Shiran Cohen', 'Sharon Wirtzer']

function getStudents() {
  return students.sort();
}

async function addTeam(team, isForce) {
  return await httpService.post(`team`, { team, isForce });
}

async function getTeams() {
  return await httpService.get(`team`);
}

async function removeTeam(teamId) {
  return await httpService.delete(`team/${teamId}`);
}


export const teamService = {
  getStudents,
  addTeam,
  // getTeamsForDisplay,
  getTeams,
  removeTeam
}