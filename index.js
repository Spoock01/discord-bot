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

bot.login(process.env.token);

export default bot;
