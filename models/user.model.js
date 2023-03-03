const mongoose = require ('mongoose');

const userSchema = mongoose.Schema(
    {
        userId: {
            type: Number,
            required: true,
            unique: true,
            default: 1
        },
        username: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            required: [true, "Please add a email"],
            unique: true,
            trim: true,
            match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid emaial",
            ],
        },
        // password: {
        //     type: String,
        //     required: [true, "Please add a password"],
        //     minLength: [6, "Password must be up to 6 characters"],
        //     //   maxLength: [23, "Password must not be more than 23 characters"],
        // },
        phone: {
            type: String
        },
        dob: {
            type: String
        },
        role: {
            type: String
        },
        bio: {
            type: String,
            maxLength: [250, "Bio must not be more than 250 characters"],
            default: "bio",
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },  
    {
        timestamps: true,
    },
);

const userModel = mongoose.model('User', userSchema, 'users');
module.exports = userModel;