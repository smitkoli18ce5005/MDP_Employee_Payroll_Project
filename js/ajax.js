let home_url = "http://localhost:3000/EmployeePayrollList/";
function makeAjaxCall(methodType, url, async = false, data = null) {
  return new Promise (function (resolve, reject) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      console.log("ReadyState: " + xhttp.readyState);
      if (xhttp.readyState == 4) {
        console.log("Started!");
        if (xhttp.status == 200) {
          resolve(xhttp.responseText);
        } else if (xhttp.status >= 400) {
          reject(error)
          console.error("Server Failed!");
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

function display(str) {
  makeAjaxCall("get", home_url, async=true).then(
    responseText => console.log("Respose from the server: " +responseText)
  ).catch(
    error => {console.log("Server responded with error\n" +error)}
  )
}