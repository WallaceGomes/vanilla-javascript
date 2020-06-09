const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message and
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//show input success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//check Email is valid
function checkEmail(input) {
  //regex
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

//Check required fields
function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    //.trim() => retira os espaços em branco
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required!`);
    } else {
      showSuccess(input);
    }
  });
}

//checkInputlength
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters!`,
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`,
    );
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

//Get fieldName
function getFieldName(input) {
  //retorna o nome do campo de input com a primeira letra em CAPS
  //Transforma a primeira letar para Upper e concatena com o restante da string
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listeners
form.addEventListener('submit', function (event) {
  event.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3);
  checkLength(password, 6, 25);
  checkPasswordsMatch(password, password2);
  checkEmail(email);
});
