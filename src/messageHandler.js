import {
  screen_share,
  help,
  amon,
  JOAO_ID,
  deborah_prato,
  STEFANO_ID,
  FRASES_DO_DIA,
  rand_int
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
    if (msg.content.includes(JOAO_ID))
      msg.channel.send("Tu tem moral aqui não, mizera");
    else {
      let member = msg.mentions.members.first();

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
  } else if (message.startsWith(`RECORD`)) {
    msg.reply(":craig:, entrar");
  } else if (message.startsWith(`END`)) {
    msg.reply(":craig:, sair");
  } else if (message.startsWith(`SCREEN`)) {
    let member = msg.member.voiceChannel.toString();
    var memberChannel = member.substring(2, member.length - 1);

    var screen_link = screen_share.filter(channel => {
      return channel.includes(memberChannel);
    });
    msg.reply("Toma o link aí: " + screen_link[0]);
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
