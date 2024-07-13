import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const feedbackSchema = new Schema(
    {
        foodName: {
            type: String,
            required: true,
            trim: true,
        },
        comment: {
            type: String,
            required: false,
            trim: true,
        },

        overview: {
            type: String,
            required: false,
            trim: true,
        },

        making: {
            type: String,
            required: false,
            trim: true,
        },

        enjoy: {
            type: String,
            required: false,
            trim: true,
        },

        restaurant: {
            type: String,
            required: false,
            trim: true,
        },

        preserve: {
            type: String,
            required: false,
            trim: true,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: false,
        },

        isAnonymous: {
            type: Boolean,
            required: true,
            default: true,
        },

        isApproved: {
            type: Boolean,
            default: false,
        },

        images: {
            type: [String],
            required: false,
        },
        productId: {
            type: String,
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

export const feedbackModel = model('feedbacks', feedbackSchema);
