let _name,
  _day,
  _month,
  _year,
  _profileID,
  _gender,
  _department,
  _salary,
  _notes;
let monthsInWords = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

class EmployeePayroll {
  get name() {
    return _name;
  }
  set name(name) {
    let reg = /^([A-Z])([a-zA-Z0-9]){2}/gm;
    if (reg.test(name.value)) {
      const div = name.parentElement;
      div.className = "inputs-div-name";
      const small = div.querySelector("small");
      small.innerText = "";
      _name = name.value;
    } else {
      const div = name.parentElement;
      div.className = "inputs-div-name-eror";
      const small = div.querySelector("small");
      small.innerText =
        "Name should start with captial and have at least 3 characters";
      alert("Name should start with captial and have at least 3 characters!");
    }
  }

  get profileID() {
    return _profileID;
  }
  set profileID(profileRadio) {
    _profileID = this.forRadio(profileRadio);
  }

  get gender() {
    return _gender;
  }
  set gender(gender) {
    _gender = this.forRadio(gender);
  }

  get department() {
    return _department;
  }
  set department(department) {
    _department = this.forCheckbox(department);
  }

  get salary() {
    return _salary;
  }
  set salary(salary) {
    _salary = salary.value;
  }

  get date() {
    return [_day, _month, _year];
  }
  set date([day, month, year]) {
    let inputDate = new Date(year.value, month.value, day.value);
    let inputDateInMs = inputDate.getTime();
    const timeElapsed = Date.now();
    let numDaysPassed = (timeElapsed - inputDateInMs) / (1000 * 60 * 60 * 24);
    if (numDaysPassed <= 30) {
      const div = day.parentElement;
      div.className = "inputs inputs-450px";
      const small = div.querySelector("small");
      small.innerText = "";
      _day = day.value;
      _month = month.value;
      _year = year.value;
    } else {
      const div = day.parentElement;
      div.className = "inputs inputs-450px error";
      const small = div.querySelector("small");
      small.innerText = "Invalid date";
      alert("Start Date should be within 30 days of joining!");
    }
  }

  get notes() {
    return _notes;
  }
  set notes(notes) {
    _notes = notes.value;
  }

  forRadio(element) {
    let _element;
    for (let i = 0; i < element.length; i++) {
      if (element[i].checked) {
        _element = element[i].value;
      }
    }
    return _element;
  }

  forCheckbox(element) {
    let elementList = [];
    for (let i = 0; i < element.length; i++) {
      if (element[i].checked) {
        elementList.push(element[i].value);
      }
    }
    return elementList;
  }
}

const emp = new EmployeePayroll();
let home_url = "http://localhost:3000/EmployeePayrollList/";

function makeAjaxCall(methodType, url, async = false, data = null) {
  return new Promise(function (resolve, reject) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
          resolve(xhttp.responseText);
        } else if (xhttp.status >= 400) {
          reject(error);
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

function submit() {
  emp.name = document.getElementById("name");
  emp.profileID = document.getElementsByName("profile-radio");
  emp.gender = document.getElementsByName("gender");
  emp.department = document.getElementsByName("department");
  emp.salary = document.getElementById("salary-input");
  emp.date = [
    document.getElementById("day"),
    document.getElementById("month"),
    document.getElementById("year"),
  ];
  emp.notes = document.getElementById("notes");
  let payrollObject = createPayrollObject();
  if (localStorage.getItem("key") != undefined) {
    addData(payrollObject, localStorage.getItem("key"));
  } else {
    if (payrollObject) {
      addData(payrollObject);
      reset();
      alert("User Added successfully!");
    }
  }
}

function createPayrollObject(key) {
  let payrollObject = {};
  payrollObject["name"] = emp.name;
  payrollObject["profileID"] = emp.profileID;
  payrollObject["gender"] = emp.gender;
  payrollObject["department"] = emp.department;
  payrollObject["salary"] = emp.salary;
  payrollObject["date"] = emp.date;
  payrollObject["notes"] = emp.notes;
  if (key != undefined) {
    payrollObject["id"] = key;
  } else {
    var uniq = new Date().getTime();
    payrollObject["id"] = uniq;
  }
  if (
    payrollObject.name != undefined &&
    payrollObject.date[0] != undefined &&
    payrollObject.profileID.length != undefined &&
    payrollObject.gender != undefined &&
    payrollObject.department.length > 0 &&
    payrollObject.salary != undefined &&
    payrollObject.notes != undefined &&
    payrollObject.id != undefined &&
    payrollObject.notes.length > 0
  ) {
    return payrollObject;
  } else {
    alert("Please fill all details");
  }
}

function addData(payrollObject, key) {
  if (key != undefined) {
    makeAjaxCall("put", home_url + key, (async = true), payrollObject)
      .then((responseText) => {
        console.log("Added object: " + responseText);
      })
      .catch((error) => {
        console.log("Server responded with error\n" + error);
      });
  } else {
    makeAjaxCall("post", home_url, (async = true), payrollObject)
      .then((responseText) => {
        console.log("Added object: " + responseText);
      })
      .catch((error) => {
        console.log("Server responded with error\n" + error);
      });
  }
}

function reset() {
  document.getElementById("name").value = "";
  document.getElementById("profile-photo-1").checked = false;
  document.getElementById("profile-photo-2").checked = false;
  document.getElementById("profile-photo-3").checked = false;
  document.getElementById("profile-photo-4").checked = false;
  document.getElementById("male").checked = false;
  document.getElementById("female").checked = false;
  document.getElementById("department-1").checked = false;
  document.getElementById("department-2").checked = false;
  document.getElementById("department-3").checked = false;
  document.getElementById("department-4").checked = false;
  document.getElementById("department-5").checked = false;
  document.getElementById("day").value = 0;
  document.getElementById("month").value = 0;
  document.getElementById("year").value = 0;
  document.getElementById("notes").value = "";
  document.getElementById("salary-input").value = 25000;
  let salaryHTML = `<p>25000</p>`;
  document.getElementById("salary-output").innerHTML = salaryHTML;
}

function cancel() {
  window.location = "../pages/home-page.html";
  localStorage.removeItem("key");
}

function setValues(empObj) {
  document.getElementById("name").value = empObj.name;

  let profileRadio = document.getElementsByName("profile-radio");
  for (let i = 0; i < profileRadio.length; i++) {
    if (profileRadio[i].value == empObj.profileID) {
      document.getElementById("profile-photo-" + (i + 1)).checked = true;
    }
  }

  let gender = document.getElementsByName("gender");
  for (let i = 0; i < gender.length; i++) {
    if (gender[i].value == empObj.gender) {
      document.getElementById(gender[i].id).checked = true;
    }
  }

  let department = document.getElementsByName("department");
  for (let i = 0; i < department.length; i++) {
    if (empObj.department.includes(department[i].value)) {
      document.getElementById("department-" + (i + 1)).checked = true;
    }
  }

  document.getElementById("day").value = empObj.date[0];
  document.getElementById("month").value = empObj.date[1];
  document.getElementById("year").value = empObj.date[2];

  document.getElementById("notes").value = empObj.notes;

  document.getElementById("salary-input").value = empObj.salary;
  let salaryHTML = `<p>${empObj.salary}</p>`;
  document.getElementById("salary-output").innerHTML = salaryHTML;
}

function checkForUpdates() {
  let login_url = "http://localhost:3000/loginSuccess/0";
  makeAjaxCall("get", login_url, (async = true)).then((result) => {
    if (JSON.parse(result).pass) {
      if (localStorage.getItem("key") != undefined) {
        let key = localStorage.getItem("key");
        makeAjaxCall("get", home_url + key, (async = true))
          .then((responseText) => {
            console.log(JSON.parse(responseText));
            setValues(JSON.parse(responseText));
          })
          .catch((error) => {
            console.log("Server responded with error\n" + error);
          });
      }
    } else {
      window.location = "../pages/login.html";
    }
  });
}

function deleteUser(key) {
  makeAjaxCall("delete", home_url + key, (async = true))
    .then(() => {
      console.log("User deleted!");
    })
    .catch((error) => {
      console.log("Server responded with error\n" + error);
    });
  createTable();
}

function updateUser(key) {
  window.location = "../pages/payroll-form.html";
  localStorage.setItem("key", key);
}

//for home page
function department(deptlist) {
  let deptmt = "";
  for (const dept of deptlist) {
    deptmt = `${deptmt}<label class = "department">${dept}</label>${" "}`;
  }
  return deptmt;
}

function buildTable(empObjList) {
  let table_header = `<thead><tr>
                        <th></th>
                        <th>NAME</th>
                        <th>GENDER</th>
                        <th>DEPARTMENT</th>
                        <th>SALARY</th>
                        <th>START DATE</th>
                        <th>ACTIONS</th>
                        </tr><thead><tbody>`;

  let table_content = `${table_header}`;

  empObjList.forEach((empObj) => {
    let dept = department(empObj.department);
    table_content = `${table_content}
        <tr>
        <td><img src="${empObj.profileID}" alt="1"></td>
        <td>${empObj.name}</td>
        <td>${empObj.gender}</td>
        <td>${dept}</td>
        <td>&#x20B9; ${empObj.salary}</td>
        <td>${
          empObj.date[0] +
          " " +
          monthsInWords[empObj.date[1]] +
          " " +
          empObj.date[2]
        }</td>
        <td><div>
            <button class="inside-button" id="${
              empObj.id
            }" onclick="deleteUser(this.id)">&#128465;</button>
            <button class="inside-button" id="${
              empObj.id
            }" onclick="updateUser(this.id)">&#9998;</button>
            </div>
        </td>
        </tr>`;
  });
  document.getElementById("payroll-table").innerHTML = table_content;
}

function createTable() {
  let login_url = "http://localhost:3000/loginSuccess/0";
  let cred_url = "http://localhost:3000/CredObjectList/";

  makeAjaxCall("get", login_url, (async = true)).then((result) => {
    if (JSON.parse(result).pass) {
      makeAjaxCall("get", home_url, (async = true))
        .then((responseText) => {
          let empObjList = JSON.parse(responseText);
          document.getElementById("table-count").innerText = empObjList.length;
          buildTable(empObjList);
          makeAjaxCall("get", login_url, (async = true)).then((data) => {
            makeAjaxCall(
              "get",
              cred_url + JSON.parse(data).key,
              (async = true)
            ).then((credObject) => {
              document.getElementById("user-email").innerHTML = "&#x1F4E7;&nbsp;&nbsp;:&nbsp;&nbsp;" +JSON.parse(credObject).email;
              document.getElementById("user-phone").innerHTML = "&#x260E;&nbsp;&nbsp;:&nbsp;&nbsp;" +JSON.parse(credObject).phone;
            });
          });
        })
        .catch((error) => {
          console.log("Server responded with error\n" + error);
        });
    } else {
      window.location = "../pages/login.html";
    }
  });
}

//to search
$(`#search-input`).on("keyup", function () {
  var value = $(this).val();
  search(value);
});

function search(value) {
  var filteredData = [];
  makeAjaxCall("get", home_url, (async = true)).then((responseText) => {
    let data = JSON.parse(responseText);
    for (let i = 0; i < data.length; i++) {
      value = value.toLowerCase();
      let name = data[i].name.toLowerCase();
      if (name.includes(value)) {
        filteredData.push(data[i]);
      }
    }
    buildTable(filteredData);
  });
}
