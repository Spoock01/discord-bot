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

const randomInterval = (message, msg) => {
  message = message.toUpperCase();

  var numbers = message
    .replace("RANDINT", "")
    .trim()
    .split(" ");

  if (numbers.length < 2) {
    msg.reply("Faltando intervalo!");
  } else {
    var first = parseInt(numbers[0]);
    var second = parseInt(numbers[1]);

    if (first > second) {
      [first, second] = [second, first];
    }

    var response = first + Math.floor(Math.random() * (second - first + 1));

    if (isNaN(response)) {
      msg.reply("Tá querendo trollar é? Manda só número, palhaço(a)");
    } else {
      msg.reply(response);
    }
  }
};

const randomList = (message, msg) => {
  message = message.toUpperCase();
  var numbers = message
    .replace("RANDLIST", "")
    .trim()
    .split(" ");

  if (numbers[0] == "") {
    // msg.reply("Tá faltando número aí. Manda direito");
    msg.reply(
      "Mermão, bote os nomes separados por espaço aí. E outra coisa, n me faça perder tempo n, seu animal."
    );
  } else {
    var response = Math.floor(Math.random() * numbers.length);
    msg.reply(numbers[response]);
  }
};

export { kickUser, randomInterval, randomList };
