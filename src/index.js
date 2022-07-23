import { connectDatabase } from "./utils/db";
import { startServer } from "./utils/server";
import { initSocket } from "./utils/socket";

const server = startServer();

connectDatabase();

initSocket(server);
