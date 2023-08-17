import { commonEnv } from './environment.common';

export const environment = {
  ...commonEnv,
  production: false,
  // departmentUrl: `${commonEnv.baseUrl}/department/uhpocms`,

  // accessPrivilegeUrl: `http://localhost:8090/accessprivilege/uhpocms`,

  countryUrl: `http://localhost:8090/country/ttsms/country`,
  employeeUrl: `http://localhost:8090/employee/ttsms`,
  companyUrl: `http://localhost:8090/company/ttsms/company`,
  reasonUrl: `http://localhost:8090/reason/ttsms`,
  statusUrl: `http://localhost:8090/status/ttsms`,
  taskUrl:`http://localhost:8090/task/ttsms`
};
