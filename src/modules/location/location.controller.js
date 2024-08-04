import Location from '../../models/location.js';
import { userModel } from '../../models/user.model.js';

export const getLocationByCountry = async (req, res) => {
    try {
        const { country } = req.params;
        const locations = await Location.find({ country });
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error });
    }
};

export const addLocation = async (req, res) => {
    try {
        const location = new Location(req.body);
        await location.save();
        res.status(201).json(location);
    } catch (error) {
        res.status(500).json({ message: 'Error adding location', error });
    }
};


export const getLocationByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const locations = user.locations;
        res.json({ locations });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching liked posts', error });
    }
};


export const getLocation = async (req, res) => {
    try {        
        const { country } = req.params;
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error });
    }
};

