import { Injectable } from '@angular/core';
import { Visa } from '../class/visa';

@Injectable({
  providedIn: 'root'
})
export class VisaService {

  private visas: Visa[] = [
    {
      visaId: 1,
      visaType: 'Tourist',
      visaDescription: 'For leisure travel'
    },
    {
      visaId: 2,
      visaType: 'Work',
      visaDescription: 'For employment purposes'
    },
    // Add more data as needed
  ];

  constructor() { }

  getAllVisas(): Visa[] {
    return this.visas;
  }
}
