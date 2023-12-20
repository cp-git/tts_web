import { Injectable } from '@angular/core';
import { Visa } from '../class/visa';

@Injectable({
  providedIn: 'root'
})
export class VisaService {

  private visas: Visa[] = [
    {
      visaId: 1,
      visaType: 'H1B',
      visaDescription: 'for workers in a specialty occupation. ...',
      companyId: 1,
      forBench: true,
      forSourcing: false,
    },
    {
      visaId: 2,
      visaType: 'GeenCard',
      visaDescription: 'for ',
      companyId: 1,
      forBench: true,
      forSourcing: false,
    },
    {
      visaId: 2,
      visaType: 'H2A',
      visaDescription: 'reserved to aliens who come to the U.S. ',
      companyId: 1,
      forBench: true,
      forSourcing: false,
    },
    {
      visaId: 3,
      visaType: 'L1',
      visaDescription: 'For intracompany transferees. ',
      companyId: 1,
      forBench: true,
      forSourcing: false,
    },
    {
      visaId: 4,
      visaType: 'J1',
      visaDescription: ' Exchange visitor program for cultural and educational exchange. ',
      companyId: 1,
      forBench: true,
      forSourcing: false,
    },
    // Add more data as needed
  ];

  constructor() { }

  getAllVisas(): Visa[] {
    return this.visas;
  }
}
