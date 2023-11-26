//browser onload event
window.addEventListener('load', () => {

    //refresh the table
    refreshTable();

    //refresh emp form
    refreshEmpForm();

//full name validation -> template 'FirstName LastName'
//FirstName is only twenty characters, the first character should always be in uppercase, the Maximum characters are 20, and the minimum is 2
//After the firstname there should be a space
//LastName is only thirty characters,the first character should always be in uppercase, the Maximum characters are 20, and the minimum is 2
    fullName.addEventListener('keyup', () => {
        //pattern
        const pattern = '^([A-Z][a-z]{2,19}[ ]){1,20}([A-Z][a-z]{2,29})$';
        //regex object creation
        const regexPattern = new RegExp(pattern);

        if (regexPattern.test(fullName.value)) {
            //boostrap validation
            fullName.classList.add('is-valid');
            fullName.classList.remove('is-invalid');
            employee.fullname = fullName.value;

            nameParts = fullName.value.split(" ");
            document.querySelector('#autoNames').innerHTML = '';
            nameParts.forEach(item => {

                const option = document.createElement('option');
                option.innerText = item;
                document.querySelector('#autoNames').appendChild(option);

            });


        } else {
            fullName.classList.remove('is-valid');
            fullName.classList.add('is-invalid');
            employee.fullname = null;
        }

    });

//callingName Validation
    callingName.addEventListener('keyup', () => {
        let same = false;
        for (let item of nameParts) {
            if (callingName.value === item) {
                same = true;
                break;
            }
        }
        if (same) {
            employee.callingname = callingName.value;
            callingName.classList.add('is-valid');
            callingName.classList.remove('is-invalid');
        } else {
            employee.callingname = null;
            callingName.classList.remove('is-valid');
            callingName.classList.add('is-invalid');
        }
    })


});


//function for refreshing the employee table
const refreshTable = () => {

    //create an array for store employees data

    //id ->int
    //fullName, nic, email, mobile -> string => ''
    //employeeStatus -> object =>{}

    employees = [];

    //using ajax getting the data from the database and assign the value to employee array
    $.ajax("/employee/findall", {
        async: false,
        type: "Get",
        contentType: "json",
        success: function (data) {
            console.log(data);
            employees = data;
        },
        error: function (resOb) {
            alert("error" + resOb);
        }

    });

    //create an array for storing column names and data types
    //Property -> column name
    //datatype -> specific data type for mentioned column (can be string, int, object, boolean, array, date)
    //dataType -> text = string, number, date
    //dataType -> function = object, array, boolean
    displayPropertyList = [{property: 'fullname', dataType: 'text'}, {
        property: 'nic',
        dataType: 'text'
    }, {property: 'email', dataType: 'text'}, {
        property: getJobName, dataType: 'function'
    }, {property: getUserAccstatus, dataType: 'function'}, {
        property: 'mobileNumber',
        dataType: 'text'
    }, {property: getEmployeeStatus, dataType: 'function'}];

//calling external JS
//1 parameter -> table id

//2 parameter -> data array list
//3 parameter -> display Property List (Column headers)
    fillDataIntoTable(tblEmp, employees, displayPropertyList, rowEdit, rowPrint, rowDelete);

}

//defining the getEmployeeStatus that was created by displayPropertyList
const getEmployeeStatus = (ob) => {
    //passing the object from displayPropertyList and getting the required value
    //return ob.employeeStatus.name;

    //using conditional statements to further customize the return value
    //if the array has a boolean value, we can use this method
    //example -> if(ob.ins == true){return 'Granted'}

    if (ob.employeestatusid.name === 'Working') {
        //return '<p class="text-white bg-success rounded-2 p-1">'+ob.employeeStatus.name+'</p>'
        return '🟢';
    }
    if (ob.employeestatusid.name === 'Resign') {
        // return '<p class="text-white bg-warning rounded-2 p-1">'+ob.employeeStatus.name+'</p>'
        return '🟡';
    }
    if (ob.employeestatusid.name === 'Delete') {
        //   return '<p class="text-white bg-danger rounded-2 p-1">'+ob.employeeStatus.name+'</p>'
        return '🔴';
    }
}

const getJobName = (ob) => {
    if (ob.designationid.name === 'Manager') {
        return '<p class="bg-info text-white rounded-2">' + ob.designationid.name + '</p>';
    }
    if (ob.designationid.name === 'Cashier') {
        return '<p class="bg-dark text-white rounded-2">' + ob.designationid.name + '</p>';
    }
    if (ob.designationid.name === 'Store Manager') {
        return '<p class="bg-warning text-white rounded-2">' + ob.designationid.name + '</p>';
    }
}

const getUserAccstatus = (ob) => {
    if (ob.gender) {
        return '<i class="fa fa-check-circle text-success fs-3"></i>';
    } else {
        return '<i class="fa fa-xmark-circle text-danger fa-shake fs-3"></i>'
    }
}

const rowEdit = (ob, rowIndex) => {
    employee = JSON.parse(JSON.stringify(ob));
    oldemployee = JSON.parse(JSON.stringify(ob));

    fullName.value = ob.fullname;
    nic.value = ob.nic;
    email.value = ob.email;
    designation.value = ob.designationid.name;
    designation.selectedIndex = ob.designationid.id;
    empStatus.value = ob.employeestatusid.name;
    empStatus.selectedIndex =ob.employeestatusid.id;
    mobileNumber.value = ob.mobileNumber;
    address.value = ob.address;
    civilStatus.value = ob.civilStatus;
    callingName.value = ob.callingname;
    note.value = ob.note;
    landNumber.value = ob.landNumber;
    dob.value = ob.dob;

    if(ob.gender==="Male"){
        inlineRadio1.checked = true;
    }
    else{
        inlineRadio2.checked = true;
    }
}

const rowPrint = (ob, rowIndex) => {

}

const rowDelete = (ob, rowIndex) => {
    //Highlight the selected row
    //tblEmp.children[1].children[rowIndex].style.backgroundColor = 'red';

    const userResponse = confirm('You are about to delete the record of : ' + ob.fullname + '\nAre You Sure?');
    if (userResponse) {
        //server response
        let postServerResponse;

        $.ajax("/employee", {
            type: "DELETE",
            async: false,
            contentType: "application/json",
            data: JSON.stringify(ob),
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

            showCustomModal("Employee Successfully Deleted!","success")

            //refresh table after inserting a new data
            refreshTable();
        }

        //if data passed unsuccessfully
        //show an error alert
        else
        {
            showCustomModal("Operation Failed! <br> Employee Record Not Deleted! "+postServerResponse,"error")
        }

    }
}

//check form errors
const formErrorCheck = () => {
    let errors = '';

    if (employee.fullname == null) {
        errors = errors + "Full Name is required\n";
        fullName.style.border = '1px solid red';
    }

    if (employee.callingname == null) {
        errors = errors + "Calling Name is required\n";
    }

    if (employee.nic == null) {
        errors = errors + "NIC is required\n";
    }

    if (employee.mobileNumber == null) {
        errors = errors + "Mobile is required\n";
    }

    if (employee.email == null) {
        errors = errors + "E-Mail is required\n";

    }

    if (employee.employeestatusid == null) {
        errors = errors + "Employee Status is required\n";
    }
    return errors;


}

//submit btn code
const formDataSubmit = () => {

    console.log('Add EMP', employee)

    //calling formErrorCheck() function to get and display errors of the form
    const errors = formErrorCheck();

    //continue, if there are no any errors
    if(errors===''){

        //user confirmation
        const confrimMessage = "Are You Sure to add the following record?\n" +
            "\n Full Name is : "+employee.fullname;

        const userConfirm = confirm(confrimMessage);

        //if user confirm is true, pass the data to backend
        if(userConfirm) {

            //passing data to backend
            let postServerResponse;

            $.ajax("/employee", {
                type: "POST",
                async: false,
                contentType: "application/json",
                data: JSON.stringify(employee),
                success: function (data) {
                    console.log("success " + data);
                    postServerResponse = data;
                },
                error: function (resOb) {
                    console.log("Error " + resOb);
                    postServerResponse = resOb;
                }
            });

            //if data passed successfully
            //show a success alert
            if(postServerResponse === "OK"){

                showCustomModal("Employee Successfully Added!","success")

                //refresh table after inserting a new data
                refreshTable();
                //refresh form
                $('#frmEmployee').trigger("reset");
                //reset from validation and dynamic components
                refreshEmpForm();
            }

            //if data passed unsuccessfully
            //show an error alert
            else
            {
                showCustomModal("Operation Failed! <br> Employee Record Not Saved! "+postServerResponse,"error")
            }
        }


    }
    //if there are any errors show error alerts
    else{

        showCustomModal(errors,'warning');
    }


}

//update btn function
const formDataUpdate =()=>{
    console.log("old")
    console.log(oldemployee)
    console.log("new")
    console.log(employee)

    let errors= formErrorCheck();

    if(errors===''){

        let updates = checkFormDataUpdate();

        if(updates==""){
            showCustomModal("No changes Detected!","info")
        }
        else{
            showCustomModal("Following Changes Detected<br><br/>"+updates,"warning")
        }

    }
    else{
        showCustomModal(errors,'warning');
    }
}


//define function for check form updates
const checkFormDataUpdate =()=>{

    let updates = '';

    if(employee.email !== oldemployee.email){
        updates = "<small class='fw-bold text-lowercase'>"+updates+oldemployee.email+"</small> <br>was Changed to <br><small class='fw-bold text-lowercase'>"+employee.email+"</small>";
    }

    return updates;

}

const refreshEmpForm=()=>{
    //dynamic select hard code
    employeeStatus = ajaxGetRequest("/employeeStatus/findall")
    designationStatus = ajaxGetRequest("/designation/findall")

    fillSelectOptions(designation, 'Select Your Designation', designationStatus);
    fillSelectOptions(empStatus, 'Select Employee Status', employeeStatus);

    employee = {};

    inputs = document.querySelectorAll('.empInput');
    inputs.forEach(function (input) {
        input.classList.remove('is-valid');
        input.style.border = '1px solid #ced4da';
        input.style.background = 'white';

    })


}