import { BaseModel } from './base-model';

export class BaseActivatableModel extends BaseModel {
  active: boolean;

  constructor(baseActivatableModel) {
    super(baseActivatableModel);
    this.active = baseActivatableModel.active;
  }
}