//browser onload event
window.addEventListener('load', () => {
    //refresh table when browser loads
    refreshTable();

    refreshUserForm();
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
 let newWindow =   window.open()
    newWindow.document.write(
        "<head>" +
        "<link href='resources/style/table-1.css' rel='stylesheet'><link href='resources/bootstrap-5.2.3/css/bootstrap.min.css' rel='stylesheet'>" +
        "</head><div class='container w-75 mt-4'>" +
        "<h3 class='fw-bold'>User Details of "+ ob.employeeId.fullname+"</h3>"+
        "<table class='table table-bordered table-info small table-responsive-sm mt-3'>" +
        "<tr>" +
        "<th>Username</th>" +
        "<th>Email</th>"+
        "<th>FullName</th>"+
        "</tr>" +
        "<tr>" +
        "<td>"+ob.username+"</td>" +
        "<td>"+ob.email+"</td>" +
        "<td>"+ob.employeeId.fullname+"</td>" +
        "</tr>" +
        "</table>" +
        "</div>"
    )
    setTimeout(function (){
        newWindow.print();
    },200)

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
            let postServerResponse;
            $.ajax("/user", {
                type: "PUT",
                async: false,
                contentType: "application/json",
                data: JSON.stringify(user),
                success: function (data) {
                    console.log("success " + data);
                    postServerResponse = data;
                },
                error: function (resOb) {
                    console.log("Error " + resOb);
                    postServerResponse = resOb;
                }
            });

            if(postServerResponse === "OK"){
                showCustomModal("User Updated!",'success')
                refreshTable();
                //enable inputs
                textPassword.disabled = false;
                textRePassword.disabled = false;
            }
            else{
                showCustomModal("Update Failed!",'error')
            }

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
    if(user.email!==oldUser.email){
        updates = updates+"Email is change to "+user.email;
    }
    if(user.status!==oldUser.status){
        updates = updates+"Status is change to "+user.status;
    }




    return updates;
}
const refreshUserForm = () => {
    user = {};
    employeeWithOutUserAccount = ajaxGetRequest("/employee/test")
    fillSelectOptionsWithTwo(selectEmp,'Select Employee',employeeWithOutUserAccount,'fullname','empnumber')
};