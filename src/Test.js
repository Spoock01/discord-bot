// Math.floor(Math.random() * range);

const randomInterval = (message, msg) => {
  message = "RAND 10 2 20";
  var numbers = message
    .replace("RAND", "")
    .trim()
    .split(" ");

  if (numbers.length < 2) {
    // msg.reply("Tá faltando número aí. Manda direito");
    console.log("Faltando numero");
  } else {
    var first = parseInt(numbers[0]);
    var second = parseInt(numbers[1]);

    if (first > second) {
      [first, second] = [second, first];
    }

    var response = first + Math.floor(Math.random() * (second - first + 1));

    if (isNaN(response)) {
      console.log("Tá querendo trollar é? Manda só número, palhaço(a)");
    } else {
      console.log(response);
    }
  }
};

const randomList = (message, msg) => {
  var numbers = message
    .replace("RAND", "")
    .trim()
    .split(" ");

  if (numbers[0] == "") {
    // msg.reply("Tá faltando número aí. Manda direito");
    console.log(
      "Mermão, bote os nomes separados por espaço aí. E outra coisa, n me faça perder tempo n, seu animal."
    );
  } else {
    var response = Math.floor(Math.random() * numbers.length);
    console.log(numbers[response]);
  }
};

randomList("");
