import { commonEnv } from './environment.common';

export const environment = {
  ...commonEnv,
  production: false,
  // departmentUrl: `${commonEnv.baseUrl}/department/uhpocms`,
  
  // accessPrivilegeUrl: `http://localhost:8090/accessprivilege/uhpocms`,

  employeeUrl: `http://localhost:8090/employee/ttsms`,
  countryUrl : `http://localhost:8090/country/ttsms/country`,
  companyUrl : `http://localhost:8090/company/ttsms/company`
};
