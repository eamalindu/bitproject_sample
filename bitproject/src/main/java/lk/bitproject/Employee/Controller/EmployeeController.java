package lk.bitproject.Employee.Controller;

import lk.bitproject.Employee.Dao.EmployeeDAO;
import lk.bitproject.Employee.Entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;


@RestController

//class level mapping
// because /employee is common in all Mappings we can declare it as a class level mapping
@RequestMapping(value = "/employee")
public class EmployeeController {

    @Autowired //Generate Object
    private EmployeeDAO employeeDAO;

    @GetMapping
    public ModelAndView employeeUI() {
        ModelAndView employeeView = new ModelAndView();
        employeeView.setViewName("employee.html");
        return employeeView;
    }

    //data returnType => 'produces ="application/JSON"'
    //it can be either JSON,Text and XML

    //value = 'employee/findall' (<= how the browser will display it)
    // employee is added from the class level mapping
    @GetMapping(value = "/findall", produces = "application/json")
    //sort desc
    public List<Employee> findAll() {
        return employeeDAO.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    //here {id} is a path variable
    //employee/getbyid/1
    @GetMapping(value = "/getbyid/{id}", produces = "application/json")
    public String getbyId() {
        return "EMPs";
    }

    @PostMapping
    public String saveEmployee(@RequestBody Employee employee) {
        try {
            //set autogenerated values
            employee.setAddedDateTime(LocalDateTime.now());
            String empNextNumber = employeeDAO.getNextEmpNumber();
            if(empNextNumber.equals(null) || empNextNumber.isEmpty()){
                employee.setEmpnumber("000001");
            }
            else{
                employee.setEmpnumber(employeeDAO.getNextEmpNumber());
            }

            employeeDAO.save(employee);
            return "OK";

        } catch (Exception e) {
            return "Save Failed "+e.getMessage();
        }
    }


}
