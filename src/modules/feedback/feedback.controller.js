import mongoose from 'mongoose';
import { feedbackModel } from '../../models/feedback.js';
import catchAsync from '../../utils/catch-async.js';

const { ObjectId } = mongoose.Types;

export const createFeedback = catchAsync(async (req, res, next) => {
    const { userId } = req.user || {};

    const doc = await feedbackModel.create({
        ...req.body,
        ...(userId && { createdBy: userId }),
        isAnonymous: !userId,
    });

    res.status(200).json({ data: doc });
});

export const getFeedback = catchAsync(async (req, res, next) => {
    const doc = await feedbackModel
        .find({ isApproved: true })
        .populate('createdBy');

    res.status(200).json({ data: doc });
});

export const getFeedbackDetail = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await feedbackModel
        .findOne({ _id: new ObjectId(id) })
        .populate('createdBy');

    res.status(200).json({ data: doc });
});

export const likeFeedback = async (req, res) => {
    try {
        const { user,feedback_id } = req.body;

        if (!user || !user.data || !user.data._id) {
            console.error('User ID is required but not found');
            return res.status(400).json({ message: 'User ID is required' });
        }
        const userId = user.data._id;

        const existingFeedback = await feedbackModel.findById(feedback_id);


        // Check if the productTitle is already in likes
        const index = existingFeedback.likes.indexOf(userId);
        if (index === -1) {
            // If not liked, add to likes
            existingFeedback.likes.push(userId);
            await existingFeedback.save();
            res.status(200).json({ message: 'Product liked successfully' });
        } else {
            // If liked, remove from likes (unlike)
            existingFeedback.likes.splice(index, 1);
            await existingFeedback.save();
            res.status(200).json({ message: 'Product unliked successfully' });
        }
    } catch (error) {
        console.error('Error liking/unliking product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getFeedbackById = async (feedback_id) => {
    try {
        const feedback = await feedbackModel.findOne({ _id: new ObjectId(feedback_id) });
        if (!feedback) {
            throw new Error('Feedback not found');
        }
        return feedback;
    } catch (error) {
        throw new Error(error.message || 'Error fetching feedback');
    }
};