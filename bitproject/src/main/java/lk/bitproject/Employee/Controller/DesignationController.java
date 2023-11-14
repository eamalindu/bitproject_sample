package lk.bitproject.Employee.Controller;

import lk.bitproject.Employee.Dao.DesignationDAO;
import lk.bitproject.Employee.Entity.Designation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DesignationController {

    @Autowired
    private DesignationDAO designationDAO;


    @GetMapping(value = "/designation/findall")
    public List<Designation> findAll(){
        return designationDAO.findAll();
    }
}
