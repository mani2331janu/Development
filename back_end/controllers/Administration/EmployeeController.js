const Employee = require("../../models/Administration/Employee");
const Counter = require("../../models/Counter/Counter");
const User = require("../../models/Auth/User");
const agenda = require("../../config/agenda");
const models = { Employee }
const fs = require("fs");
const { normalizePath } = require("../../utils/helper");
const path = require("path");
const mongoose = require("mongoose");


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
    const nextSeq = await getNextSequence("employee");
    const employeeId = `EMP-${String(nextSeq).padStart(5, "0")}`;

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
      employee_id: employeeId,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      blood_group: req.body.blood_group,
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

    const namePart = req.body.first_name
      ? req.body.first_name.substring(0, 4)
      : "User";

    const tempPassword = `User@${namePart}${Math.floor(
      1000 + Math.random() * 9000
    )}`;


    const user = await User.create({
      name: `${req.body.first_name} ${req.body.last_name}`,
      email: req.body.email,
      password: tempPassword,
    });

    await agenda.now("sendEmployeeEmail", {
      email: req.body.email,
      subject: "Your Employee Login Credentials",
      html: `
        <h3>Welcome to the Company!</h3>
        <p>Dear ${req.body.first_name},</p>
        <p>Your employee account has been successfully created.</p>
        <p><b>Employee ID:</b> ${employeeId}</p>
        <p><b>Login Username:</b> ${req.body.email}</p>
        <p><b>Temporary Password:</b> ${tempPassword}</p>
        <p>Please log in and change your password after first login.</p>
        <br/>
        <p>Regards,<br/>HR Team</p>
      `,
    });

    res.status(200).json({
      message: "Employee created successfully",
      data,
    });
  } catch (error) {
    console.log("❌ Error saving employee:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const Edit = async (req, res) => {
  try {
    const base_url = `${req.protocol}://${req.get("host")}`;

    const { id } = req.params;
    const data = await Employee.findById({ _id: id })

    if (data.profile_image) {
      data.profile_image = `${base_url}${data.profile_image}`
    }

    if (data.id_proof) {
      data.id_proof = `${base_url}${data.id_proof}`
    }
    if (data.degree_certificate) {
      data.degree_certificate = `${base_url}${data.degree_certificate}`
    }
    if (data.experience_certificate) {
      data.experience_certificate = `${base_url}${data.experience_certificate}`
    }


    return res.status(200).json(data);


  } catch (error) {
    console.error("❌ Error saving employee:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

const Update = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.id || null;

    const {
      first_name,
      last_name,
      email,
      mobile_no,
      gender,
      blood_group,
      address,
      bank_name,
      ifsc_code,
      account_number,
      updated_by,
    } = req.body;


    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const uploadedFiles = req.importedFiles || {};
    console.log(uploadedFiles, employee.profile_image);


    const deleteOldFile = (filePath) => {
      const absolutePath = path.join(process.cwd(), filePath.replace(/^\//, ""));
      if (fs.existsSync(absolutePath)) {
        try {
          fs.unlinkSync(absolutePath);
        } catch (err) {
          console.warn(" Failed to delete old file:", err);
        }
      } else {
        console.warn("File not found for deletion:", absolutePath);
      }
    };

    if (uploadedFiles.profile_image) deleteOldFile(employee.profile_image);
    if (uploadedFiles.id_proof) deleteOldFile(employee.id_proof);
    if (uploadedFiles.degree_certificate)
      deleteOldFile(employee.degree_certificate);
    if (uploadedFiles.experience_certificate)
      deleteOldFile(employee.experience_certificate);

    const updatedData = await Employee.findByIdAndUpdate(
      id,
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        mobile_no: mobile_no,
        gender: gender,
        blood_group: blood_group,
        address: address,
        bank_name: bank_name,
        ifsc_code: ifsc_code,
        account_number: account_number,
        profile_image:
          normalizePath(uploadedFiles.profile_image || employee.profile_image),
        id_proof: normalizePath(uploadedFiles.id_proof || employee.id_proof),
        degree_certificate:
          normalizePath(uploadedFiles.degree_certificate || employee.degree_certificate),
        experience_certificate:
          normalizePath(uploadedFiles.experience_certificate || employee.experience_certificate),
        updated_by: (user_id),
        updatedAt: new Date(),
      },
      { new: true }
    );

    res.status(200).json({
      message: "Employee updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Employee update error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const View = async (req, res) => {
  try {
    const base_url = `${req.protocol}://${req.host}`;
    const { id } = req.params;

    const data = await Employee.findById({ _id: id }).populate({
      path: "created_by",
      name: "name"
    }).populate({
      path: "updated_by",
      name: "name"
    });

    if (data.profile_image) {
      data.profile_image = `${base_url}${data.profile_image}`
    }

    if (data.id_proof) {
      data.id_proof = `${base_url}${data.id_proof}`
    }
    if (data.degree_certificate) {
      data.degree_certificate = `${base_url}${data.degree_certificate}`
    }
    if (data.experience_certificate) {
      data.experience_certificate = `${base_url}${data.experience_certificate}`
    }

    return res.status(200).json(data);


  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });

  }
}


const getPreviewEmployeeId = async (req, res) => {
  try {
    const counter = await Counter.findById("employee");

    const seq = counter ? counter.seq + 1 : 1;
    const employeeId = `EMP-${String(seq).padStart(5, "0")}`;

    res.status(200).json({ employee_id: employeeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating preview ID" });
  }
};

const getNextSequence = async (name) => {
  const counter = await Counter.findByIdAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};


const checkEmailUnique = async (req, res) => {
  try {
    const { model, field, value, id } = req.body;
    console.log(model);


    if (!model || !field || !value) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const Model = models[model];
    if (!Model) {
      return res.status(400).json({ message: "Invalid model" });
    }

    let query = { [field]: value };

    if (id) {
      query._id = { $ne: id };
    }

    const exists = await Model.exists(query);
    res.json({ exists: !!exists });
  } catch (err) {
    console.error("Unique check error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  list,
  Store,
  Edit,
  getPreviewEmployeeId,
  checkEmailUnique,
  Update,
  View,
};
