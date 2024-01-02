//browser onload event
window.addEventListener('load', () => {
    //refresh table when browser loads
    refreshTable();

    user = new Object();
});

const refreshTable = () => {
    users = [];
    $(document).ajaxSend(function() {
        $("#overlay").fadeIn(300);
    });
    $.ajax("/user/findall", {
        async: false,
        type: "Get",
        contentType: "json",
        success: function (data) {
            console.log(data);
            users = data;
            $("#overlay").fadeOut(300);
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

    fillSelectOptions(selectEmp, 'Select Employee', users,'username');
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

    textUserName.value = ob.username;
    textEmail.value = ob.employeeId.email;

  //employee select
    selectEmp.selectedIndex = ob.id;

    //active status
    if(ob.status){
        checkStatus.checked = true;
        spanCheck.innerText ='Active' ;
    }
    else{
        checkStatus.checked = false;
        spanCheck.innerText ='Not Active' ;
    }
    //role

    if(ob.employeeId.designationid.name=="Manager"){
        radioManager.checked = true;
    }
    else if(ob.employeeId.designationid.name=="Store Manager"){
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