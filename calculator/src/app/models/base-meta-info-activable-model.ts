import { BaseMetaInfoModel } from './base-meta-info-model';

export class BaseMetaInfoActivatableModel extends BaseMetaInfoModel { 
  active: boolean;
  constructor(baseMetaInfoActivatableModel) { 

    super(baseMetaInfoActivatableModel);
    this.active = baseMetaInfoActivatableModel.active;
  }
}