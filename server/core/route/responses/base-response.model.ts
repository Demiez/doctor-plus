import { BaseFieldResponseModel } from './base-field.model';

export class BaseResponseViewModel extends BaseFieldResponseModel {
  public message: string;
  public status: string;

  constructor(message?: string, status?: string) {
    super();
    this.message = message || undefined;
    this.status = status || undefined;
  }
}
