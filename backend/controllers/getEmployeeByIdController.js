const Employee = require("../models/employeeModel");

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee fetched successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getEmployeeById };
