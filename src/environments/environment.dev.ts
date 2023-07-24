import { commonEnv } from './environment.common';

export const environment = {
  ...commonEnv,
  production: false,
  // departmentUrl: `${commonEnv.baseUrl}/department/uhpocms`,
  
  // accessPrivilegeUrl: `http://localhost:8090/accessprivilege/uhpocms`,
};
