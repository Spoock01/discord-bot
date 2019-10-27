import {
  AMON,
  DEBORAH_PRATO,
  STEFANO_ID,
  MORTO,
  MOFI,
  THIAGO,
  ILUDIDA
} from "./Utils";

const imageList = [
  {
    id: "AMON",
    response: AMON
  },
  // {
  //   id: "PRATOS",
  //   response: DEBORAH_PRATO
  // },
  {
    id: "MOFI",
    response: MOFI
  },
  {
    id: "MORTO",
    response: MORTO
  },
  {
    id: "ILUDIDA",
    response: ILUDIDA
  },
  {
    id: "THIAGO",
    response: THIAGO
  },
  {
    id: "STFN",
    response: `Fala, torneirinha ${STEFANO_ID}`
  }
];

const isImageCommand = id => {
  return imageList.find(element => element.id === id.toUpperCase());
};

export { isImageCommand };
