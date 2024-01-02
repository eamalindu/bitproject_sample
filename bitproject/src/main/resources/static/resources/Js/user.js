//browser onload event
window.addEventListener('load', () => {
    //refresh table when browser loads
    refreshTable();

    user = new Object();
});

const refreshTable = () => {
    users = [];
    $.ajax("/user/findall", {
        async: false,
        type: "Get",
        contentType: "json",
        success: function (data) {
            console.log(data);
            users = data;
        },
        error: function (resOb) {
            alert("error" + resOb);
        }

    });


    displayPropertyList = [{property: getFullName, dataType: 'function'}, {property: 'username', dataType: 'text'}, {property: 'email', dataType: 'text'}, {
        property: getRole,
        dataType: 'function'
    }, {property: getStatus, dataType: 'function'}];


    fillDataIntoTable(dataTable, users, displayPropertyList, rowEdit, rowPrint, rowDelete);
    employeeWithOutUserAccount = ajaxGetRequest("/employee/test")
    fillSelectOptions(selectEmp,'Select Employee',employeeWithOutUserAccount,'fullname')
}

const getFullName = (ob) => {

        return ob.employeeId.fullname;


}

const getRole = (ob) => {

    return ob.employeeId.designationid.name;

}

const getStatus = (ob) => {
    if (ob.status === true) {
        return 'Active';
    } else {
        return 'In-Active'
    }
}

const rowEdit = (ob, rowIndex) => {
    user = JSON.parse(JSON.stringify(ob));
    oldUser = JSON.parse(JSON.stringify(ob));

    //disable inputs
    textPassword.disabled = true;
    textRePassword.disabled = true;

    textUserName.value = user.username;
    textEmail.value = user.employeeId.email;

  //employee select
    employeeWithOutUserAccount = ajaxGetRequest("/employee/test")
    employeeWithOutUserAccount.push(user.employeeId)
    fillSelectOptions(selectEmp,'Select Employee',employeeWithOutUserAccount,'fullname',user.employeeId.fullname)

    //selectEmp.selectedIndex = user.id;

    //active status
    if(user.status){
        checkStatus.checked = true;
        spanCheck.innerText ='Active' ;
    }
    else{
        checkStatus.checked = false;
        spanCheck.innerText ='Not Active' ;
    }
    //role

    if(user.employeeId.designationid.name=="Manager"){
        radioManager.checked = true;
    }
    else if(user.employeeId.designationid.name=="Store Manager"){
        radioStore.checked = true;
    }



    document.querySelector('#btn-user-update').classList.remove('disabled')

}

const rowPrint = (ob, rowIndex) => {

}

const rowDelete = (ob, rowIndex) => {
    //Highlight the selected row
    //tblEmp.children[1].children[rowIndex].style.backgroundColor = 'red';
    console.log("delete",ob,rowIndex)
showCustomConfirm('You are about to delete the record of :<br/> ' + ob.employeeId.fullname + '<br/>Are You Sure?',function (result) {

    if (result) {
        let serverResponse;
        $.ajax("/user", {
            async: false,
            type: "DELETE",
            contentType: "application/json",
            data: JSON.stringify(ob),
            success: function (data) {
                console.log(data);
                serverResponse = data;
            },
            error: function (resOb) {
                serverResponse = resOb;
            }

        });

        if (serverResponse === 'OK') {
            showCustomModal('Employee Record Delete Successfully!','success')
            refreshTable();
        } else {
            showCustomModal('Employee Record Deletion Failed!\n' + serverResponse,'error')
            refreshTable();
        }
    }
    else{
        showCustomModal('Operation Cancelled!','info')
    }
});
}

const updateUser = ()=>{

    //check form errors

    //check form update
    let updates = checkUserFormUpdates();
    if(updates!==""){
      showCustomConfirm(updates,function (userConfirm){
        if(userConfirm){

        }
        else{
            showCustomModal("Operation Cancelled!",'info')
        }
      });
    }
    else{
        showCustomModal("No Changes Detected!",'info')
    }

    //check user confirm
}

const checkUserFormUpdates=() =>{
    let updates = '';
    if(user.username!==oldUser.username){
        updates = updates+"Username is change to "+user.username;
    }


    return updates;
}