//browser onload event
window.addEventListener('load', () => {
    //refresh table when browser loads
    refreshTable();

    user = new Object();
});

const refreshTable = () => {
    users = [{
        id: 1, employee_id: {id: 4, fullName: 'Haritha Pramodha', callingName: 'Haritha'}, status: true, name: 'haritha', email: 'haritha@gmail.com', role_id: {id: 2, name: 'Manager'}
    }, {
        id: 2, employee_id: {id: 5, fullName: 'Nuwan Bandara', callingName: 'Nuwan'}, status: false, name: 'nuwan', email: 'nuwan@gmail.com', role_id: {id: 3, name: 'Cashier'}
    }];
    displayPropertyList = [{property: getFullName, dataType: 'function'}, {property: 'name', dataType: 'text'}, {property: 'email', dataType: 'text'}, {
        property: getRole,
        dataType: 'function'
    }, {property: getStatus, dataType: 'function'}];
    fillDataIntoTable(dataTable, users, displayPropertyList, rowEdit, rowPrint, rowDelete);
    fillSelectOptions(selectEmp, 'Select Employee', users);
}

const getFullName = (ob) => {

    if (ob.employee_id.fullName) {
        return ob.employee_id.fullName;
    }

}

const getRole = (ob) => {

    if (ob.role_id.name) {
        return ob.role_id.name;
    }
}

const getStatus = (ob) => {
    if (ob.status === true) {
        return 'Active';
    } else {
        return 'In-Active'
    }
}

const rowEdit = (ob, rowIndex) => {
    refreshTable();
    const textUsernmae = document.querySelector('#textUserName');
    const textEmail = document.querySelector('#textEmail');
    const radioManger = document.querySelector('#radioManager');
    const radioCashier = document.querySelector('#radioCashier');
    const radioStore = document.querySelector('#radioStore');
    const checkStatus = document.querySelector('#checkStatus');
    const spanCheck = document.querySelector('#spanCheck');

    textUsernmae.value = ob.name;
    textEmail.value = ob.email;

    if (ob.role_id.name === 'Manager') {
        radioManger.checked = true;
    }
    else if(ob.role_id.name === 'Cashier'){
        radioCashier.checked = true;
    }
    else{
        radioStore.checked = true;
    }

    if(ob.status){
        checkStatus.checked = true;
        spanCheck.innerText = 'Active';
    }
    else{
        checkStatus.checked = false;
        spanCheck.innerText = 'Not Active';
    }

    document.querySelector('#btn-user-update').classList.remove('disabled')

}

const rowPrint = (ob, rowIndex) => {

}

const rowDelete = (ob, rowIndex) => {
    //Highlight the selected row
    //tblEmp.children[1].children[rowIndex].style.backgroundColor = 'red';

    const userResponse = confirm('You are about to delete the record of : ' + ob.employee_id.fullName + '\nAre You Sure?');
    if (userResponse) {
        //server response
        const serverResponse = 'OK';
        if (serverResponse === 'OK') {
            alert('Employee Record Delete Successfully!')
            refreshTable();
        } else {
            alert('Employee Record Deletion Failed!\n' + serverResponse)
            refreshTable();
        }
    }
}