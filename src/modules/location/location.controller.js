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


export const updateLocationForUser = async (req, res) => {
    console.log("xxx" + req)
    const { userId } = req.params;
    const { points } = req.body;
    try {
        const locations = points.map(point => `${point[0]},${point[1]}`);
        const user = await userModel.findByIdAndUpdate(
          userId,
          { $set: { locations } },
          { new: true, runValidators: true }
        );
    
        if (!user) {
          return res.status(404).send('User not found');
        }
    
        res.status(200).send('Locations updated successfully');
      } catch (error) {
        console.error('Error updating locations:', error);
        res.status(500).send('Internal server error');
    }
};