import express from "express";
import { verifyToken } from "../middleware/index.js";

// Módulos controladores importados
import { SingIn } from "../controllers/signin.js";
import { createUser } from "../controllers/createUser.js";
import { displayHome } from "../controllers/displayHome.js";
import { getUserById, getUsers } from "../controllers/getUsers.js";
import { updateUser } from "../controllers/updateUser.js";
import { deleteUser } from "../controllers/deleteUser.js";
import { Customers } from "../controllers/customers.js";

// creación del enrutador 
const router = express.Router();

// Routes
router.get("/", displayHome);
router.post("/signin", SingIn);
router.post("/createUser", createUser);
router.get("/users", getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.put("/users/:id", verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);
router.get('/customers', Customers);

export default router;