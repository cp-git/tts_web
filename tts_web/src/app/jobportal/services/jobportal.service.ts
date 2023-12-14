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
      portalDescription: 'from linkedin'
    },
    {
      portalId: 2,
      portalName: 'Naukari.com',
      portalDescription: 'from naukari.com'
    },
    {
      portalId: 3,
      portalName: 'Indeed',
      portalDescription: 'from indeed'
    },
    {
      portalId: 4,
      portalName: 'Glassdoor',
      portalDescription: 'from Glassdoor'
    },
    {
      portalId: 5,
      portalName: 'Upword',
      portalDescription: 'from upword'
    },
    // Add more data as needed
  ];

  constructor() { }

  getAllPortals(): Jobportal[] {
    return this.portals;
  }
}
