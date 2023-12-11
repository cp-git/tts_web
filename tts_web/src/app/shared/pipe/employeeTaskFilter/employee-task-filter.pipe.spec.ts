import { EmployeeTaskFilterPipe } from './employee-task-filter.pipe';

describe('EmployeeTaskFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new EmployeeTaskFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
