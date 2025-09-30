const Location = require("../../models/Master/Location");

const locationStore = async (req, res) => {
    try {
        const { location_name } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const location_exists = await Location.findOne({ location_name, status: 1, trash: "No" });

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
        const location = await Location.find({ status: 1 }).sort({ _id: -1 });
        res.status(200).json(location)

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

const LocationEdit = async (req, res) => {
    try {

        const { id } = req.params

        const location = await Location.findById(id);

        if (!location) {
            return res.status(404).json({ message: "No Data Found" });
        }

        res.status(200).json(location)


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" })
    }
}

const LocationUpdate = async (req, res) => {
    try {
        const { id, location_name } = req.body
        const user_id = req.user.id
        if (!location_name) {
            return res.status(400).json({ message: "Location Name is required" });
        }

        const existing = await Location.findOne({
            location_name: location_name,
            _id: { $ne: id },
            status: 1,
            trash: "No"
        });

        if (existing) {
            return res.status(404).json({ message: "Name alredy exist" })
        }

        const updatedLocation = await Location.findByIdAndUpdate(
            id,
            {
                location_name: location_name,
                updatedBy: user_id,
                updatedAt: Date.now()
            },
            { new: true }
        )

        if (!updatedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.status(200).json({
            message: "Location updated successfully",
            location: updatedLocation
        });


    } catch (error) {
        console.log(err);
        res.status(500).json({ message: "Server error" })
    }
}

const LocationView = async (req, res) => {
    try {

        const { id } = req.params

        const location = await Location.findById(id);

        if (!location) {
            return res.status(404).json({ message: "No Data Found" });
        }

        res.status(200).json(location)


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" })
    }
}

const LocationDelete = async (req, res) => {
    try {
        const { id } = req.params;

        const updateDelete = await Location.updateOne(
            { _id: id },
            {
                $set: { status: 0, trash: "Yes" }
            }
        )

        if (updateDelete.deletedCount === 0) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.status(200).json({ message: "Location deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const LocationStatusChange = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updated = await Location.updateOne(
            { _id: id },
            { $set: { status } }
        );

        if (updated.modifiedCount === 0) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.status(200).json({ message: `Location ${status === 1 ? "activated" : "deactivated"} successfully` });
    } catch (err) {
        console.error("Error changing status:", err);
        res.status(500).json({ message: "Server error" });
    }
};

const fetchDetails = async (req, res) => {
    try {
        const {location_name} = req.body         
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}




module.exports = {
    locationStore,
    getAllLocation,
    LocationEdit,
    LocationUpdate,
    LocationView,
    LocationDelete,
    LocationStatusChange,
    fetchDetails
};

