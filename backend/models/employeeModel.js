const db = require("../config/db");

// GET ALL EMPLOYEES + SEARCH
const getAllEmployees = async (search = "") => {
  const value = `%${search}%`;

  const [rows] = await db.execute(
    `SELECT * FROM employees
         WHERE name LIKE ?
         OR email LIKE ?
         OR department LIKE ?
         ORDER BY id DESC`,
    [value, value, value],
  );

  return rows;
};

// GET EMPLOYEE BY ID
const getEmployeeById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM employees WHERE id = ?", [id]);

  return rows[0];
};

// POST EMPLOYEE
const createEmployee = async (employee) => {
  const { name, email, phone, department, salary, joining_date, status } =
    employee;

  const [result] = await db.execute(
    `INSERT INTO employees
        (name, email, phone, department, salary, joining_date, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      email,
      phone || null,
      department || null,
      salary ?? null,
      joining_date || null,
      status || "Active",
    ],
  );

  return result.insertId;
};

// PUT EMPLOYEE
const updateEmployee = async (id, employee) => {
  const { name, email, phone, department, salary, joining_date, status } =
    employee;

  const [result] = await db.execute(
    `UPDATE employees SET
        name = ?, email = ?, phone = ?,
        department = ?, salary = ?,
        joining_date = ?, status = ?
        WHERE id = ?`,
    [
      name,
      email,
      phone || null,
      department || null,
      salary ?? null,
      joining_date || null,
      status || "Active",
      id,
    ],
  );

  return result.affectedRows;
};

// DELETE EMPLOYEE
const deleteEmployee = async (id) => {
  const [result] = await db.execute("DELETE FROM employees WHERE id = ?", [id]);

  return result.affectedRows;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
