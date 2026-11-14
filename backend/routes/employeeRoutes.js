const express = require("express");

const { getEmployees } = require("../controllers/getEmployeeController");

const { getEmployeeById } = require("../controllers/getEmployeeByIdController");

const { addEmployee } = require("../controllers/postEmployeeController");

const { updateEmployee } = require("../controllers/putEmployeeController");

const { deleteEmployee } = require("../controllers/deleteEmployeeController");

const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);

router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
