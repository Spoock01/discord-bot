import ytdl from "ytdl-core";
import { Message } from "discord.js";

var servers = {};

const playSound = (msg, path) => {
  var isReady = true;

  if (isReady) {
    isReady = false;

    var voiceChannel = msg.member.voiceChannel;

    try {
      voiceChannel
        .join()
        .then(connection => {
          const dispatcher = connection.playFile(__dirname + path);
          dispatcher.on("end", end => {
            voiceChannel.leave();
          });
        })
        .catch(err => {
          msg.reply("Consegui n");
        });
    } catch (err) {
      msg.reply("Entra no servidor ai, meu parceru!!!!");
    }
  }
};

const play = (connection, msg) => {
  var server = servers[msg.guild.id];
  server.dispatcher = connection.playStream(
    ytdl(server.queue[0], { filter: "audioonly" })
  );
  server.queue.shift();

  server.dispatcher.on("end", () => {
    if (server.queue[0]) {
      play(connection, msg);
    } else {
      connection.disconnect();
    }
  });
};

const playStream = (msg, args, command) => {
  switch (command) {
    case "play":
      var link = args.split(" ")[1];

      if (!link) {
        msg.reply("Manda um link ai, mermaum");
        return;
      }

      if (!msg.member.voiceChannel) {
        msg.reply("Entra num servidor aí, moral");
        return;
      }

      if (!servers[msg.guild.id]) servers[msg.guild.id] = { queue: [] };

      var server = servers[msg.guild.id];

      var valid = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      if (!valid.test(link)) {
        msg.reply("Tem coisa errada nesse link aí, mermaum");
        return;
      }

      server.queue.push(link);

      if (!msg.guild.voiceConnection)
        msg.member.voiceChannel.join().then(connection => {
          play(connection, msg);
        });
      else {
        console.log("tchau");
      }
      break;
    case "skip":
      var server = servers[msg.guild.id];
      if (server.dispatcher) server.dispatcher.end();
      break;

    case "stop":
      var server = servers[msg.guild.id];

      if (msg.guild.voiceConnection) {
        for (let i = server.queue.length - 1; i >= 0; i--)
          server.queue.splice(i, 1);

        msg.reply("vlw flws");
        server.dispatcher.end();
      }
      break;
  }
};

export { playSound, playStream };
