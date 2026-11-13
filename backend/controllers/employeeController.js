const db = require("../config/db");

// GET all employees
exports.getEmployees = (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// GET employee by ID
exports.getEmployeeById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM employees WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (!result.length) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(result[0]);
  });
};

// POST employee
exports.addEmployee = (req, res) => {
  const { name, email, phone, department, salary } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required",
    });
  }

  const sql = `
    INSERT INTO employees (name, email, phone, department, salary)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, department, salary], (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({
      message: "Employee added successfully",
      id: result.insertId,
    });
  });
};

// PUT employee
exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, department, salary } = req.body;

  const sql = `
    UPDATE employees
    SET name = ?, email = ?, phone = ?, department = ?, salary = ?
    WHERE id = ?
  `;

  db.query(sql, [name, email, phone, department, salary, id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (!result.affectedRows) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully" });
  });
};

// DELETE employee
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM employees WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (!result.affectedRows) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  });
};
