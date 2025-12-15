// ------------------------------
// FAKE DATABASE (in-memory)
// ------------------------------
let users = [
  { id: 1, name: "Vedang", role: "admin" },
  { id: 2, name: "Mahadev", role: "user" }
];

// ------------------------------
// GET ALL USERS (with query params)
// ------------------------------
export const getUsers = (req, res) => {
  const { role } = req.query;

  let filtered = users;

  if (role) filtered = users.filter((u) => u.role === role);

  res.status(200).json({
    success: true,
    count: filtered.length,
    data: filtered
  });
};

// GET SINGLE USER
export const getUser = (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  res.status(200).json({ success: true, data: user });
};

// CREATE USER
export const createUser = (req, res) => {
  const { name, role } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    role,
    avatar: req.file ? req.file.filename : null
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser
  });
  console.log("FILE RECEIVED:", req.file);
  console.log("BODY RECEIVED:", req.body);

};

// UPDATE USER
export const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const { name, role } = req.body;

  user.name = name ?? user.name;
  user.role = role ?? user.role;

  res.status(200).json({
    success: true,
    message: "User updated",
    data: user
  });
};

// DELETE USER
export const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  users = users.filter((u) => u.id !== id);

  res.status(200).json({
    success: true,
    message: "User deleted"
  });
};
