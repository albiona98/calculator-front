import { BaseMetaInfoActivatableModel } from "./base-meta-info-activable-model";

export class User extends BaseMetaInfoActivatableModel {

  name: string;
  lastName: string;
  mobile: string;
  email: string;
  address: string;
  jobPosition: string;
  salary: number;

  constructor(user) {
    super(user);
    this.name = user.name;
    this.lastName = user.lastName;
    this.mobile = user.mobile;
    this.address = user.address;
    this.jobPosition = user.jobPosition;
    this.salary = user.salary;
  }
}