import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/app/employee/class/employee';

@Pipe({
  name: 'employeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(employees: Employee[], searchCountryId: number, searchCompanyId: number): Employee[] {
    if (!employees) {
      return [];
    }

    if (searchCountryId === 0 && searchCompanyId === 0) {
      // Return all employees if both searchCountryId and searchCompanyId are 0
      return employees;
    }

    return employees.filter((employee: Employee) => {
      const matchCountry = searchCountryId === 0 || employee.countryId === searchCountryId;
      const matchCompany = searchCompanyId === 0 || employee.companyId === searchCompanyId;
      return matchCountry && matchCompany;
    });
  }
}
