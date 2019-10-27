//https://uptimerobot.com
//// npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node
const http = require("http");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

import Discord from "discord.js";
import handle_message from "./src/messageHandler";
require("dotenv").config();

const bot = new Discord.Client();

bot.once("ready", () => {
  console.log("Started...");
});

bot.on("message", msg => {
  handle_message(msg);
});

bot.on("disconnect", msg => {
  console.log("Saindo");
  msg.reply("flw");
});

bot.login(process.env.token);

export default bot;
