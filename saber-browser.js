import "prismjs/themes/prism.css";
import "saber-highlight-css/default.css";

export default ({ setHead }) => {
  setHead({
    script: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=UA-142130562-2",
        async: true
      }
    ]
  });
};
