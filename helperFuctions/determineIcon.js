let iconBase = require("../images/iconList.json");

const returnDefaultIcon = name => {
  let key = String(name).toLowerCase();
  let iconBaseKeys = Object.keys(iconBase);
  if (iconBaseKeys.indexOf(key) !== -1) {
    return iconBase[key];
  }
  return iconBase.default;
};

// console.log(returnDefaultIcon("HTML5"));

export default returnDefaultIcon;
