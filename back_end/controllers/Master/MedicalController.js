const Medical = require("../../models/Master/Medical");
const MedicalList = async (req, res) => {
  try {
    const data = await Medical.find({ trash: "No" })
      .populate({
             path:"location_id",
             select:"location_name"
      })
      .select("medical_name status createdAt")

      return res.status(200).json({success:true,data})

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" })
  }
}
const MedicalStore = async (req, res) => {
  try {
    const { location_id, medical_name } = req.body;
    const user_id = req.user?.id || null;

    if (!location_id || !medical_name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existsMedicalName = await Medical.findOne({
      location_id: location_id,
      medical_name: medical_name.trim(),
    });

    if (existsMedicalName) {
      return res
        .status(409)
        .json({
          success: false,
          message: "Medical name already exists in this location",
        });
    }

    const data = await Medical.create({
      location_id,
      medical_name,
      created_by: user_id,
    });

    return res
      .status(201)
      .json({ success: true, message: "Medical saved successfully", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { MedicalStore, MedicalList };
