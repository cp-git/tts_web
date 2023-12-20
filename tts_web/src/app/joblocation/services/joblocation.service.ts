import { Injectable } from '@angular/core';
import { Joblocation } from '../classes/joblocation';

@Injectable({
  providedIn: 'root'
})
export class JoblocationService {

  private jobLocations: Joblocation[] = [
    {
      locationId: 1,
      locationType: 'Office',
      locationDescription: 'Main office location',
      companyId: 1,
      forBench: true,
      forSourcing: false,
    },
    {
      locationId: 2,
      locationType: 'Remote',
      locationDescription: 'Remote work location',
      companyId: 1,
      forBench: true,
      forSourcing: false,
    },
    {
      locationId: 3,
      locationType: 'On-site',
      locationDescription: 'On-site  location',
      companyId: 1,
      forBench: true,
      forSourcing: false,
    },
    // Add more data as needed
  ];

  constructor() { }

  getAllJobLocations(): Joblocation[] {
    return this.jobLocations;
  }
}
