import { commonEnv } from './environment.common';

export const environment = {
  ...commonEnv,
  production: false,
  // departmentUrl: `${commonEnv.baseUrl}/department/uhpocms`,

  // accessPrivilegeUrl: `http://localhost:8080/accessprivilege/uhpocms`,

  // countryUrl: `http://localhost:8080/country/ttsms/country`,
  // employeeUrl: `http://localhost:8080/employee/ttsms`,
  // companyUrl: `http://localhost:8080/company/ttsms/company`,
  // reasonUrl: `http://localhost:8080/reason/ttsms`,
  // statusUrl: `http://localhost:8080/status/ttsms`,
  // taskUrl: `http://localhost:8080/task/ttsms`,
  // passwordUrl: `http://localhost:8080/employee/ttsms/password`,
  // forgotUrl: `http://localhost:8080/employee/ttsms/forgotpass`,
  // statusURL: `http://localhost:8080/status/ttsms`,

  countryUrl: `${commonEnv.baseUrl}/country/ttsms/country`,
  employeeUrl: `${commonEnv.baseUrl}/employee/ttsms`,
  companyUrl: `${commonEnv.baseUrl}/company/ttsms/company`,
  reasonUrl: `${commonEnv.baseUrl}/reason/ttsms`,
  statusURL: `${commonEnv.baseUrl}/status/ttsms`,
  taskUrl: `${commonEnv.baseUrl}/task/ttsms`,
  passwordUrl: `${commonEnv.baseUrl}/employee/ttsms/password`,
  forgotUrl: `${commonEnv.baseUrl}/employee/ttsms/forgotpass`,
};
