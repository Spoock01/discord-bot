import {
  amon,
  deborah_prato,
  STEFANO_ID,
  morto,
  mofi,
  thiago,
  iludida
} from "./Utils";

const imageList = [
  {
    id: "AMON",
    response: amon
  },
  {
    id: "PRATOS",
    response: deborah_prato
  },
  {
    id: "MOFI",
    response: mofi
  },
  {
    id: "MORTO",
    response: morto
  },
  {
    id: "ILUDIDA",
    response: iludida
  },
  {
    id: "THIAGO",
    response: thiago
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
