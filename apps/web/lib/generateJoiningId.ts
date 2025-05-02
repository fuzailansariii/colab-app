const generateJoiningId = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

export default generateJoiningId;
