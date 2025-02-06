const getImage = (imgUrl) => {
  if (!imgUrl) {
    console.error("getImage received an invalid image name:", imgUrl);
    return ""; 
  }
  try {
    return require(`@/assets/${imgUrl}`); 
  } catch (error) {
    console.error(`Image not found: ${imgUrl}`, error);
    return require("@/assets/logouticon.jpg");
  }
};

export default getImage;
