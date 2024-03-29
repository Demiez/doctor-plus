import { MongoError } from 'mongodb';
import { Error } from 'mongoose';
import { ErrorResponse } from '../errors';

export const getErrorMessage = (err: MongoError | Error.ValidationError | ErrorResponse): string => {
  let message = '';
  if ('code' in err) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = 'Unhandled Error';
    }
  } else {
    if ('errors' in err) {
      for (const errorName in err.errors) {
        if (err.errors[errorName].message) {
          message = err.errors[errorName].message;
        }
      }
    }
  }

  return message;
};

const getUniqueErrorMessage = (err: MongoError | ErrorResponse): string => {
  let output: string;

  try {
    const fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'));
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + 'already exists';
  } catch (ex) {
    output = 'Unique field already exists';
  }

  return output;
};
