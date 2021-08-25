let _name,_day,_month,_year,_profileID,_gender,_department,_salary,_notes;
let payrollOjectList = [];
let monthsInWords = {
    1:"Jan", 2:"Feb", 3:"Mar", 4:"Apr", 5:"May", 6:"Jun", 7:"Jul", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"
}
class EmployeePayroll{
    get name(){return _name;}
    set name(name){
        let reg = /^([A-Z])([a-zA-Z0-9]){2}/gm
        if(reg.test(name.value)){
            const div = name.parentElement;
            div.className = 'inputs-div-name';
            const small = div.querySelector('small');
            small.innerText = ""
            _name = name.value;
        }else{
            const div = name.parentElement;
            div.className = 'inputs-div-name error';
            const small = div.querySelector('small');
            small.innerText = "Name should start with captial and have at least 3 characters"
            alert("Name should start with captial and have at least 3 characters!");
        }
    }

    get profileID(){return _profileID;}
    set profileID(profileRadio){
        _profileID = this.forRadio(profileRadio);
    }

    get gender(){return _gender;}
    set gender(gender){
        _gender = this.forRadio(gender);
    }

    get department(){return _department;}
    set department(department){
        _department = this.forCheckbox(department);
    }

    get salary(){return _salary;}
    set salary(salary){
        _salary = salary.value;
    }

    get date(){return [_day,_month,_year];}
    set date([day, month, year]){
        let inputDate = new Date(year.value, month.value, day.value)
        let inputDateInMs = inputDate.getTime()
        const timeElapsed = Date.now()
        let numDaysPassed = (timeElapsed - inputDateInMs)/(1000 * 60 * 60 * 24)
        if(numDaysPassed <= 30){
            const div = day.parentElement;
            div.className = 'inputs inputs-450px';
            const small = div.querySelector('small');
            small.innerText = ""
            _day = day.value;
            _month = month.value;
            _year = year.value;
        }
        else{
            const div = day.parentElement;
            div.className = 'inputs inputs-450px error';
            const small = div.querySelector('small');
            small.innerText = "Invalid date";
            alert("Start Date should be within 30 days of joining!");
        }
    }
    
    get notes(){return _notes;}
    set notes(notes){
        _notes = notes.value;
    }

    forRadio(element){
        let _element;
        for(let i=0;i<element.length;i++){
            if(element[i].checked){
                _element = element[i].value;
            }
        }
        return _element;
    }

    forCheckbox(element){
        let elementList = [];
        for(let i=0;i<element.length;i++){
            if(element[i].checked){
                elementList.push(element[i].value);
            }
        }
        return elementList;
    }
}

const emp = new EmployeePayroll();

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

function cancel() {
    window.location = '../pages/index.html';
    localStorage.removeItem('key');
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

function checkForUpdates() {
    
    if(localStorage.getItem('key') != undefined){
        let index = findIndex(localStorage.getItem("key"));
        let empObjList = JSON.parse(localStorage.getItem('EmployeePayrollList'));
        
        setValues(index, empObjList, localStorage.getItem('key').value);
    }
}

function deleteUser(key){
    let empObjList = JSON.parse(localStorage.getItem('EmployeePayrollList'));
    empObjList.splice(findIndex(key), 1);
    localStorage.setItem('EmployeePayrollList', JSON.stringify(empObjList));
    //location.reload();
    createTable();
}

function updateUser(key){
    window.location = '../pages/payroll-form.html';
    localStorage.setItem("key", key);
}


function createTable(){
    let empObjList = JSON.parse(localStorage.getItem('EmployeePayrollList'));
    document.getElementById('table-count').innerText = empObjList.length;
    let table_header =`<thead><tr>
                            <th></th>
                            <th>NAME</th>
                            <th>GENDER</th>
                            <th>DEPARTMENT</th>
                            <th>SALARY</th>
                            <th>START DATE</th>
                            <th>ACTIONS</th>
                            </tr><thead><tbody>`;

    let table_content = `${table_header}`

    empObjList.forEach(empObj => {
            table_content = `${table_content}
            <tr>
            <td><img src="${empObj.profileID}" alt="1"></td>
            <td>${empObj.name}</td>
            <td>${empObj.gender}</td>
            <td><div class="department">${empObj.department.join(" ")}<div></td>
            <td>&#x20B9; ${empObj.salary}</td>
            <td>${empObj.date[0] +" " +monthsInWords[empObj.date[1]] +" " +empObj.date[2]}</td>
            <td><div>
                <button class="inside-button" id="${empObj.id}" onclick="deleteUser(this.id)">&#128465;</button>
                <button class="inside-button" id="${empObj.id}" onclick="updateUser(this.id)">&#9998;</button>
                </div>
            </td>
            </tr>`
    });
    document.getElementById('payroll-table').innerHTML = table_content;
}