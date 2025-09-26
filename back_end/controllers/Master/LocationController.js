const Location = require("../../models/Master/Location");

const locationStore = async (req, res) => {
    try {
        const { location_name } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const location_exists = await Location.findOne({ location_name });

        if (location_exists) {
            return res.status(400).json({ message: "Location Already Exists" });
        }

        const newLocation = await Location.create({
            location_name,
            createdBy: req.user.id
        });

        res.status(201).json(newLocation);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getAllLocation = async (req, res) => {
    try {
        const location = await Location.find().sort({ _id: -1 });
        res.status(200).json(location)

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}


module.exports = { locationStore, getAllLocation };
