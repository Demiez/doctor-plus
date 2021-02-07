import { Document, Model, model, Schema } from 'mongoose';
import * as crypto from 'crypto';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  createdOn: Date;
  updatedOn: Date;
  hashed_password: string;
  salt: string;
  encryptPassword(plainText: string): string;
}

interface IUserModel extends Model<IUserDocument> {}

const userSchema: Schema = new Schema({
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
});

userSchema.methods = {
  authenticate(plainText: string): boolean {
    const user = this as IUserDocument;
    return user.encryptPassword(plainText) === user.hashed_password;
  },
  encryptPassword(password: string) {
    const user = this as IUserDocument;
    if (!password) {
      return '';
    }
    try {
      return crypto.createHmac('sha1', user.salt).update(password).digest('hex');
    } catch (err) {
      return '';
    }
  },
  makeSalt() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
};

userSchema.path('hashed_password').validate(function (value) {
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

export const UserModel = model<IUserDocument, IUserModel>('User', userSchema, 'users');
