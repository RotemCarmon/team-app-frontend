<template>
  <div class="export-sheet-container">
    <button class="export-btn btn" @click="exportData">Export</button>
  </div>
</template>

<script>
import XLSX from 'xlsx';
import { teamService } from '../services/team.service.js';
export default {
  name: 'export-sheet',
  computed: {
    teams() {
      return this.$store.getters.teamsForDisplay;
    },
  },
  methods: {
    exportData() {
      const matched = this.getMatched();
      const unsubmited = this.getUnsubmited();
      const unmatched = this.getUnmatched();

      const wb = XLSX.utils.book_new(); // create a new empty workbook
      const ws = XLSX.utils.json_to_sheet(matched); // create a sheet from json
      XLSX.utils.sheet_add_json(ws, unsubmited, { origin: 'D1' }); //append array to sheet
      XLSX.utils.sheet_add_json(ws, unmatched, { origin: 'F1' }); //append array to sheet
      XLSX.utils.book_append_sheet(wb, ws, 'couples'); // appends sheet to workbook
      XLSX.writeFile(wb, `test.xlsx`);
    },
    // -- Prepare data --
    getUnsubmited() {
      const students = teamService.getStudents();
      return students
        .filter((student) => {
          return this.teams.every(({ member1, member2 }) => {
            return student !== member1 && student !== member2;
          });
        })
        .map((t) => ({ unsubmited: t }));
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