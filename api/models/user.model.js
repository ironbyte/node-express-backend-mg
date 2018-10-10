const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWTSecret, JWTExpirationInterval } = require('../../config/vars');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 128,
  }
}, {timestamps: true});

userSchema.pre('save', async function save(next) {
  try {
    // ONLY hash the password if it has been modified or is new!!!
    if (!this.isModified('password')) {
      return next();
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    return next();

  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  async verifyPasswordv2(password) {
    try {
      const result = await bcrypt.compare(password, this.password);
      return result;
    } catch (error) {
      return error;
    }
  },
  getJWTAccessToken() {
    const JWTClaims = {
      issuer: 'pp-node-backend-api-server',
      subject: this._id,
    };

    const JWTExpirationInterval = {
      expiresIn: '15m',
    };

    console.log('JWTClaims', JWTClaims);
    console.log('JWTExpirationInterval', JWTExpirationInterval);
    const JWTAccessToken = jwt.sign(JWTClaims, JWTSecret, JWTExpirationInterval);

    return {
      jwt_access_token: JWTAccessToken,
    }
  },
  toPlainJSON() {
    return {
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
})

mongoose.model('User', userSchema);
