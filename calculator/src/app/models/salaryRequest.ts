export class SalaryRequest{
  netSalary: number;
  grossSalary: number;

  constructor(salaryRequest) {
    this.netSalary = salaryRequest.netSalary;
    this.grossSalary = salaryRequest.grossSalary;
  }
}