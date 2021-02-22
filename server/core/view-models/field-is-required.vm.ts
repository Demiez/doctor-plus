import { BaseErrorSubCodes } from '../errors/base-error-codes';
import { BaseFieldErrorViewModel } from './base-field-error.vm';

export class FieldIsRequiredViewModel extends BaseFieldErrorViewModel {
  public field: string;

  public errorCode: string = BaseErrorSubCodes.INVALID_INPUT_PARAMS_IS_REQUIRED;

  constructor(field: string) {
    super();
    this.field = field;
  }
}
