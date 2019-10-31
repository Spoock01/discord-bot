const axios = require("axios");
import Discord from "discord.js";

const getChampionsList = async (champion, msg) => {
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

  if (responseList.length == 1) msg.reply(responseList[0]);
  else if (responseList.length > 1) {
    const embed = new Discord.RichEmbed()
      .setTitle("Lista de Champions!!")
      .setColor(0x00ae86);

    responseList.forEach((champion, index) => {
      embed.addField(`#${index + 1}: ${champion}\n`, "Teste", false);
    });
    msg.reply(embed);
  } else msg.reply("Não achei");
};

getChampionsList("a");
