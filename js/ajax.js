let home_url = "http://localhost:3000/EmployeePayrollList/";
function makeAjaxCall(methodType, url, callback, async = false, data = null) {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    console.log("ReadyState: " + xhttp.readyState);
    if (xhttp.readyState == 4) {
      console.log("Started!");
      if (xhttp.status == 200) {
        callback(xhttp.responseText);
      } else {
        console.error("Server Failed!");
      }
    }
  };

  xhttp.open(methodType, url, async);
  xhttp.send();
}

function display(str) {
  console.log(str);
}

function displayData() {
  makeAjaxCall("get", home_url, display, async=true);
}
