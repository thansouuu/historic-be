import { userModel } from '../../models/user.model.js';

export const likeProduct = async (req, res) => {
    try {
        const { user, productTitle } = req.body;

        console.log('Received user data:', user);
        console.log('Received product title:', productTitle);

        if (!user || !user.data || !user.data._id) {
            console.error('User ID is required but not found');
            return res.status(400).json({ message: 'User ID is required' });
        }

        const userId = user.data._id;

        const existingUser = await userModel.findById(userId);

        if (!existingUser) {
            console.error('User not found:', userId);
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the productTitle is already in likes
        const index = existingUser.likes.indexOf(productTitle);
        if (index === -1) {
            // If not liked, add to likes
            existingUser.likes.push(productTitle);
            await existingUser.save();
            res.status(200).json({ message: 'Product liked successfully' });
        } else {
            // If liked, remove from likes (unlike)
            existingUser.likes.splice(index, 1);
            await existingUser.save();
            res.status(200).json({ message: 'Product unliked successfully' });
        }
    } catch (error) {
        console.error('Error liking/unliking product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getLikesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const likes = user.likes;
        res.json({ likes });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching liked posts', error });
    }
};
