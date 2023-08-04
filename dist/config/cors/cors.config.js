"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const whitelist = ['http://localhost:8000', 'https://api-basic.vercel.app', 'https://cdnjs.cloudflare.com'];
exports.corsConfig = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1 || whitelist.some((allowedOrigin) => origin.startsWith(allowedOrigin))) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD', 'CONNECT', 'TRACE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Application/JSON', 'Text/Plain', 'X-Requested-With', 'Text/HTML'],
};
//# sourceMappingURL=cors.config.js.map