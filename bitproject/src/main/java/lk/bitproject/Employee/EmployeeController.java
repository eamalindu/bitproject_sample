package lk.bitproject.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController

//class level mapping
// because /employee is common in all Mappings we can declare it as a class level mapping
@RequestMapping(value = "/employee")
public class EmployeeController {

    @Autowired //Generate Object
    private EmployeeDAO employeeDAO;

    @GetMapping
    public ModelAndView employeeUI(){
        ModelAndView employeeView = new ModelAndView();
        employeeView.setViewName("employee.html");
        return employeeView;
    }

    //data returnType => 'produces ="application/JSON"'
    //it can be either JSON,Text and XML

    //value = 'employee/findall' (<= how the browser will display it)
    // employee is added from the class level mapping
    @GetMapping(value = "/findall",produces = "application/json")
    public List<Employee> findAll(){
        return employeeDAO.findAll();
    }

    //here {id} is a path variable
    //employee/getbyid/1
    @GetMapping(value = "/getbyid/{id}",produces = "application/json")
    public String getbyId(){
        return "EMPs";
    }


}
