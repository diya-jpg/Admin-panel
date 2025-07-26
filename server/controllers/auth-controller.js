const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");







const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Sanitize role: only allow these enum values
    const allowedRoles = ['user', 'admin', 'super admin'];
    const userRole = allowedRoles.includes(role) ? role : 'user';

    // Check for existing user
    const checkUserSql = "SELECT 1 FROM users WHERE email = ?";
    db.query(checkUserSql, [email], async (err, result) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (result.length > 0) {
        return res.status(409).json({ message: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      const insertSql =
        "INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)";
      db.query(
        insertSql,
        [name, email, phone, hashedPassword, userRole],
        (err, insertResult) => {
          if (err) {
            console.error("DB insert error:", err);
            return res.status(500).json({ message: "Server error" });
          }

          const userId = insertResult.insertId;
          const token = jwt.sign(
            { userId, email, role: userRole },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
          );

          res.status(201).json({
            message: "User registered successfully",
            token,
            userId,
            role: userRole,
          });
        }
      );
    });
  } catch (error) {
    console.error("Catch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Bcrypt error:", err);
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const { password, ...userWithoutPassword } = user;

      res.status(200).json({
        message: "Login successful",
        token,
        user: userWithoutPassword,
      });
    });
  });
};

const users=(req,res)=>{
 const sql = "SELECT * FROM users"; // adjust table & column names if needed

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Failed to fetch users:", err);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    res.json(results);
  });
};
const devices = (req, res) => {
  const sql = `
    SELECT d.*, u.name AS user_name, u.email 
    FROM devices d 
    LEFT JOIN users u ON d.user_id = u.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(result);
  });
};


const addDevice = (req, res) => {
  const { userId: adminId, role } = req.user;

  if (role !== "admin" && role !== "super admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  const {
    code_name,
    category,
    manufacturer,
    supplier,
    purchase_on,
    price,
    warranty_months,
    warranty_till,
    is_dead,
    remarks,
    photo1,
    photo2,
  } = req.body;

  // No need to check for user_id — we assign it ourselves
  const sql = `INSERT INTO devices 
    (user_id, code_name, category, manufacturer, supplier, purchase_on, price, warranty_months, warranty_till, is_dead, remarks, photo1, photo2)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    adminId,              // Always assign to admin
    code_name,
    category,
    manufacturer,
    supplier,
    purchase_on,
    price,
    warranty_months,
    warranty_till,
    is_dead,
    remarks,
    photo1 || null,
    photo2 || null,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Device Insert Error:", err);
      return res.status(500).json({ message: "Database error while inserting device" });
    }

    res.status(201).json({ message: "Device added successfully", deviceId: result.insertId });
  });
};

const getProfile = (req, res) => {
  const { userId } = req.user; // req.user is set by auth middleware
  const sql = "SELECT id, name, email, phone, role FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Failed to fetch profile:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result[0]);
  });
};


const addUser = (req, res) => {
  const { name, email, phone, password } = req.body;
  const { role } = req.user;

  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if email exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error("DB query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userRole = "user";

      db.query(
        "INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)",
        [name, email, phone, hashedPassword, userRole],
        (err2) => {
          if (err2) {
            console.error("Insert user error:", err2);
            return res.status(500).json({ message: "Internal server error" });
          }
          res.status(201).json({ message: "User added successfully" });
        }
      );
    } catch (hashErr) {
      console.error("Hashing error:", hashErr);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
const getDeviceById = (req, res) => {
  const deviceId = req.params.id;

  const query = `
    SELECT d.*, u.name as user_name
    FROM devices d
    LEFT JOIN users u ON d.user_id = u.id
    WHERE d.device_id = ?
    LIMIT 1
  `;

  db.query(query, [deviceId], (err, results) => {
    if (err) {
      console.error("DB error fetching device by id:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Device not found" });
    }

    return res.json(results[0]);
  });
};
const updateDevice = (req, res) => {
  const deviceId = req.params.id;
  const {
    user_id,
    code_name,
    category,
    manufacturer,
    supplier,
    purchase_on,
    price,
    warranty_months,
    warranty_till,
    is_dead,
    remarks,
    photo1,
    photo2,
  } = req.body;

  console.log("Updating device ID:", deviceId);
  console.log("Form Data:", req.body);

  const updateQuery = `
    UPDATE devices SET 
      user_id = ?, 
      code_name = ?, 
      category = ?, 
      manufacturer = ?, 
      supplier = ?, 
      purchase_on = ?, 
      price = ?, 
      warranty_months = ?, 
      warranty_till = ?, 
      is_dead = ?, 
      remarks = ?, 
      photo1 = ?, 
      photo2 = ?
    WHERE device_id = ?
  `;

  db.query(
    updateQuery,
    [
      user_id,
      code_name,
      category,
      manufacturer,
      supplier,
      purchase_on,
      price,
      warranty_months,
      warranty_till,
      is_dead,
      remarks,
      photo1,
      photo2,
      deviceId,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Failed to update device:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Device not found" });
      }

      res.status(200).json({ message: "Device updated successfully" });
    }
  );
};

const getUserById = (req, res) => {
   console.log("getUserById called with id:", req.params.id);
  const userId = req.params.id;

 const query = `
  SELECT u.* 
  FROM users u
  WHERE u.id = ?
  LIMIT 1
`;


  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("DB error fetching user by id:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];
    delete user.password; // Remove sensitive data

    return res.json(user);
  });
};



const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { name, email, phone, password } = req.body;

  try {
    // First, fetch current role of user from DB
    db.query('SELECT role FROM users WHERE id = ?', [userId], async (err, results) => {
      if (err) {
        console.error("Error fetching user role:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const currentRole = results[0].role;

      // Hash password if provided
      let hashedPassword = null;
      if (password && password.trim() !== '') {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(password, saltRounds);
      }

      let updateQuery;
      let params;

      if (hashedPassword) {
        updateQuery = `
          UPDATE users SET name = ?, email = ?, phone = ?, password = ?, role = ? WHERE id = ?
        `;
        params = [name, email, phone, hashedPassword, currentRole, userId];
      } else {
        updateQuery = `
          UPDATE users SET name = ?, email = ?, phone = ?, role = ? WHERE id = ?
        `;
        params = [name, email, phone, currentRole, userId];
      }

      db.query(updateQuery, params, (err, result) => {
        if (err) {
          console.error('Failed to update user:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
      });
    });
  } catch (error) {
    console.error('Error hashing password or updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const changeUser = (req, res) => {
  const deviceId = req.params.id;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  db.query(
    "SELECT user_id FROM devices WHERE device_id = ?",
    [deviceId],
    (err, rows) => {
      if (err) {
        console.error("DB error (select):", err);
        return res.status(500).json({ message: "Database error", error: err.sqlMessage || err.message });
      }

      if (rows.length === 0) {
        return res.status(404).json({ message: "Device not found" });
      }

      const currentUserId = rows[0].user_id;

      // If there's a current user, close their history
      const closeHistory = (cb) => {
        if (!currentUserId) return cb();
        db.query(
          `UPDATE device_user_history
           SET assigned_till = NOW()
           WHERE device_id = ? AND user_id = ? AND assigned_till IS NULL`,
          [deviceId, currentUserId],
          (err) => {
            if (err) {
              console.error("DB error (update history):", err);
              return res.status(500).json({ message: "Database error", error: err.sqlMessage || err.message });
            }
            cb();
          }
        );
      };

      closeHistory(() => {
        // Update device's current user
        db.query(
          "UPDATE devices SET user_id = ? WHERE device_id = ?",
          [userId, deviceId],
          (err) => {
            if (err) {
              console.error("DB error (update devices):", err);
              return res.status(500).json({ message: "Database error", error: err.sqlMessage || err.message });
            }

            // Add new history record
            db.query(
              "INSERT INTO device_user_history (device_id, user_id, assigned_on) VALUES (?, ?, NOW())",
              [deviceId, userId],
              (err) => {
                if (err) {
                  console.error("DB error (insert history):", err);
                  return res.status(500).json({ message: "Database error", error: err.sqlMessage || err.message });
                }

                res.json({ message: "User assigned and history updated" });
              }
            );
          }
        );
      });
    }
  );
};


const getDeviceAssignmentHistory = (req, res) => {
  const deviceId = req.params.id;

  const sql = `
    SELECT duh.user_id, u.name AS user_name, duh.assigned_on, duh.assigned_till
    FROM device_user_history AS duh
    JOIN users AS u ON duh.user_id = u.id
    WHERE duh.device_id = ?
    ORDER BY duh.assigned_on DESC
  `;

  db.query(sql, [deviceId], (err, results) => {
    if (err) {
      console.error("DB error fetching assignment history:", err);
      return res.status(500).json({
        message: "Database error",
        error: err.sqlMessage || err.message,
      });
    }

    res.json(results);
  });
};





module.exports = {
  register,
  login,
  devices,
  addDevice,
  users,
  getProfile,
  addUser,
  getDeviceById, 
  updateDevice ,
  getUserById,
  updateUserById,
  changeUser,
  getDeviceAssignmentHistory//<-- updated the exported function name here
};
