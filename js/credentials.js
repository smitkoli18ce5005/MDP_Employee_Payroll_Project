let _email, _phone, _password, _confirmPassword;
const LOG_IN = {
    pass: true
}
const LOG_OUT = {
    pass: false
}

class Credentials {
  get email() {
    return _email;
  }
  set email(email) {
    let reg =
      /^([a-z]+)([\.][a-z]+)?(@)([a-z]+)(.)([a-z]{2,3})([\.][a-z]{2,3})$/;
    if (reg.test(email.value)) {
      const div = email.parentElement;
      div.className = "inputs-div-name";
      const small = div.querySelector("small");
      small.innerText = "";
      _email = email.value;
    } else {
      const div = email.parentElement;
      div.className = "inputs-div-name error";
      const small = div.querySelector("small");
      small.innerText = "Invalid email";
      //alert("Invalid Email");
    }
  }

  get phone() {
    return _phone;
  }
  set phone(phone) {
    let reg = /^([\d]{2})(\-)([789])([\d]{9})$/;
    if (reg.test(phone.value)) {
      const div = phone.parentElement;
      div.className = "inputs-div-name";
      const small = div.querySelector("small");
      small.innerText = " ";
      _phone = phone.value;
    } else {
      const div = phone.parentElement;
      div.className = "inputs-div-name error";
      const small = div.querySelector("small");
      small.innerText = "Invalid phone number";
      //alert("Invalid Email");
    }
  }

  get password() {
    return _password;
  }
  set password(password) {
    let reg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]{1}).{8,}$/;
    if (reg.test(password.value)) {
      const div = password.parentElement;
      div.className = "inputs-div-name";
      const small = div.querySelector("small");
      small.innerText = "";
      _password = password.value;
    } else {
      const div = password.parentElement;
      div.className = "inputs-div-name error";
      const small = div.querySelector("small");
      small.innerText =
        "Use 8 or more characters with a mix of letters, numbers & symbols";
      //alert("Use 8 or more characters with a mix of letters, numbers & symbols!");
    }
  }

  get confirmPassword() {
    return _confirmPassword;
  }
  set confirmPassword(confirmPassword) {
    if (_password === confirmPassword.value) {
      const div = confirmPassword.parentElement;
      div.className = "inputs-div-name";
      const small = div.querySelector("small");
      small.innerText = "";
      _confirmPassword = confirmPassword.value;
    } else {
      const div = confirmPassword.parentElement;
      div.className = "inputs-div-name error";
      const small = div.querySelector("small");
      small.innerText = "Please enter same password";
      //alert("Please enter same password!");
    }
  }
}

let cred = new Credentials();
let cred_url = "http://localhost:3000/CredObjectList/";
let login_url = "http://localhost:3000/loginSuccess/0";

function makeAjaxCall(methodType, url, async = false, data = null) {
  return new Promise(function (resolve, reject) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
          resolve(xhttp.responseText);
        } else if (xhttp.status >= 400) {
          reject("error");
        }
      }
    };

    xhttp.open(methodType, url, async);
    if (data) {
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.send(JSON.stringify(data));
    } else {
      xhttp.send();
    }
  });
}

async function login() {
  cred.phone = document.getElementById("phone");
  cred.password = document.getElementById("password");

  if (cred.phone != undefined && cred.password != undefined) {
    await makeAjaxCall("get", cred_url + cred.phone, (async = true))
      .then((credObject) => {
        if (JSON.parse(credObject).password === cred.password) {
          makeAjaxCall("put", login_url, (async = true), LOG_IN);
          window.location = "../pages/home-page.html";
        } else {
            alert("Entered credentials are wrong! Sign up instead?");
        }
      })
      .catch((error) => {
        console.log("Server responded with error\n" + error);
      });
  } else {
    //alert("Please fill all details");
  }
}

async function logout(){
  await makeAjaxCall("put", login_url, (async = true), LOG_OUT);
  window.location = "../pages/login.html";
}

async function signUp() {
  cred.email = document.getElementById("email");
  cred.phone = document.getElementById("phone");
  cred.password = document.getElementById("password");
  cred.confirmPassword = document.getElementById("confirm-password");
  let credObject = createCredObject();
  if (credObject) {
    await makeAjaxCall("get", cred_url, async=true).then((cred) => {
      if(cred != undefined){
        makeAjaxCall("post", cred_url, (async = true), credObject);
      }
      window.location = "../pages/login.html";
    }).catch((error) => {
      console.log(error);
    });
  }
}

function createCredObject() {
  let credObject = {};
  credObject["email"] = cred.email;
  credObject["phone"] = cred.phone;
  credObject["password"] = cred.password;
  credObject["confirmPassword"] = cred.confirmPassword;
  credObject["id"] = cred.phone;

  if (
    credObject["email"] != undefined &&
    credObject["phone"] != undefined &&
    credObject["password"] != undefined &&
    credObject["confirmPassword"] != undefined &&
    credObject["id"] != undefined
  ) {
    return credObject;
  } else {
    alert("Please fill all details");
  }
}
