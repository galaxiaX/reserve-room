export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export const randomDarkColor = () => {
  const min = 50;

  const randomChannel = () =>
    Math.floor(Math.random() * (256 - min) + min)
      .toString(16)
      .padStart(2, '0');

  const red = randomChannel();
  const green = randomChannel();
  const blue = randomChannel();

  return `#${red}${green}${blue}`;
};
