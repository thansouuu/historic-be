import mongoose from 'mongoose';
import validator from 'validator';

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
        avatar: {
            type: String,
            required: false,
        },
        imageIcon: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true,
            unique: true,
            validate: {
                validator: function (value) {
                    return validator.isEmail(value);
                },
                message: 'Invalid Email',
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            enum: ['normal', 'good', 'top-good', 'best'],
            default: 'normal',
        },
        likes: {
            type: [String],
            default: [],
        },
    },
    {
        toJSON: {
            getters: true,
        },
        timestamps: true,
        versionKey: false,
    },
);

userSchema.statics.isEmailExisted = async function (email) {
    const user = await this.findOne({ email }).select('+password').lean();
    return { existed: Boolean(user), data: user };
};

export const userModel = model('users', userSchema);
