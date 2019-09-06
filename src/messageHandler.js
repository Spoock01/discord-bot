import { prefix } from "./config.json";
import { screen_share, help, amon } from "./Utils";

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

  console.log(msg.author);

  if (message.startsWith("help")) {
    help_message(msg);
  } else if (
    message.startsWith("kick") &&
    !msg.author.content.includes("<@619256163900588051>")
  ) {
    msg.channel.send("Tu tem moral aqui não, mizera");
  } else if (message.startsWith(`${prefix}record`)) {
    msg.channel.send(":craig:, entrar");
  } else if (message.startsWith(`${prefix}end`)) {
    msg.channel.send(":craig:, sair");
  } else if (message.startsWith(`${prefix}kick`)) {
    let member = msg.mentions.members.first();
    member
      .kick()
      .then(member => {
        msg.channel.send("Flwwwww " + member.displayName);
      })
      .catch(err => {
        console.log(`Trying to kick ${err.message}`);
      });
  } else if (message.startsWith(`${prefix}screen`)) {
    msg.channel.send(screen_share);
  } else if (message.toUpperCase().startsWith("AMON")) {
    msg.channel.send(amon);
  }
  return true;
};

const handle_message = msg => {
  if (msg.content.startsWith("!!")) {
    handle_prefix(msg);
  } else if (msg.content.includes("meu patrão")) {
    msg.reply(
      "Se eu sou seu patrão, vc eh meu escravo. Vá trabalhar, vagabundo do carai!"
    );
  } else if (handle_me_desculpa_joao(msg)) {
    msg.channel.send(`!!kick ${msg.author}`);
  }
};

export default handle_message;
