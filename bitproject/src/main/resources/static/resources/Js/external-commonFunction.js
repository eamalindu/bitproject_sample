//Reusable Component
//this external Common Function can be used for multiple instances
//instead of writing multiple code segments we can minimize the codes by writing a common validator that can be used at any place


//This function will fill the data into select (dropdowns)
//This function has three arguments
//1) elementID -> ID of the select (dropdown)
//2) message -> default Selected Option text
//3) dataList -> option values in an array
//This function is called using window.load event handler
//civilStatusDataList = [{id:1,name:'Single'},{id:2,name:'Married'},{id:3,name:'Divorced'}]
//Example -> fillSelectOptions(civilStatus,'Please Select Your Civil Status',civilStatusDataList);
const fillSelectOptions = (elementID, message, dataList,displayProperty,selectedValue) => {
    const selectElement = elementID;
    selectElement.innerHTML = '';
    if (message !== '') {
        const optionDefault = document.createElement('option');
        optionDefault.innerText = message;
        optionDefault.selected = true;
        optionDefault.disabled = true;
        selectElement.appendChild(optionDefault);
    }

    dataList.forEach(ob => {
        const option = document.createElement('option');
        option.innerText = ob[displayProperty];
        //converting JavaScript values to JSON strings
        option.value = JSON.stringify(ob);

        if(selectedValue==ob[displayProperty]){
            option.selected = "selected";
        }
        selectElement.appendChild(option);
    })


}
//This function will get the data from the database
//This function has only one argument
//1) url -> java mapping (service url)
//This function will return the data as an array

//Example -> ajaxGetRequest("/employee/findall")
const ajaxGetRequest = (url) =>{

    let Response;
    $.ajax(url, {
        async: false,
        type: "Get",
        contentType: "json",
        success: function (data) {
            console.log(data);
            Response = data;
        },
        error: function (resOb) {
            alert("error" + resOb);
            Response = [];
        }

    });
    return Response;

}

const ajaxHttpRequest = (url,method,dataObject)=>{
    let serviceRequestResponse;

    $.ajax(url, {
        type: method,
        async: false,
        contentType: "application/json",
        data: JSON.stringify(dataObject),
        success: function (data) {
            console.log("success " + data);
            serviceRequestResponse = data;
        },
        error: function (resOb) {
            console.log("Error " + resOb);
            serviceRequestResponse = resOb;
        }
    });
    return serviceRequestResponse;
}
