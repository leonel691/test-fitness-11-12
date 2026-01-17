"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const app_1 = require("./app");
const bootstrapAdmin_1 = require("./utils/bootstrapAdmin");
async function bootstrap() {
    await (0, db_1.connectDb)();
    await (0, bootstrapAdmin_1.ensureDefaultAdmin)();
    const app = (0, app_1.createApp)();
    const server = (0, http_1.createServer)(app);
    server.listen(env_1.env.PORT, () => {
        console.log(`API en écoute sur le port ${env_1.env.PORT}`);
    });
}
bootstrap().catch((err) => {
    console.error("Échec du démarrage du serveur", err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map