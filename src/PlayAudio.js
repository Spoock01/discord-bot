import ytdl from "ytdl-core";
import search from "yt-search";
import Discord from "discord.js";

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
    ytdl(server.queue[0].link.toString(), { filter: "audioonly" })
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

const getUrl = async (args, requester) => {
  return new Promise((resolve, reject) => {
    search(args, (err, res) => {
      if (err) {
        reject({
          link: "Manda dnv ai, mermaum"
        });
      }
      let videos = res.videos.slice(0, 1);
      let url = args;

      url = "http://www.youtube.com" + videos[0].url;

      resolve({
        songName: videos[0].title,
        link: url,
        requestedBy: requester
      });
    });
  });
};

const playStream = async (msg, args, command) => {
  args = args.substring(4, args.length).trim();

  switch (command) {
    case "play":
      var link = args;

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

      getUrl(link, msg.author.username).then(message => {
        msg.channel.send("Added: " + message.songName);

        server.queue.push(message);

        if (!msg.guild.voiceConnection)
          msg.member.voiceChannel.join().then(connection => {
            play(connection, msg);
          });
      });

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
    case "queue":
      var server = servers[msg.guild.id];

      if (server !== undefined) {
        const embed = new Discord.RichEmbed()
          .setTitle("Current queue!!")
          .setColor(0x00ae86);

        for (let i = 0; i < server.queue.length; i++) {
          var song = server.queue[i];

          embed.addField(
            `#${i + 1}: ${song.songName}\nRequested by: ${song.requestedBy}`,
            song.link,
            false
          );
        }

        if (server.queue.length == 0) msg.channel.send("Sem músicas na fila!");
        else msg.channel.send(embed);
      } else {
        msg.channel.send("Tem música na fila n, meu parceru!");
      }

      break;
  }
};

export { playSound, playStream };
