const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcyrpt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    firstName: String,
    lastName: String
});

userSchema.pre('save', function(next) { //dont use fat arrow, it fks up the this
    const user = this;
    bcyrpt.genSalt(10,(err, salt) => {
        if(err) return next(err);

        bcyrpt.hash(user.password, salt, null, (err, hash) => {
            if(err) return next(err);

            user.password = hash;

            next();
        });
    });
});

userSchema.methods.comparePasswords = function (canidatePassword, callback) {
    bcyrpt.compare(canidatePassword, this.password, (err, isMatch) => {
        if(err) return callback(err);

        callback(null, isMatch) 
    });
};

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;