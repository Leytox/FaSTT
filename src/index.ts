import { Hono } from "hono";
import { bot } from "./bot";

const app = new Hono();

app.get("/", (c) => c.text("Dummy response to satisfy cloud provider :)"));

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

console.log("Bot started successfully!");

export default app;
