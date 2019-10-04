import { JOAO_ID, FERNANDO_ID } from "./Utils";

const kickUser = msg => {
  let member = msg.mentions.members.first();

  if (msg.author == FERNANDO_ID) {
    msg.channel.send(`!!kick ${FERNANDO_ID}`);
    return;
  }

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
};

export { kickUser };
