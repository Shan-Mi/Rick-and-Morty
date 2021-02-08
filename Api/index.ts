import axios from "axios";

const URL = "https://rickandmortyapi.com/api/";

const CHAR = "character";

export const getRandomCharacter = async () => {
  // generate a number between 1 and 671
  const randomNum = Math.floor(Math.random() * 671 + 1);
  return await axios.get(`${URL}${CHAR}/${randomNum}`);
};
