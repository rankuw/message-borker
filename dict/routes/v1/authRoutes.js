"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../../controllers/v1/userController"));
const authMiddleware_1 = __importDefault(require("../../middleware/v1/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/signup", userController_1.default.signUp);
router.post("/login", userController_1.default.login);
router.post("/register", authMiddleware_1.default, userController_1.default.client);
router.post("/publish", authMiddleware_1.default, userController_1.default.publish);
exports.default = router;
