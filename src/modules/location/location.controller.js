import Location from '../../models/location.js';

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
