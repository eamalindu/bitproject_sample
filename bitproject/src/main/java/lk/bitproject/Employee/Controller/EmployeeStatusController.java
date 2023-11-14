package lk.bitproject.Employee.Controller;

import lk.bitproject.Employee.Dao.EmployeeStatusDAO;
import lk.bitproject.Employee.Entity.EmployeeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EmployeeStatusController {

    @Autowired
    private EmployeeStatusDAO employeeStatusDAO;


    @GetMapping(value = "/employeeStatus/findall",produces = "application/json")
    public List<EmployeeStatus> getAll(){
        return employeeStatusDAO.findAll();
    }
}
