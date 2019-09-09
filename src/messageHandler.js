import { prefix } from "./config.json";
import { screen_share, help, amon, JOAO_ID, deborah_prato, STEFANO_ID } from "./Utils";

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

const handle_prefix = msg => {
  var message = msg.content.replace("!!", "");

  if (message.startsWith("help")) {
    help_message(msg);
  } else if (message.startsWith("kick")) {
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
  } else if (message.startsWith(`record`)) {
    msg.reply(":craig:, entrar");
  } else if (message.startsWith(`end`)) {
    msg.reply(":craig:, sair");
  } else if (message.startsWith(`screen`)) {
    msg.channel.send(screen_share);
  } else if (message.toUpperCase().startsWith("AMON")) {
    msg.channel.send(amon);
  } else if (message.toUpperCase().startsWith("PRATOS")){
    msg.channel.send(deborah_prato);
  } else if(message.toUpperCase().startsWith("STFN")){
    msg.channel.send(`Fala, torneirinha ${STEFANO_ID}`);
  }
  return true;
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
