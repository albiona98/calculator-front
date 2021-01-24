export class UserSearchRequest {

  name: string;

  jobPosition: string;

  salary: number;

  constructor(userSearchRequest) {
    this.name = userSearchRequest.name;
    this.jobPosition = userSearchRequest.jobPosition;
    this.salary = userSearchRequest.salaryø;
  }

}