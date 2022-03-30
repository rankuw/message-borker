"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../models/v1/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const md5_1 = __importDefault(require("md5"));
const mqtt_1 = __importDefault(require("mqtt"));
/**
     *
     * @param username username to save as payload.
     * @returns String or number
     */
function getToken(username) {
    if (process.env.JWT_KEY) {
        return jsonwebtoken_1.default.sign({ username }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
    }
    else {
        return 0;
    }
}
/**
 * !this class will contain router static methods
 */
class UserMethods {
    /**
     *
     * @param req The request from user.
     * @param res The response to user.
     */
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                if (!username || !password) {
                    throw new Error("Enter all credentials");
                }
                const user = yield userModel_1.default.create({ username, password });
                const token = getToken(user.username);
                if (token) {
                    res.cookie('jwt', token);
                }
                res.status(201).send(`User created with user name: ${user.username}`);
            }
            catch (err) {
                next(err);
            }
        });
    }
    /**
     *
     * @param req The request from user.
     * @param res The response to user.
     */
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                if (!username || !password) {
                    throw new Error("Enter your credentials");
                }
                else {
                    const user = yield userModel_1.default.findOne({ username, password: (0, md5_1.default)(String(password)) });
                    if (user) {
                        const token = getToken(username);
                        if (token) {
                            res.cookie('jwt', token);
                        }
                        res.status(200).send(`Logged in as ${user.username}`);
                    }
                    else {
                        res.status(400).send("Incorrect password or username");
                    }
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    /**
     *
     * @param req Request from user
     * @param res Respone to user
     * Used to connect a client to the broker.
     */
    static client(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let i = 0;
            console.log(i++);
            const clientId = req.body.client.username;
            const client = mqtt_1.default.connect("http://localhost:1883", { clientId });
            client.on("connect", () => {
                console.log(client.options.clientId);
                client.subscribe("topic", (err) => {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        console.log(client.options.clientId, "subscribed");
                    }
                });
                client.on("message", (topic, message) => {
                    res.status(200).send(message);
                });
            });
            client.on("error", (err, status) => {
                res.status(403).send(err.message);
                process.exit();
            });
        });
    }
    /**
     *
     * @param req Request from user
     * @param res Respone to user
     * Used to publish.
     */
    static publish(req, res) {
        const clientId = req.body.client.username;
        const message = req.body.message;
        const client = mqtt_1.default.connect("http://localhost:1883", { clientId });
        client.on("connect", () => {
            client.publish("topic", message);
            res.send("Message sent");
        });
    }
}
exports.default = UserMethods;
