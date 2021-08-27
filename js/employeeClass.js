let _name,_day,_month,_year,_profileID,_gender,_department,_salary,_notes;

class EmployeePayroll{

    constructor(){}

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

module.exports = {EmployeePayroll};