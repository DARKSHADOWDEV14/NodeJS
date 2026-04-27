
import DBlocal from "db-local";
import crypto from "node:crypto";
import bcrypt from 'bcrypt';
import { SALT_ROUNDS} from './config.js';

const { Schema } = new DBlocal({ path: './db' });

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class userRepository {

  static createUser({ username, password }) {

    Validation.username(username)
    Validation.password(password)

    const existingUser = User.findOne({ username });

    if (existingUser) {
      throw new Error('Username already exists');
    }

    const id = crypto.randomUUID();
    const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);


    User.create({
      _id: id,
      username,
      password: hashPassword
    }).save();

    return id;
  }

  static login({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username})
    if(!user) throw new Error('Invalid username or password')

    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if(!isPasswordValid) throw new Error('Invalid username or password')

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
  }
}

class Validation {
  static username (username){
       if (typeof username !== 'string' || username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }
}
  static password (password){
      if ( typeof password !== 'string'|| password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
}
}
