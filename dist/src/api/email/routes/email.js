"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "POST",
            path: "/email",
            handler: "email.send",
            config: {
                auth: false,
                policies: [],
                middlewares: [],
            },
        },
    ],
};
