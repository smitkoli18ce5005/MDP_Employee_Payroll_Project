let monthsInWords = {
    1:"Jan", 2:"Feb", 3:"Mar", 4:"Apr", 5:"May", 6:"Jun", 7:"Jul", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"
}

function department(deptlist){
    let deptmt = "";
    for(const dept of deptlist){
        deptmt = `${deptmt}<label class = "department">${dept}</label>${" "}`;
    }
    return deptmt;
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
            let dept = department(empObj.department);
            table_content = `${table_content}
            <tr>
            <td><img src="${empObj.profileID}" alt="1"></td>
            <td>${empObj.name}</td>
            <td>${empObj.gender}</td>
            <td>${dept}</td>
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