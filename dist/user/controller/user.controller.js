"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    getUsers(req, res) {
        res.status(200).json({
            Msn: "Dc Dev"
        });
    }
}
exports.UserController = UserController;