import {Router} from "express";

import UserMethods from "../../controllers/v1/userController";

const router: Router = Router();

router.post("/signup", UserMethods.signUp)
router.post("/login", UserMethods.login)

export default router