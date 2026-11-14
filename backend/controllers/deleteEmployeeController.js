const Employee = require("../models/employeeModel");

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Employee.deleteEmployee(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { deleteEmployee };
