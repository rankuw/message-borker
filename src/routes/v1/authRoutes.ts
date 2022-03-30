import {Router} from "express";

import UserMethods from "../../controllers/v1/userController";
import auth from "../../middleware/v1/authMiddleware";

const router: Router = Router();

router.post("/signup", UserMethods.signUp);
router.post("/login", UserMethods.login);
router.post("/register", auth, UserMethods.client);
router.post("/publish", auth, UserMethods.publish)

export default router