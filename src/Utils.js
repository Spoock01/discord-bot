const AMON_ID = "<@281240158836097025>";
const ARTHUR_ID = "<@297154991175630848>";
const BOT_FAZ_DE_TUDO = "<@619256163900588051>";
const CAIO_ID = "<@269237215392038912>";
const DEBORAH_ID = "<@424353603130621952>";
const EDSON_ID = "<@292002546539823104>";
const YURE_ID = "<@292000201907109889>";
const FERNANDO_ID = "<@340558767877914624>";
const ILUZZY = "<@560571470158495764>";
const JOAO_ID = "<@234103982354726922>";
const JOAOVITOR_ID = "<@290227371397611520>";
const MUSICA = "<@235088799074484224>";
const PEDRO_ID = "<@204384301171736576>";
const STEFANO_ID = "<@211248047026470912>";
const THIAGO_ID = "<@218204996007755787>";

const SERVER_LINK = "https://discordapp.com/channels/"; // + serverID + channelID

const HELP = {
  "content": "",
  "embed": {
    "fields": [
      {
        "name": "— Música —",
        "value": "» play link ou nome da música\n» skip\n» stop\n» queue",
        "inline": false
      },
      {
        "name": "— Comuns —",
        "value": "» screen\n​» help\n​» dolar\n» frasedodia",
        "inline": false
      },
      {
        "name": "— Memes —",
        "value": "» amon\n​» pratos\n​» mofi\n​» thiago\n​» morto\n​» iludida\n» stfn",
        "inline": false
      }
    ],
    "title": "**Comandos!!**",
    "description": "Antes de qualquer comando use !!",
    "author": {
      "name": "BotFazDeTudo"
    },
    "color": 5198940
  }
};

const DEBORAH_PRATO = `Venha fazer seu trabalho, ${DEBORAH_ID}! https://i.imgur.com/6atgasg.jpg`;
const ILUDIDA = "https://i.imgur.com/CSpcli7.jpg";
const MOFI = "https://i.imgur.com/JYqAczJ.jpg";
const MORTO = "https://i.imgur.com/I6NqBAn.jpg";
const THIAGO = "https://i.imgur.com/hM5ZzVJ.jpg";
const AMON = `${AMON_ID} https://instagram.fjpa1-1.fna.fbcdn.net/vp/bd4c85fa0a122541ce2ba498c220dff1/5DF14C5C/t51.2885-15/e35/38789722_456161948216894_7148504665349792788_n.jpg?_nc_ht=instagram.fjpa1-1.fna.fbcdn.net&_nc_cat=102`;

var FRASES_DO_DIA = [
  "Com calma e jeito chega-se ao cu de qualquer sujeito. - Amon, 2019",
  "Uma coisa que acaba com meu dia é a noite.",
  "O cereal preferido do vampiro é a Aveia.",
  "A vida é um picolé que a morte chupa.",
  "Cada dia a mais é um dia a menos"
];

const rand_int = range => {
  return Math.floor(Math.random() * range);
};

export {
  THIAGO_ID,
  JOAO_ID,
  MUSICA,
  CAIO_ID,
  ARTHUR_ID,
  FERNANDO_ID,
  DEBORAH_ID,
  ILUZZY,
  HELP,
  AMON,
  BOT_FAZ_DE_TUDO,
  EDSON_ID,
  YURE_ID,
  JOAOVITOR_ID,
  PEDRO_ID,
  STEFANO_ID,
  DEBORAH_PRATO,
  FRASES_DO_DIA,
  rand_int,
  SERVER_LINK,
  THIAGO,
  MORTO,
  MOFI,
  ILUDIDA
};
