const {EmployeePayroll} = './employeeClass.js';

const emp = new EmployeePayroll();

function checkForUpdates() {
    
    if(localStorage.getItem('key') != undefined){
        let index = findIndex(localStorage.getItem("key"));
        let empObjList = JSON.parse(localStorage.getItem('EmployeePayrollList'));
        
        setValues(index, empObjList, localStorage.getItem('key').value);
    }
}

function submit(){
    emp.name = document.getElementById('name');
    emp.profileID = document.getElementsByName('profile-radio');
    emp.gender = document.getElementsByName('gender');
    emp.department = document.getElementsByName('department');
    emp.salary = document.getElementById('salary-input');
    emp.date = [document.getElementById('day'), document.getElementById('month'), document.getElementById('year')];
    emp.notes = document.getElementById('notes');
    if(localStorage.getItem('key') != undefined){
        updateExistingObject();
        console.log("Updating existing object");
    }else{
        let payrollObject = createPayrollObject();
        if(payrollObject){
            createUpdateLocalStorage(payrollObject);
            reset(); 
            alert("User Added successfully!");
        }
    }
}

function cancel() {
    window.location = '../pages/home-page.html';
    localStorage.removeItem('key');
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
    if(key != undefined){
        payrollObject["id"] = key;
    }else{
        var uniq = new Date().getTime();
        payrollObject["id"] = uniq;
    }
    if(payrollObject.name != undefined && payrollObject.date[0] != undefined && payrollObject.profileID.length != undefined &&
        payrollObject.gender != undefined && payrollObject.department.length > 0 && payrollObject.salary != undefined &&
        payrollObject.notes != undefined && payrollObject.id != undefined && payrollObject.notes.length > 0){
            return payrollObject;
    }else{
        alert("Please fill all details");
    }
}

function createUpdateLocalStorage(payrollObject) {
    let localPayrollList = JSON.parse(localStorage.getItem('EmployeePayrollList'));
    if(localPayrollList != undefined){
        localPayrollList.push(payrollObject);
    }else{
        localPayrollList = [payrollObject];
    }
    localStorage.setItem('EmployeePayrollList', JSON.stringify(localPayrollList));
}   

function reset() {
    document.getElementById('name').value = '';
    document.getElementById('profile-photo-1').checked = false;
    document.getElementById('profile-photo-2').checked = false;
    document.getElementById('profile-photo-3').checked = false;
    document.getElementById('profile-photo-4').checked = false;
    document.getElementById('male').checked = false;
    document.getElementById('female').checked = false;
    document.getElementById('department-1').checked = false;
    document.getElementById('department-2').checked = false;
    document.getElementById('department-3').checked = false;
    document.getElementById('department-4').checked = false;
    document.getElementById('department-5').checked = false;
    document.getElementById('day').value = 0;
    document.getElementById('month').value = 0;
    document.getElementById('year').value = 0;
    document.getElementById('notes').value = '';
    document.getElementById('salary-input').value = 25000;
    let salaryHTML = `<p>25000</p>`;
    document.getElementById('salary-output').innerHTML = salaryHTML;
}



function findIndex(key){
    let empObjList = JSON.parse(localStorage.getItem('EmployeePayrollList'));
    for(let i=0;i<empObjList.length;i++){
        if(empObjList[i].id == key){
            return i;
        }
    }
    return false;
}

function updateExistingObject() {
    let key = localStorage.getItem('key');
    let updatedObject = createPayrollObject(key);

    let empObjList = JSON.parse(localStorage.getItem('EmployeePayrollList'));
    empObjList.splice(findIndex(key), 1, updatedObject);
    localStorage.setItem('EmployeePayrollList', JSON.stringify(empObjList));
    reset(); 
    alert("User details updated successfully!");
}

function setValues(index, empObjList, key) {
    document.getElementById('name').value = empObjList[index].name;

    let profileRadio = document.getElementsByName('profile-radio');
    for(let i=0;i<profileRadio.length;i++){
        if(profileRadio[i].value == empObjList[index].profileID){
            document.getElementById("profile-photo-" +(i+1)).checked = true;
        }
    }

    let gender = document.getElementsByName('gender');
    for(let i=0;i<gender.length;i++){
        if(gender[i].value == empObjList[index].gender){
            document.getElementById(gender[i].id).checked = true;
        }
    }

    let department = document.getElementsByName('department');
    for(let i=0;i<department.length;i++){
        if(empObjList[index].department.includes(department[i].value)){
            document.getElementById("department-" +(i+1)).checked = true;
        }
    }
 
    document.getElementById('day').value = empObjList[index].date[0];
    document.getElementById('month').value = empObjList[index].date[1];
    document.getElementById('year').value = empObjList[index].date[2];

    document.getElementById('notes').value = empObjList[index].notes;

    document.getElementById('salary-input').value = empObjList[index].salary;
    let salaryHTML = `<p>${empObjList[index].salary}</p>`;
    document.getElementById('salary-output').innerHTML = salaryHTML;

}

