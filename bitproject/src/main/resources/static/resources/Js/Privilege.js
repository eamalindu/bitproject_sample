window.addEventListener('DOMContentLoaded',()=>{

    refreshPrivilegeTable();
});

const refreshPrivilegeTable = () =>{

    privileges = ajaxGetRequest("/privilege/findall");
    displayPropertyListForPrivilege = [
        {property:getRoleName,dataType:'function'},
        {property: getModuleName,dataType: 'function'},
        {property: getSelect,dataType: 'function'},
        {property: getInsert,dataType: 'function'},
        {property: getUpdate,dataType: 'function'},
        {property: getDelete,dataType: 'function'}
    ];

    fillDataIntoTable(tblPrivilege,privileges,displayPropertyListForPrivilege,rowEdit,rowPrint,rowDelete)
}

const getRoleName = (ob)=>{
    return ob.role_id.name;

}

const getModuleName = (ob)=>{
    return ob.module_id.name;
}

const getSelect = (ob)=>{
    if(ob.select){
        return '✅';
    }
    else {
        return '❌';
    }

}

const getInsert = (ob)=>{
    if(ob.insert){
        return '✅';
    }
    else {
        return '❌';
    }

}
const getUpdate = (ob)=>{
    if(ob.update){
        return '✅';
    }
    else {
        return '❌';
    }

}
const getDelete = (ob)=>{
    if(ob.delete){
        return '✅';
    }
    else {
        return '❌';
    }

}



const rowEdit = ()=>{

}

const rowPrint = ()=>{

}

const rowDelete = ()=>{

}