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
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
require("reflect-metadata");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const typeorm_1 = require("typeorm");
const user_router_1 = require("./user/router/user.router");
const config_1 = require("./config/config/config");
const start_router_1 = require("./start/router/start.router");
const swaggerOptions_1 = require("./config/swagger/swaggerOptions");
const raiz_router_1 = require("./raiz/router/raiz.router");
const whilelist_middleware_1 = require("./shared/middleware/whilelist.middleware");
class ServerDc extends config_1.ConfigServer {
    constructor() {
        super();
        this.app = (0, express_1.default)();
        this.port = this.getNumberEnv('PORT');
        this.cssUrl = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
        this.swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions_1.swaggerOptions);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.dbConnection();
        this.app.use((0, helmet_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(whilelist_middleware_1.handleCors);
        this.app.use((0, cors_1.default)());
        this.app.use('/', this.start());
        this.app.use('/api', this.api());
        this.app.use('/api-docs', this.swagger());
        this.listen();
    }
    api() {
        return [
            new user_router_1.UserRouter().router,
            new raiz_router_1.RaizRouter().router,
        ];
    }
    ;
    start() {
        return [
            new start_router_1.StartRouter().router,
        ];
    }
    ;
    swagger() {
        const router = express_1.default.Router();
        return [
            router.use('/', swagger_ui_express_1.default.serve),
            router.get('/', swagger_ui_express_1.default.setup(this.swaggerSpec, { customCssUrl: this.cssUrl }))
        ];
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new typeorm_1.DataSource(this.typeORMConfig).initialize();
                console.log(`✅ Database Connected with 🚀 dc_back_db.`);
            }
            catch (error) {
                console.log(`☠️  Database Connection Error: ${error}.`);
            }
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`✅ Server 🆗 is running 💯 on https://localhost:${this.port}.`);
        });
    }
}
const server = new ServerDc();
