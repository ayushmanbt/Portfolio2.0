import "prismjs/themes/prism.css";
import "saber-highlight-css/default.css";

export default ({ setHead }) => {
  setHead({
    script: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=UA-142130562-2",
        async: true
      },
      {
        type: "text/javascript",
        src:
          "//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js",
        "data-dojo-config": "usePlainJson: true, isDebug: false"
      }
    ]
  });
};
