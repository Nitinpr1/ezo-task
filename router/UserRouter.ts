import { Router } from "express";
import { userRegister, userLogin, getUsers } from "../controller/UserController";

const router = Router();

router.post("/register", userRegister);

router.post("/login", userLogin);
router.get("/", getUsers);

export default router;
