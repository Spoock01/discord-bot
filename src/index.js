import Discord from "discord.js";
import { token } from "./config.json";
import handle_message from "./messageHandler";

const bot = new Discord.Client();

bot.once("ready", () => {
  console.log("Running...");
});

bot.on("message", msg => {
  handle_message(msg);
});


bot.login(token);
