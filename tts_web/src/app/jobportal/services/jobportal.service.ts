import { Injectable } from '@angular/core';
import { Jobportal } from '../classes/jobportal';

@Injectable({
  providedIn: 'root'
})
export class JobportalService {

  private portals: Jobportal[] = [
    {
      portalId: 1,
      portalName: 'LinkedIn',
      portalDescription: 'from linkedin',
      companyId: 1,
      forBench: true,
      forSourcing: false,
    },
    {
      portalId: 2,
      portalName: 'Naukari.com',
      portalDescription: 'from naukari.com',
      companyId: 1,
      forBench: true,
      forSourcing: false,
    },
    {
      portalId: 3,
      portalName: 'Indeed',
      portalDescription: 'from indeed',
      companyId: 1,
      forBench: true,
      forSourcing: false,
    },
    {
      portalId: 4,
      portalName: 'Glassdoor',
      portalDescription: 'from Glassdoor',
      companyId: 1,
      forBench: true,
      forSourcing: false,
    },
    {
      portalId: 5,
      portalName: 'Upword',
      portalDescription: 'from upword',
      companyId: 1,
      forBench: true,
      forSourcing: false,
    },
    // Add more data as needed
  ];

  constructor() { }

  getAllPortals(): Jobportal[] {
    return this.portals;
  }
}
