let _name,_day,_month,_year,_profileID,_gender,_department,_salary,_notes;

class EmployeePayroll{
    get name(){return _name;}
    set name(name){
        _name = name;
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
        _day = day;
        _month = month;
        _year = year;
    }
    
    get notes(){return _notes;}
    set notes(notes){
        _notes = notes;
    }
}


function validate(){
    const emp = new EmployeePayroll();
    emp.name = document.getElementById('name').value;
    console.log(emp.name);
    emp.date = [document.getElementById('day').value, document.getElementById('month').value, document.getElementById('year').value];
    console.log(emp.date);
}