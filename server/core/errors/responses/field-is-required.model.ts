import { BaseErrorSubCodes } from '../base-error-codes';
import { BaseFieldErrorModel } from './base-field.model';

export class FieldIsRequiredModel extends BaseFieldErrorModel {
  public field: string;

  public errorCode: string = BaseErrorSubCodes.INVALID_INPUT_PARAMS_IS_REQUIRED;

  constructor(field: string) {
    super();
    this.field = field;
  }
}
