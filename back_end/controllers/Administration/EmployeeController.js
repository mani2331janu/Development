const Employee = require("../../models/Administration/Employee");

const list = async (req, res) => {
  try {
    const data = await Employee.find().populate({
      path: "created_by",
      select: "name",
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const Store = async (req, res) => {
  try {
    const user_id = req.user?.id || null;

    const profile_image = req.files["profile_image"]
      ? `/uploads/employee/${req.files["profile_image"][0].filename}`
      : null;
    const id_proof = req.files["id_proof"]
      ? `/uploads/employee/${req.files["id_proof"][0].filename}`
      : null;
    const degree_certificate = req.files["degree_certificate"]
      ? `/uploads/employee/${req.files["degree_certificate"][0].filename}`
      : null;
    const experience_certificate = req.files["experience_certificate"]
      ? `/uploads/employee/${req.files["experience_certificate"][0].filename}`
      : null;
    

    const data = await Employee.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      blood_group: req.body.blood_group,
      employee_id: req.body.employee_id,
      email: req.body.email,
      mobile_no: req.body.mobile_no,
      emg_mobile_no: req.body.emg_mobile_no,
      address: req.body.address,
      city: req.body.city,
      pincode: req.body.pincode,
      bank_name: req.body.bank_name,
      account_number: req.body.account_number,
      ifsc_code: req.body.ifsc_code,
      profile_image,
      id_proof,
      degree_certificate,
      experience_certificate,
      created_by: user_id,
    });

    res.status(200).json({
      message: "Employee created successfully",
      data,
    });
  } catch (error) {
    console.error("❌ Error saving employee:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  list,
  Store,
};
