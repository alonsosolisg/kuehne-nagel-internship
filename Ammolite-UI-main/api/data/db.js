const employeesData = require("./employees");
const groupsData = require("./employees");
const jobTitlesData = require("./job-titles");

module.exports = () => ({
  employees: employeesData,
  groups: groupsData,
  jobTitles: jobTitlesData,
});
