import {
  screen_share,
  help,
  amon,
  JOAO_ID,
  deborah_prato,
  STEFANO_ID,
  FRASES_DO_DIA,
  rand_int,
  server_link
} from "./Utils";
import axios from "axios";

import client from "../src/index";

const fetch_dolar = async msg => {
  await axios
    .get("https://economia.awesomeapi.com.br/all/USD-BRL")
    .then(response => {
      msg.reply(`Dólar agora: ${response.data["USD"].bid}`);
    })
    .catch(() => {
      msg.reply("Ei bicho, foi mal. Consegui não :(");
    });
};

const help_message = msg => {
  msg.channel.send(help);
};

const playSound = (msg, path) => {
  var isReady = true;

  if (isReady) {
    isReady = false;

    var voiceChannel = msg.member.voiceChannel;
    voiceChannel
      .join()
      .then(connection => {
        const dispatcher = connection.playFile(__dirname + path);
        dispatcher.on("end", end => {
          voiceChannel.leave();
        });
      })
      .catch(err => {
        console.log(err);
        msg.reply("Ainda n");
      });
  }
};

const handle_me_desculpa_joao = msg => {
  var isThisMessage = false;

  if (
    msg.content.toUpperCase().includes("ME") &
    msg.content.toUpperCase().includes("DESCULPA") &
    (msg.content.toUpperCase().includes("JOÃO") ||
      msg.content.toUpperCase().includes("JOAO") ||
      msg.content.toUpperCase().includes("JAO"))
  ) {
    return !isThisMessage;
  }
  return isThisMessage;
};

const handle_prefix = async msg => {
  var message = msg.content.replace("!!", "").toUpperCase();

  if (message.startsWith("HELP")) return help_message(msg);
  else if (message.startsWith("KICK")) {
    let member = msg.mentions.members.first();

    if (member === undefined)
      msg.reply(
        "Tu tá querendo kickar um fantasma? Animal do carai. Bota o nick do mizera aí"
      );
    else {
      var memberId = member.id;
      var creatorID = JOAO_ID.substring(2, JOAO_ID.length - 1);

      if (memberId == creatorID) {
        msg.reply(
          "Tu tem moral pra kickar meu criador n, seu mizera. Vá tomar no seu cu!"
        );
      } else {
        member
          .kick()
          .then(() => {
            msg.channel.send(
              `Tá fazendo o que aqui, ${member.displayName}? Vaza!`
            );
          })
          .catch(err => {
            msg.reply("Mermão, to com vontade agora n. Depois eu faço.");
          });
      }
    }
  } else if (message.startsWith(`RECORD`)) {
    msg.reply(":craig:, entrar");
  } else if (message.startsWith(`END`)) {
    msg.reply(":craig:, sair");
  } else if (message.startsWith(`SCREEN`)) {
    try {
      var server = msg.member.guild.id; // Getting server's id
      var member = msg.member.voiceChannel.toString(); //getting user who made the request
      var memberChannel = member.substring(2, member.length - 1); //getting user's channel
      msg.reply(
        "Toma o link aí: " + server_link + server + "/" + memberChannel
      );
    } catch (e) {
      console.log(e);
      msg.reply("Entra no servidor, desgraçado(a)");
      return;
    }
  } else if (message.startsWith("AMON2")) {
    playSound(msg, "/audio/CaioAmonTomarNoCu.mp3");
  } else if (message.startsWith("AMON")) {
    msg.channel.send(amon);
  } else if (message.startsWith("PRATOS")) {
    msg.channel.send(deborah_prato);
  } else if (message.startsWith("STFN")) {
    msg.channel.send(`Fala, torneirinha ${STEFANO_ID}`);
  } else if (message.startsWith("FRASEDODIA")) {
    msg.reply(FRASES_DO_DIA[rand_int(FRASES_DO_DIA.length)]);
  } else if (message.startsWith("DOLAR")) {
    fetch_dolar(msg);
  } else if (message.startsWith("PING")) {
    const m = await msg.channel.send("Ping?");
    m.edit(
      `Pong! A Latência é ${m.createdTimestamp -
        msg.createdTimestamp}ms. A Latencia da API é ${Math.round(
        client.ping
      )}ms`
    );
  }
};

const handle_message = msg => {
  if (msg.content.startsWith("!!")) {
    handle_prefix(msg);
  } else if (msg.content.includes("meu patrão")) {
    msg.reply(
      "Se eu sou seu patrão, vc eh meu escravo.\
       Vá trabalhar, vagabundo do carai!"
    );
  } else if (handle_me_desculpa_joao(msg)) {
    msg.channel.send(`!!kick ${msg.author}`);
  }
};

export default handle_message;
