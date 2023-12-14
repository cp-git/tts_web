import { Injectable } from '@angular/core';
import { Taxtype } from '../classes/taxtype';

@Injectable({
  providedIn: 'root'
})
export class TextypeService {

  constructor() { }
  private taxTypes: Taxtype[] = [
    {
      taxTypeId: 1,
      taxTypeName: 'W2',
      taxTypeDescription: 'W2 Desc'
    },
    {
      taxTypeId: 2,
      taxTypeName: 'C2C',
      taxTypeDescription: 'C2C Desc'
    },
    {
      taxTypeId: 3,
      taxTypeName: 'C2H',
      taxTypeDescription: 'C2H Desc'
    },
    // Add more data as needed
  ];



  getAllTaxTypes(): Taxtype[] {
    return this.taxTypes;
  }
}
