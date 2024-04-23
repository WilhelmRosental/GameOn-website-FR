/** ------------------------ DOM ELEMENTS ------------------------ **/
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".btn-modal");
const formContainer = document.getElementById("formContainer");
const formConfirmationModal = document.getElementById("formConfirmationModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeConfirmationModalBtn = document.getElementById("closeConfirmationModalBtn");

const errorMsgElements = {
  firstName: document.getElementById("firstNameErrorMsg"),
  lastName: document.getElementById("lastNameErrorMsg"),
  email: document.getElementById("emailErrorMsg"),
  birthdate: document.getElementById("birthdateErrorMsg"),
  quantity: document.getElementById("quantityErrorMsg"),
  location: document.getElementById("locationErrorMsg"),
  terms: document.getElementById("termsErrorMsg")
};

/** ------------------------ NAVIGATION MENU ------------------------ **/
function toggleMenu() {
  var menu = document.getElementById('menuContainer');
  if (menu.style.left === '0px') {
      menu.style.left = '-100%';
  } else {
      menu.style.left = '0px';
  }
}

/** ------------------------ FORM DATA AND VALIDATION ------------------------ **/
const formInputs = {
  firstName: document.getElementById("firstName"),
  lastName: document.getElementById("lastName"),
  email: document.getElementById("email"),
  birthdate: document.getElementById("birthdate"),
  quantity: document.getElementById("quantity"),
  terms: document.getElementById("checkbox1"),
  location: document.querySelectorAll("input[name='location']")
};

const nameRegExp = /^[a-zA-ZÀ-ȕ-\s]{2,}$/;
const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;

const errorMsg = {
  firstName: "Le champ du prénom n'est pas valide ou incomplet",
  lastName: "Le champ du nom n'est pas valide ou incomplet",
  email: "Le champ de l'email n'est pas valide ou incomplet",
  birthdate: "La date de naissance n'est pas valide ou incomplète",
  quantity: "Le nombre de tournois indiqué n'est pas valide",
  location: "Veuillez sélectionner une ville",
  terms: "Vous devez accepter les conditions d'utilisation"
};

/** ------------------- REALTIME VALIDATION -------------------------- **/
Object.entries(formInputs).forEach(([key, input]) => {
  const eventType = key === 'quantity' || key === 'location' ? 'change' : 'input';
  if (key !== 'location') {
    input.addEventListener(eventType, () => validateInput(key));
  } else {
    input.forEach(radioInput => radioInput.addEventListener(eventType, () => validateInput(key)));
  }
});

function validateInput(inputKey) {
  let isValid = false;
  switch (inputKey) {
    case 'firstName':
      isValid = nameRegExp.test(formInputs[inputKey].value);
      break;
    case 'lastName':
      isValid = nameRegExp.test(formInputs[inputKey].value);
      break;
    case 'email':
      isValid = emailRegExp.test(formInputs.email.value);
      break;
    case 'birthdate':
      isValid = formInputs.birthdate.value !== "";
      break;
    case 'quantity':
      isValid = formInputs.quantity.value !== "" && formInputs.quantity.value >= 0;
      break;
    case 'location':
      isValid = Array.from(formInputs.location).some(input => input.checked);
      break;
    case 'terms':
      isValid = formInputs.terms.checked;
      break;
  }
  errorMsgElements[inputKey].textContent = isValid ? "" : errorMsg[inputKey];
  return isValid;
}

/** ------------------------ FORM SUBMISSION ------------------------ **/
formContainer.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;

  Object.keys(formInputs).forEach(inputKey => {
    if (!validateInput(inputKey)) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    modalbg.style.display = "none";
    formConfirmationModal.style.display = "block";
    console.log('Inputs :', formInputs);
    formContainer.reset();
  }
});

/** ------------------------ MODAL HANDLING ------------------------ **/
modalBtn.forEach((btn) => btn.addEventListener("click", () => (modalbg.style.display = "block")));
closeModalBtn.addEventListener("click", () => (modalbg.style.display = "none"));
closeConfirmationModalBtn.addEventListener("click", () => (formConfirmationModal.style.display = "none"));
