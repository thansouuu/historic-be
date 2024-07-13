import mongoose from 'mongoose';
import { userModel } from '../../models/user.model.js';

const { ObjectId } = mongoose.Types;

export const getMe = async (req, res, next) => {
    const { userId } = req.auth;
    const result = await userModel.findOne({ _id: new ObjectId(userId) });

    if (!result) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ data: result });
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find({}, 'name avatar');
        res.status(200).json({ data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
