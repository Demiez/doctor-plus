import { v4 } from 'uuid';
const mongoose = require('mongoose');
require('mongoose-uuid2')(mongoose);
const UUID = require('mongoose').Types.UUID;

import { Document, Model, model, Schema } from 'mongoose';
import * as crypto from 'crypto';

export interface IUserDocument extends Document {
  id: string;
  name: string;
  email: string;
  createdOn: Date;
  updatedOn: Date;
  hashed_password: string;
  salt: string;

  encryptPassword(plainText: string): string;
}

interface IUserModel extends Model<IUserDocument> {}

const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    _id: {
      type: UUID,
      default: v4,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: (value: string) => {
        if (!value.match(/.+\@.+\..+/)) {
          throw new Error('Please fill a valid email address');
        }
      },
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
    updatedOn: {
      type: Date,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
  },
  {
    toObject: {
      virtuals: true,
      getters: true,
    },
    toJSON: {
      virtuals: true,
      getters: true,
      transform: (doc: any, ret: any, options: any) => {
        delete ret._id;
        return ret;
      },
    },
  },
);

userSchema.methods = {
  authenticate(plainText: string): boolean {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword(password: string) {
    if (!password) {
      return '';
    }
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (err) {
      return '';
    }
  },
  makeSalt() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
};

userSchema.path('hashed_password').validate(function (value: string) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters');
  }

  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);

userSchema
  .virtual('password')
  .set(function (password: string) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

export const UserModel = model('User', userSchema, 'users');
