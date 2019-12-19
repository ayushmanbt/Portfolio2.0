<template>
  <div>
    <h1 class="heading">Contact Me 📞</h1>
    <form action="https://formspree.io/xbjlwobn" method="POST">
      <label>
        Name:
        <input type="text" name="name" required />
      </label>
      <label>
        Email:
        <input type="text" name="_replyto" required />
      </label>

      <label>
        Message:
        <textarea name="message" required rows="10"></textarea>
      </label>

      <input type="submit" value="Send" class="download-resume" />
    </form>
  </div>
</template>


<script>
// export const data = {
//   layout: "default",
//   title: ""
// };
export default {
  mounted: {}
};
</script>


<style scoped>
/* h1 {
  text-align: center;

  
} */

.dark-mode form {
  background: #000;
}

.dark-mode label {
  color: white;
}

.dark-mode form input,
.dark-mode form textarea {
  background: #111;
  color: white;
  border: 1px solid orangered;
}

form {
  margin: 20px 10px;
  width: 500px;
  height: fit-content;
  background: white;
  border-radius: 10px;
}

form label {
  font-size: 14px;
  color: #000000;
}

form input,
form textarea {
  margin: 15px 0;
  padding: 15px 10px;
  width: 100%;
  outline: none;
  border: 1px solid #bbb;
  border-radius: 20px;
  display: inline-block;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -ms-transition: 0.2s ease all;
  -o-transition: 0.2s ease all;
  transition: 0.2s ease all;
}

form input[type="text"]:focus,
form input[type="password"]:focus {
  border-color: #a91b4b;
}

.dark-mode .download-resume {
  background: #c25700;
}

.dark-mode .download-resume:hover {
  background: #e96900;
}

.download-resume {
  padding: 10px 30px;
  background: #a91b4b;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  border-radius: 40px;
  text-align: center;
}

.download-resume::before {
  display: none;
}

.download-resume:hover {
  background: #5f0926;
  color: white;
}

.download-resume {
  cursor: pointer;
}

@media screen and (max-width: 980px) {
  form {
    width: 90%;
  }
}

@media screen and (max-width: 550px) {
  form {
    width: 90%;
  }
}
</style>