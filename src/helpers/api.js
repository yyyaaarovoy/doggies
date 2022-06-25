export const getBreedsList = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const { message, status } = await response.json();
  return { message, status };
};

export const getRandomDogImageByBreed = async (breed) => {
  const response = await fetch(
    "https://dog.ceo/api/breed/" + breed + "/images/random"
  );
  const { message, status } = await response.json();
  return { message, status };
};
