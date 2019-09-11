import { screen_share, help, amon, JOAO_ID, deborah_prato, STEFANO_ID, FRASES_DO_DIA } from "./Utils";

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
  } else if (message.toUpperCase().startsWith(`RECORD`)) {
    msg.reply(":craig:, entrar");
  } else if (message.toUpperCase().startsWith(`END`)) {
    msg.reply(":craig:, sair");
  } else if (message.toUpperCase().startsWith(`SCREEN`)) {
    let member = msg.member.voiceChannel.toString();
    var memberChannel = member.substring(2, (member.length - 1));

    var screen_link = screen_share.filter((channel) =>{
      return channel.includes(memberChannel);
    });

    msg.reply("Toma o link aí: " + screen_link[0]);

  } else if (message.toUpperCase().startsWith("AMON")) {
    msg.channel.send(amon);
  } else if (message.toUpperCase().startsWith("PRATOS")){
    msg.channel.send(deborah_prato);
  } else if(message.toUpperCase().startsWith("STFN")){
    msg.channel.send(`Fala, torneirinha ${STEFANO_ID}`);
  } else if(message.toUpperCase().startsWith("FRASEDODIA")){
    var index = Math.floor(Math.random() * FRASES_DO_DIA.length);
    msg.reply(FRASES_DO_DIA[index]);

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
