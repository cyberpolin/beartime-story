export const getRandomNumber = (min = 0, max = 100) => {
  return Math.random() * (max - min) + min;
};
