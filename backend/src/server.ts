import { createServer } from "http";
import { connectDb } from "./config/db";
import { env } from "./config/env";
import { createApp } from "./app";
import { ensureDefaultAdmin } from "./utils/bootstrapAdmin";

async function bootstrap() {
  await connectDb();
  await ensureDefaultAdmin();
  const app = createApp();
  const server = createServer(app);

  server.listen(env.PORT, () => {
    console.log(`API en écoute sur le port ${env.PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Échec du démarrage du serveur", err);
  process.exit(1);
});



