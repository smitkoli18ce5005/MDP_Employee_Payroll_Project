let _name,_day,_month,_year,_profileID,_gender,_department,_salary,_notes;

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
            small.innerText = "Name should start with captial and have atleast 3 characters"
            alert("Name should start with captial and have atleast 3 characters!");
        }
    }

    get profileID(){return _profileID;}
    set profileID(profileID){
        _profileID = profileID;
    }

    get gender(){return _gender;}
    set gender(gender){
        _gender = gender;
    }

    get department(){return _department;}
    set department(department){
        _department = department;
    }

    get salary(){return _salary;}
    set salary(salary){
        _salary = salary;
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
            _day = day;
            _month = month;
            _year = year;
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
        _notes = notes;
    }
}


function validate(){
    const emp = new EmployeePayroll();
    emp.name = document.getElementById('name');
    console.log(emp.name);
    emp.date = [document.getElementById('day'), document.getElementById('month'), document.getElementById('year')];
    console.log(emp.date);
}