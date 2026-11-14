const Employee = require("../models/employeeModel");

const addEmployee = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const employeeId = await Employee.createEmployee(req.body);

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      employeeId,
    });
  } catch (error) {
    res.status(error.code === "ER_DUP_ENTRY" ? 409 : 500).json({
      success: false,
      message:
        error.code === "ER_DUP_ENTRY" ? "Email already exists" : error.message,
    });
  }
};

module.exports = { addEmployee };
