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

export { playSound };
