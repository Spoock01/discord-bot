import { JOAO_ID, FERNANDO_ID, LOL } from "./Utils";
import axios from "axios";
import Discord from "discord.js";

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

const getChampionsList = async (champion, msg) => {
  champion = champion.replace("lol", "").trim();

  if (champion == "") {
    msg.reply("Faltou digitar o champion ou começo do nome do champion");
    return;
  }

  const opggLink = "https://br.op.gg/champion/";

  var currentPatch = await axios.get(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );

  currentPatch = currentPatch.data[0];

  const championsJson = await axios.get(
    "http://ddragon.leagueoflegends.com/cdn/" +
      currentPatch +
      "/data/en_US/champion.json"
  );

  const championsList = championsJson.data.data;
  var responseList = [];
  var response = LOL;

  response.embed.fields[0].value = "";

  Object.keys(championsList).forEach(key => {
    key = key.toLowerCase();
    champion = champion.toLowerCase();

    if (champion.length >= 3 && key.includes(champion)) {
      responseList.push(opggLink + key);
    } else if (champion.length < 3 && champion.length > 0) {
      if (key.startsWith(champion)) {
        responseList.push(key);
      }
    }
  });

  if (responseList.length == 1 && champion.length >= 3) {
    response.embed.title = "**Toma o link!**";
    response.embed.fields[0].name = "- Link -";

    if (!responseList[0].includes(opggLink)) {
      responseList[0] = opggLink + responseList[0];
    }
    response.embed.fields[0].value = responseList[0];

    msg.channel.send(response);
  } else if (responseList.length >= 1) {
    response.embed.title = "**Toma a lista!**";
    response.embed.fields[0].name = "- Lista -";
    responseList.forEach(champion => {
      response.embed.fields[0].value += "» " + champion + "\n";
    });
    msg.channel.send(response);
  } else msg.reply("Não achei");

  response = undefined;
};

export { kickUser, randomInterval, randomList, getChampionsList };
