<template>
  <div class="export-sheet-container">
    <button class="export-btn btn" @click="exportData">Export</button>
  </div>
</template>

<script>
import XLSX from "xlsx";
import { teamService } from "../services/team.service.js";
export default {
  name: "export-sheet",
  computed: {
    teams() {
      return this.$store.getters.teamsForDisplay;
    },
  },
  methods: {
    async exportData() {
      // const matched = this.getMatched();
      const duplicated = this.getDuplicated();
      const unsubmited = await this.getUnsubmited();
      // const unmatched = this.getUnmatched();
      const teams = this.getTeams();
      this.getDuplicated();
      const wb = XLSX.utils.book_new(); // create a new empty workbook
      // const ws = XLSX.utils.json_to_sheet(matched); // create a sheet from json
      const ws = XLSX.utils.json_to_sheet(duplicated); // create a sheet from json
      XLSX.utils.sheet_add_json(ws, unsubmited, { origin: "D1" }); //append array to sheet
      // XLSX.utils.sheet_add_json(ws, unmatched, { origin: "F1" }); //append array to sheet
      XLSX.utils.sheet_add_json(ws, teams, { origin: "F1" }); //append array to sheet
      XLSX.utils.book_append_sheet(wb, ws, "couples"); // appends sheet to workbook
      XLSX.writeFile(wb, `test.xlsx`);
    },
    // -- Prepare data --
    async getUnsubmited() {
      const students = await teamService.getStudents();
      return (
        students
          .filter((student) => {
            return this.teams.every(({ member1, member2 }) => {
              return student !== member1 && student !== member2;
            });
          })
          .map((t) => ({ unsubmited: t }))
      );
    },
    getDuplicated() {
      const students = [];
      let dupStudents = [];
      this.teams.forEach((t) => {
        const keys = Object.keys(t);
        const vals = Object.values(t);
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] !== "_id" && keys[i] !== "isMatch") {
            for (let j = 0; j < students.length; j++) {
              if (students[j] === vals[i] && vals[i] !== "") {
                dupStudents.push(vals[i]);
                students.splice(j, 1);
                j--;
                // j = students.length;
              }
            }
            students.push(vals[i]);
          }
        }
      });

      dupStudents = Array.from(new Set(dupStudents));
      return (
        dupStudents.map((s) => ({ duplicated: s }))
      );
    },
    getTeams() {
      return this.teams.map((t) => {
        const teams = {};
        const keys = Object.keys(t);
        const vals = Object.values(t);
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] !== "_id" && keys[i] !== "isMatch") {
            teams[keys[i]] = vals[i];
          }
        }
        return teams;
      });
    },
    getUnmatched() {
      return this.teams
        .filter((t) => {
          return !t.isMatch;
        })
        .map((t) => ({ unmatched: t.member1 }));
    },
    getMatched() {
      return this.teams
        .filter((t) => {
          return t.isMatch;
        })
        .map(({ member1, member2 }) => ({ member1, member2 }));
    },
  },
};
</script>