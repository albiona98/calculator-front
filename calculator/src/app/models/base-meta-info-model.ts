import { BaseModel } from './base-model';
import { User } from './user';

export class BaseMetaInfoModel extends BaseModel { 
  createdBy: User;
  modifiedBy: User;
  createdOn: Date;
  modifiedOn: Date;

  constructor(baseMetaInfoModel) { 
    super(baseMetaInfoModel);
    this.createdBy = baseMetaInfoModel.createdBy;
    this.modifiedBy = baseMetaInfoModel.modifiedBy;
    this.createdOn = baseMetaInfoModel.createdOn;
    this.modifiedOn = baseMetaInfoModel.modifiedOn;
  }
}