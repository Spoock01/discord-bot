import axios from "axios";
import bot from "../index";
import Discord from "discord.js";

import { FRASES_DO_DIA, rand_int, SERVER_LINK } from "./Utils";

const ping = async msg => {
  const m = await msg.channel.send("Ping?");
  m.edit(
    `Pong! A Latência é ${m.createdTimestamp -
      msg.createdTimestamp}ms. A Latencia da API é ${Math.round(bot.ping)}ms`
  );
};

const randNum = msg => {};

const randList = msg => {};

const fetchDolar = async msg => {
  await axios
    .get("https://economia.awesomeapi.com.br/all/USD-BRL")
    .then(response => {
      msg.reply(`Dólar agora: ${response.data["USD"].bid}`);
    })
    .catch(() => {
      msg.reply("Ei bicho, foi mal. Consegui não :(");
    });
};

const fraseDoDia = msg => {
  msg.reply(FRASES_DO_DIA[rand_int(FRASES_DO_DIA.length)]);
};

const startsWith = (message1, message2) => {
  message1 = message1.toUpperCase();
  return message1.startsWith(message2);
};

const screenHandler = msg => {
  try {
    var server = msg.member.guild.id; // Getting server's id
    var member = msg.member.voiceChannel.toString(); //getting user who made the request
    var memberChannel = member.substring(2, member.length - 1); //getting user's channel

    const embed = new Discord.RichEmbed()
      .setTitle("Toma o link aí!!")
      .setColor(0x00ae86);
    var link = SERVER_LINK + server + "/" + memberChannel;
    var serverName = msg.member.voiceChannel.name;

    embed.addField(`Servidor: ${serverName}`, link, false);

    msg.channel.send(embed);
  } catch (e) {
    console.log(e);
    msg.reply("Entra no servidor, desgraçado(a)");
    return;
  }
};

export {
  randNum,
  randList,
  fetchDolar,
  startsWith,
  screenHandler,
  ping,
  fraseDoDia
};
