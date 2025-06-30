import { Hono } from "hono";
import { bot } from "./bot";
const app = new Hono();

const PORT = process.env.PORT || 3000;

bot.launch();

export default {
  port: PORT,
  fetch: app.fetch,
};
