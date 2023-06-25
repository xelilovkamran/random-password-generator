const passwordPlace = document.querySelector(".inputContainer input");
const range = document.querySelector(".rangeContainer input");
const copyEl = document.querySelector(".inputContainer i");
const generateBtn = document.querySelector(".btn");
const rangeValue = document.querySelector(".rangeContainer span");
const securityEl = document.querySelector(".securityBar");
const checkBoxes = document.querySelectorAll(".checkboxContainer input");

var allChars =
  "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let password;

const generatePassword = () => {
  let relatedChars = "";
  password = [];

  if (checkBoxes[0].checked) {
    const regEx = /[a-z]/g;
    relatedChars += allChars.match(regEx).join("");
  }
  if (checkBoxes[1].checked) {
    const regEx = /[A-Z]/g;
    relatedChars += allChars.match(regEx).join("");
  }
  if (checkBoxes[2].checked) {
    const regEx = /[0-9]/g;
    relatedChars += allChars.match(regEx).join("");
  }
  if (checkBoxes[3].checked) {
    const regEx = /[!@#$%^&*()]/g;
    relatedChars += allChars.match(regEx).join("");
  }

  if (relatedChars) {
    if (checkBoxes[4].checked) {
      for (let i = 0; i < range.value; i++) {
        let flag = 0;
        let letter =
          relatedChars[Math.floor(Math.random() * relatedChars.length)];
        for (let j = 0; j < password.length; j++) {
          if (password[j] === letter) {
            flag = 1;
          }
        }
        if (flag === 1) {
          i--;
        } else {
          password[i] = letter;
        }
      }
      if (checkBoxes[5].checked) {
        for (let i = 0; i < range.value; i++) {
          if (i % 3 === 0 && i !== 0) {
            password[i] = " ";
          }
        }
      }
    } else {
      for (let i = 0; i < range.value; i++) {
        password[i] =
          relatedChars[Math.floor(Math.random() * relatedChars.length)];
      }
      if (checkBoxes[5].checked) {
        for (let i = 0; i < range.value; i++) {
          if (i % 3 === 0 && i !== 0) {
            password[i] = " ";
          }
        }
      }
    }
  } else {
    if (checkBoxes[4].checked) {
      for (let i = 0; i < range.value; i++) {
        let flag = 0;
        let letter = allChars[Math.floor(Math.random() * allChars.length)];
        for (let j = 0; j < password.length; j++) {
          if (password[j] === letter) {
            flag = 1;
            break;
          }
        }
        if (flag === 1) {
          i--;
        } else {
          password[i] = letter;
        }
      }
      if (checkBoxes[5].checked) {
        for (let i = 0; i < range.value; i++) {
          if (i % 3 === 0 && i !== 0) {
            password[i] = " ";
          }
        }
      }
    } else {
      for (let i = 0; i < range.value; i++) {
        password[i] = allChars[Math.floor(Math.random() * allChars.length)];
      }
      if (checkBoxes[5].checked) {
        for (let i = 0; i < range.value; i++) {
          if (i % 3 === 0 && i !== 0) {
            password[i] = " ";
          }
        }
      }
    }
  }

  password = password.join("");
  passwordPlace.value = password;
  console.log(password);
};

const securityLevelShow = () => {
  if (range.value < 12) {
    securityEl.style.backgroundColor = "red";
    securityEl.style.width = "25%";
  } else if (range.value >= 12 && range.value < 16) {
    securityEl.style.backgroundColor = "yellow";
    securityEl.style.width = "50%";
  } else {
    securityEl.style.backgroundColor = "green";
    securityEl.style.width = "100%";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  generatePassword();
});

range.addEventListener("input", () => {
  rangeValue.innerHTML = range.value;
  generatePassword();
  securityLevelShow();
});

generateBtn.addEventListener("click", () => {
  generatePassword();
  copyEl.classList.replace("fa-clipboard-check", "fa-clipboard");
});

copyEl.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordPlace.value);
  copyEl.classList.replace("fa-clipboard", "fa-clipboard-check");
  setTimeout(() => {
    copyEl.classList.replace("fa-clipboard-check", "fa-clipboard");
  }, 2000);
});
