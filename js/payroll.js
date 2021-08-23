let _name,_day,_month,_year,_profileID,_gender,_department,_salary,_notes;
let payrollOjectList = [];


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
        for(let i=0;i<profileRadio.length;i++){
            if(profileRadio[i].checked){
                _profileID = profileRadio[i].value;
            }
        }
    }

    get gender(){return _gender;}
    set gender(gender){
        for(let i=0;i<gender.length;i++){
            if(gender[i].checked){
                _gender = gender[i].value;
            }
        }
    }

    get department(){return _department;}
    set department(department){
        let departmentList = [];
        for(let i=0;i<department.length;i++){
            if(department[i].checked){
                departmentList.push(department[i].value);
            }
        }
        console.log(departmentList);
        _department = departmentList;
    }

    get salary(){return _salary;}
    set salary(salary){
        _salary = salary.value;
    }

    get date(){return [_day,_month,_year];}
    set date([day, month, year]){
        let monthsInWords = {
            1:"Jan", 2:"Feb", 3:"Mar", 4:"Apr", 5:"May", 6:"Jun", 7:"Jul", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"
        }

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
            _month = monthsInWords[month.value];
            _year = year.value;
            console.log("valid date");
        }
        else{
            const div = day.parentElement;
            div.className = 'inputs inputs-450px error';
            const small = div.querySelector('small');
            small.innerText = "Invalid date";
            alert("Start Date should be within 30 days of joining!");
            console.log("Invalid date");
        }
    }
    
    get notes(){return _notes;}
    set notes(notes){
        _notes = notes.value;
    }
}

const emp = new EmployeePayroll();

function validate(){
    emp.name = document.getElementById('name');
    emp.profileID = document.getElementsByName('profile-radio');
    emp.gender = document.getElementsByName('gender');
    emp.department = document.getElementsByName('department');
    emp.salary = document.getElementById('salary');
    emp.date = [document.getElementById('day'), document.getElementById('month'), document.getElementById('year')];
    emp.notes = document.getElementById('notes');
    createPayrollObject();
}

function createPayrollObject() {
    let payrollOject = {};
    payrollOject["name"] = emp.name;
    payrollOject["profileID"] = emp.profileID;
    payrollOject["gender"] = emp.gender;
    payrollOject["department"] = emp.department;
    payrollOject["salary"] = emp.salary;
    payrollOject["date"] = emp.date;
    payrollOject["notes"] = emp.notes;

    let localPayrollList = JSON.parse(localStorage.getItem('EmployeePayrollList'));
    if(localPayrollList != undefined){
        localPayrollList.push(payrollOject);
    }else{
        localPayrollList = [payrollOject];
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
}

let empObjList = JSON.parse(localStorage.getItem('EmployeePayrollList'));
document.getElementById('table-count').innerText = empObjList.length;
function createTable(){
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
            <td class="department">${empObj.department}</td>
            <td>&#x20B9; ${empObj.salary}</td>
            <td>${empObj.date[0] +" " +empObj.date[1] +" " +empObj.date[2]}</td>
            <td>&#128465; &nbsp; &#9998;</td>
            </tr>`
            console.log(table_content);

            document.getElementById('payroll-table').innerHTML = table_content;
    });
}