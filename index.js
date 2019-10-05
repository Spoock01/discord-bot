import Discord from "discord.js";
import { token } from "./src/config.json";
import handle_message from "./src/messageHandler";

const bot = new Discord.Client();

bot.once("ready", () => {
  console.log("Started...");
});

bot.on("message", msg => {
  handle_message(msg);
});

bot.login(token);

export default bot;