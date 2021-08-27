let home_url = "http://localhost:3000/EmployeePayrollList/";
function makeAjaxCall(methodType, url, async = false, data = null) {
  return new Promise(function (resolve, reject) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      console.log("ReadyState: " + xhttp.readyState);
      if (xhttp.readyState == 4) {
        console.log("Started!");
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

function displayData(str) {
  makeAjaxCall("get", home_url, (async = true))
    .then((responseText) =>
      console.log("Respose from the server: " + responseText)
    )
    .catch((error) => {
      console.log("Server responded with error\n" + error);
    });
}

function addData() {
  let employeeObject = {
    date: ["18", "8", "2021"],
    department: ["Sales", "Others"],
    gender: "Male",
    id: 9624459820569,
    name: "Niraj",
    notes: "Hello",
    profileID: "../assets/Ellipse -3.png",
  };

  makeAjaxCall("post", home_url, (async = true), employeeObject)
    .then((responseText) => {
      console.log("Added object: " + responseText);
    })
    .catch((error) => {
      console.log("Server responded with error\n" + error);
    });
}

function deleteData() {
  makeAjaxCall("delete", home_url + "9624459820569", (async = true))
    .then((responseText) => {
      console.log("Added object: " + responseText);
    })
    .catch((error) => {
      console.log("Server responded with error\n" + error);
    });
}

function updateData() {
  let employeeObject = {
    date: ["18", "8", "2021"],
    department: ["Sales"],
    gender: "Male",
    id: 1629979827669,
    name: "Smit",
    notes: "Hello my name is smit",
    profileID: "../assets/Ellipse -3.png",
  };

  makeAjaxCall("put", home_url+"1629979827669", (async = true), employeeObject)
    .then((responseText) => {
      console.log("Added object: " + responseText);
    })
    .catch((error) => {
      console.log("Server responded with error\n" + error);
    });
}
