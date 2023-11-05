//browser onload event
window.addEventListener('load', () => {

//get all the inputs and button from the dom
    const btnAdd = document.querySelector('#btnAdd');
    const fullName = document.querySelector('#fullName');
    const callingName = document.querySelector('#callingName');
    const nic = document.querySelector('#nic');
    const bday = document.querySelector('#dob');
    const mobileNumber = document.querySelector('#mobileNumber');
    const landNumber = document.querySelector('#landNumber');
    const email = document.querySelector('#email');
    const address = document.querySelector('#address');
    const note = document.querySelector('#note');
    const designation = document.querySelector('#designation');
    const civilStatus = document.querySelector('#civilStatus');
    const empStatus = document.querySelector('#empStatus');

//dynamic select hard code
    employeeStatus = [{id: 1, name: 'Working'}, {id: 2, name: 'Resign'}, {id: 3, name: 'Delete'}];

    /*const selectEmpStatus = document.querySelector('#empStatus');
    selectEmpStatus.innerHTML = '';
    const optionDefault = document.createElement('option');
    optionDefault.innerText = "Select Employee Status";
    optionDefault.selected = true;
    optionDefault.disabled = true;
    selectEmpStatus.appendChild(optionDefault);

    employeeStatus.forEach((element, item) => {
        const option = document.createElement('option');
        option.innerText = element.name;
        //converting JavaScript values to JSON strings
        option.value = JSON.stringify(element);
        selectEmpStatus.appendChild(option);
    });
     */

//Dynamic select external method
    designationStatus = [{id: 1, name: 'Manger'}, {id: 2, name: 'Cashier'}, {id: 3, name: 'Clerk'}];

    //calling external function fillSelectOptions()
    //Three parameters
    //1) Element ID
    //2) Display Message
    //3) DataList

    fillSelectOptions(designation, 'Select Your Designation', designationStatus);
    fillSelectOptions(empStatus, 'Select Employee Status', employeeStatus);

//refresh the table
    refreshTable();


    employee = new Object();


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
            employee.fullName = fullName.value;

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
            employee.fullName = null;
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
            employee.callingName = callingName.value;
            callingName.classList.add('is-valid');
            callingName.classList.remove('is-invalid');
        } else {
            employee.callingName = null;
            callingName.classList.remove('is-valid');
            callingName.classList.add('is-invalid');
        }
    })

    /*
//nic validation -> template 1) Old NIC '981251108V' 2) New NIC '19981251108'
//old nic consist of 9 numbers and should end with either 'v', 'V', 'x', or 'X'
//new nic consist of 12 numbers
nic.addEventListener('keyup', () => {

        //pattern -> oldNIC | newNIC
        //in regex '|' is for OR gate
        const pattern = '^[6-9][0-9]{8}[x|X|v|V]|([1][9]|[2][0])[0-9]{10}$';
        const regexPattern = new RegExp(pattern);

        if (regexPattern.test(nic.value)) {
            nic.classList.add('is-valid');
            nic.classList.remove('is-invalid');

        } else {
            nic.classList.remove('is-valid');
            nic.classList.add('is-invalid');
        }
    });


  */


    /*
//mobile number validation -> template '0768008003'
//Only ten characters are allowed, First Character should be a 0, Second Character should be a 7, Third character should be any of 0,1,2,5,6,7,8
    mobileNumber.addEventListener('keyup', () => {
        const pattern = '^[0][7][01245678][0-9]{7}$';
        const regexPattern = new RegExp(pattern);

        if (regexPattern.test(mobileNumber.value)) {
            mobileNumber.classList.add('is-valid');
            mobileNumber.classList.remove('is-invalid');

        } else {
            mobileNumber.classList.remove('is-valid');
            mobileNumber.classList.add('is-invalid');
        }
    });

     */


    /*
//land number validation -> template '0337572574'
//Only ten characters are allowed, the First Character should be a 0, the Remaining characters should be any of 0,1,2,3,4,5,6,7,8,9
    landNumber.addEventListener('keyup', () => {
        const pattern = '^[0][0123456789][0-9]{8}$';
        const regexPattern = new RegExp(pattern);
        if (regexPattern.test(landNumber.value)) {
            landNumber.classList.add('is-valid');
            landNumber.classList.remove('is-invalid');

        } else {
            landNumber.classList.remove('is-valid');
            landNumber.classList.add('is-invalid');
        }

    })
 */

    /*
//email address validation -> template 'name@domain.domain'
    email.addEventListener('keyup', () => {
        const pattern = '^[a-z|A-Z]{2,19}[@][a-z|A-Z]{2,8}[.][a-z|A-Z]{2,3}$';
        const regexPattern = new RegExp(pattern);

        if (regexPattern.test(email.value)) {
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');

        } else {
            email.classList.remove('is-valid');
            email.classList.add('is-invalid');
        }

    });

     */

    /*
//address validation -> template 'gampaha'
    address.addEventListener('keyup', () => {
        //accept all input characters
        const pattern = '^.*$';
        const regexPattern = new RegExp(pattern);
        if (regexPattern.test(address.value)) {
            address.classList.add('is-valid');
            address.classList.remove('is-invalid');

        } else {
            address.classList.remove('is-valid');
            address.classList.add('is-invalid');
        }
    });
     */

    /*
//notes validation -> no template
    note.addEventListener('keyup', () => {
        const pattern = '^[A-Z][a-z]{5,29}$';
        const regexPattern = new RegExp(pattern);

        if (regexPattern.test(note.value)) {
            note.classList.add('is-valid');
            note.classList.remove('is-invalid');

        } else {
            note.classList.remove('is-valid');
            note.classList.add('is-invalid');
        }
    });

     */


});


//function for refreshing the employee table
const refreshTable = () => {

    //create an array for store employees data

    //id ->int
    //fullName, nic, email, mobile -> string => ''
    //employeeStatus -> object =>{}

    employees = [{
        id: 1,
        fullName: 'Malindu Prabodhitha',
        nic: '983151108V',
        email: 'eamalindu@gmail.com',
        mobile: '0781011144',
        employeeStatus: {id: 1, name: 'Working'},
        job: {id: 1, name: 'Manager'},
        hasUserAccount: true
    }, {
        id: 2,
        fullName: 'Sanithu Malhiru',
        nic: '20051457412',
        email: 'easanithu@gmail.com',
        mobile: '0705368016',
        employeeStatus: {id: 2, name: 'Resign'},
        job: {id: 2, name: 'Cashier'},
        hasUserAccount: false
    }, {
        id: 3,
        fullName: 'Nihal Eduppili',
        nic: '683281301V',
        email: 'eanihal@gmail.com',
        mobile: '0714856279',
        employeeStatus: {id: 1, name: 'Working'},
        job: {id: 1, name: 'Manager'},
        hasUserAccount: false
    }, {
        id: 4,
        fullName: 'Thathsara Viduara',
        nic: '992544584V',
        email: 'thathsara@gmail.com',
        mobile: '0782349273',
        employeeStatus: {id: 3, name: 'Delete'},
        job: {id: 2, name: 'Cashier'},
        hasUserAccount: true
    }];

    //create an array for storing column names and data types
    //Property -> column name
    //datatype -> specific data type for mentioned column (can be string, int, object, boolean, array, date)
    //dataType -> text = string, number, date
    //dataType -> function = object, array, boolean
    displayPropertyList = [{property: 'fullName', dataType: 'text'}, {property: 'nic', dataType: 'text'}, {property: 'email', dataType: 'text'}, {
        property: getJobName, dataType: 'function'
    }, {property: getUserAccstatus, dataType: 'function'}, {property: 'mobile', dataType: 'text'}, {property: getEmployeeStatus, dataType: 'function'}];

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

    if (ob.employeeStatus.name === 'Working') {
        //return '<p class="text-white bg-success rounded-2 p-1">'+ob.employeeStatus.name+'</p>'
        return '🟢';
    }
    if (ob.employeeStatus.name === 'Resign') {
        // return '<p class="text-white bg-warning rounded-2 p-1">'+ob.employeeStatus.name+'</p>'
        return '🟡';
    }
    if (ob.employeeStatus.name === 'Delete') {
        //   return '<p class="text-white bg-danger rounded-2 p-1">'+ob.employeeStatus.name+'</p>'
        return '🔴';
    }
}

const getJobName = (ob) => {
    if (ob.job.name === 'Manager') {
        return '<p class="bg-info text-white rounded-2">' + ob.job.name + '</p>';
    }
    if (ob.job.name === 'Cashier') {
        return '<p class="bg-dark text-white rounded-2">' + ob.job.name + '</p>';
    }
}

const getUserAccstatus = (ob) => {
    if (ob.hasUserAccount) {
        return '<i class="fa fa-check-circle text-success fs-3"></i>';
    } else {
        return '<i class="fa fa-xmark-circle text-danger fa-shake fs-3"></i>'
    }
}

const rowEdit = (ob, rowIndex) => {
    fullName.value = ob.fullName;
    nic.value = ob.nic;
    email.value = ob.email;
    designation.value = ob.job.name;
    mobileNumber.value = ob.mobile;

}

const rowPrint = (ob, rowIndex) => {

}

const rowDelete = (ob, rowIndex) => {
    //Highlight the selected row
    //tblEmp.children[1].children[rowIndex].style.backgroundColor = 'red';

    const userResponse = confirm('You are about to delete the record of : ' + ob.fullName + '\nAre You Sure?');
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

const formDataSubmit = () => {

    //need to for errors
    //user conformation
    //pass data to backend
    //check server response

    console.log('Add EMP', employee)
}