import { Injectable } from '@angular/core';
import { Taxtype } from '../classes/taxtype';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextypeService {
  private readonly taxTypeURL = `https://44.193.95.50:8443/taxtype/ttsms/`;
  constructor(private http: HttpClient) {}

  getAllTaxTypeByCompanyId(taxTypeId: number): Observable<Taxtype[]> {
    return this.http.get<Taxtype[]>(`${this.taxTypeURL}taxtypes/${taxTypeId}`);
  }

  addTaxType(taxType: Taxtype): Observable<Taxtype> {
    return this.http.post<Taxtype>(`${this.taxTypeURL}taxtype`, taxType);
  }

  updateTaxType(taxTypeId: number, taxType: Taxtype): Observable<Taxtype> {
    return this.http.put<Taxtype>(
      `${this.taxTypeURL}taxtype/${taxTypeId}`,
      taxType
    );
  }

  deleteTaxType(taxTypeId: number): Observable<void> {
    return this.http.delete<void>(`${this.taxTypeURL}taxtype/${taxTypeId}`);
  }
}
