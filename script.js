let usedWords = [];
let key = [];
function generateUsername() {
  const names = [
    "Lucía",
    "Mateo",
    "Sofía",
    "Veronica",
    "Valentina",
    "Benjamín",
    "Emma",
    "Miguel",
    "Isabella",
    "Alejandro",
  ];

  const lastnames = [
    "Gómez",
    "Pérez",
    "Martínez",
    "González",
    "Rodríguez",
    "López",
    "Díaz",
    "Hernández",
    "Torres",
    "Flores",
  ];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomLastName =
    lastnames[Math.floor(Math.random() * lastnames.length)];
  document.getElementById("username").value = `${randomName} ${randomLastName}`;
  sessionStorage.setItem("username", `${randomName} ${randomLastName}`);
}
generateUsername();

function generatePassword() {
  document.getElementById("generar").addEventListener("click", (event) => {
    event.preventDefault();
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    document.getElementById("pass").value = password;
  });
}
generatePassword();

function getPasswords() {
  document.getElementById("ingresar").addEventListener("click", (event) => {
    event.preventDefault();
    const password = document.getElementById("pass").value;
    const repeatedPassword = document.getElementById("repPass").value;
    searchUsed(password, repeatedPassword);
  });
}

function searchUsed(password, repeatedPassword) {
  if (password == repeatedPassword) {
    location.href = "./win.html";
  }

  if (usedWords.includes(repeatedPassword)) {
    document.getElementById("error").innerHTML = "Contraseña ya registrada.";
  } else {
    document.getElementById("error").innerHTML = "";
    usedWords.push(repeatedPassword);
    let mappedRepeatedPassword = mapToUsedWord(repeatedPassword);
    mappedRepeatedPassword = checkRepPass(password, mappedRepeatedPassword);
    key.push(mappedRepeatedPassword);
    printUsedWord();
  }
}

function mapToUsedWord(password) {
  const letters = password.split("").map((letter) => {
    return {
      letter: letter,
      correct: false,
    };
  });

  const mappedWord = {
    word: password,
    letters,
  };

  console.log(mappedWord);
  return mappedWord;
}

function checkRepPass(password, repeatedPassword) {
  let splitedPass = password.split("");
  for (let c = 0; c < splitedPass.length; c++) {
    if (!repeatedPassword.letters[c]) {
      break;
    }

    if (splitedPass[c] == repeatedPassword.letters[c].letter) {
      repeatedPassword.letters[c].correct = true;
    }
  }
  return repeatedPassword;
}

function printUsedWord() {
  document.getElementById("usedWordDiv").innerHTML = key
    .map((word) => {
      return `"${getFormatedLetters(word.letters)}" `;
    })
    .join(", ");
}

function getFormatedLetters(letters) {
  return letters
    .map((letter) => {
      if (letter.correct) {
        return `<span class='correctLetter'>${letter.letter}</span>`;
      } else {
        return `<span class="letterError">${letter.letter}</span>`;
      }
    })
    .join("");
}
