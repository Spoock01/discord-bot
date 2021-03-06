import { playSound, playStream } from "./PlayAudio";
import {
  kickUser,
  randomInterval,
  randomList,
  getChampionsList
} from "./MainCommands";
import { isImageCommand } from "./ImageCommands";
import { HELP } from "./Utils";
import {
  fetchDolar,
  startsWith,
  screenHandler,
  ping,
  fraseDoDia
} from "./RandomCommands";

const helpCommand = msg => {
  msg.channel.send(HELP);
};

const meDesculpaCommand = msg => {
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

const prefixCommands = async msg => {
  var message = msg.content.replace(".", "");

  if (startsWith(message, "PLAY")) {
    playStream(msg, message, "play");
  } else if (startsWith(message, "SKIP")) {
    playStream(msg, message, "skip");
  } else if (startsWith(message, "STOP")) {
    playStream(msg, message, "stop");
  } else if (startsWith(message, "QUEUE")) {
    playStream(msg, message, "queue");
  } else if (startsWith(message, "HELP")) return helpCommand(msg);
  else if (startsWith(message, "KICK")) {
    kickUser(msg);
  } else if (startsWith(message, "SCREEN")) {
    screenHandler(msg);
  } else if (startsWith(message, "AMON2")) {
    playSound(msg, "/audio/CaioAmonTomarNoCu.mp3");
  } else if (startsWith(message, "PING")) {
    ping(msg);
  } else if (startsWith(message, "DOLAR")) {
    fetchDolar(msg);
  } else if (startsWith(message, "FRASEDODIA")) {
    fraseDoDia(msg);
  } else {
    try {
      var { response } = isImageCommand(message);
      msg.channel.send(response);
    } catch (e) {
      if (startsWith(message, "RANDINT")) {
        randomInterval(message, msg);
      } else if (startsWith(message, "RANDLIST")) {
        randomList(message, msg);
      } else if (startsWith(message, "LOL")) {
        getChampionsList(message, msg);
      }
    }
  }
};

const handle_message = msg => {
  if (msg.content.startsWith(".")) {
    prefixCommands(msg);
  } else if (msg.content.includes("meu patrão")) {
    msg.reply(
      "Se eu sou seu patrão, vc eh meu escravo.\
       Vá trabalhar, vagabundo do carai!"
    );
  } else if (meDesculpaCommand(msg)) {
    msg.channel.send(`.kick ${msg.author}`);
  }
};

export default handle_message;
