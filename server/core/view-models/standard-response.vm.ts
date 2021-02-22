import { BaseFieldResponseViewModel } from './base-field-response.vm';

export class StandardResponseViewModel extends BaseFieldResponseViewModel {
  public message: string;
  public status: string;

  constructor(message?: string, status?: string) {
    super();
    this.message = message || undefined;
    this.status = status || undefined;
  }
}
