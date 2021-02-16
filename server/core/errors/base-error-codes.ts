export class BaseErrorCodes {
  public static get INTERNAL_SERVER_ERROR() {
    return 'INTERNAL_SERVER_ERROR';
  }

  public static get INVALID_INPUT_PARAMS() {
    return 'INVALID_INPUT_PARAMS';
  }

  public static get UNAUTHORIZED() {
    return 'UNAUTHORIZED';
  }

  public static get RECORD_NOT_FOUND() {
    return 'RECORD_NOT_FOUND';
  }

  public static get USER_NOT_FOUND() {
    return 'USER_NOT_FOUND';
  }
}

export class BaseErrorSubCodes {
  public static get INVALID_INPUT_PARAMS_IS_REQUIRED() {
    return 'INVALID_INPUT_PARAMS_IS_REQUIRED';
  }

  public static get INVALID_INPUT_PARAMS_IS_PRIMARY() {
    return 'INVALID_INPUT_PARAMS_IS_PRIMARY';
  }

  public static get INVALID_INPUT_PARAMS_IS_BAD_VALUE() {
    return 'INVALID_INPUT_PARAMS_IS_BAD_VALUE';
  }

  public static get UNAUTHORIZED_PERMISSIONS_DENIED() {
    return 'UNAUTHORIZED_PERMISSIONS_DENIED';
  }

  public static get INVALID_INPUT_PARAMS_IS_DUPLICATE_VALUE() {
    return 'INVALID_INPUT_PARAMS_IS_DUPLICATE_VALUE';
  }

  public static get INVALID_INPUT_PARAMS_IS_DUPLICATE_RECORD() {
    return 'INVALID_INPUT_PARAMS_IS_DUPLICATE_RECORD';
  }
}
