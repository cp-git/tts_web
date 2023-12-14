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
      locationDescription: 'Main office location'
    },
    {
      locationId: 2,
      locationType: 'Remote',
      locationDescription: 'Remote work location'
    },
    {
      locationId: 2,
      locationType: 'On-site',
      locationDescription: 'On-site  location'
    },
    // Add more data as needed
  ];

  constructor() { }

  getAllJobLocations(): Joblocation[] {
    return this.jobLocations;
  }
}
