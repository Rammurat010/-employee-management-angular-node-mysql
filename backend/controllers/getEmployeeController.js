const Employee = require("../models/employeeModel");

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.getAllEmployees(req.query.search || "");

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getEmployees };
