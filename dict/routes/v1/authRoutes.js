"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../../controllers/v1/userController"));
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => { console.log("Yo"); }, userController_1.default.signUp);
router.post("/login");
exports.default = router;
