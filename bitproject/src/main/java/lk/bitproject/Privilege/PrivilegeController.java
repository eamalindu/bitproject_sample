package lk.bitproject.Privilege;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController

//class level mapping
// because /employee is common in all Mappings we can declare it as a class level mapping
@RequestMapping(value = "/privilege")
public class PrivilegeController {

    @Autowired //Generate Object
    private PrivilegeDAO privilegeDAO;
    @GetMapping
    public ModelAndView privilegeUI(){
        ModelAndView privilegeView = new ModelAndView();
        privilegeView.setViewName("privilege.html");
        return privilegeView;
    }

    @GetMapping(value = "/findall",produces = "application/json")
    public List<Privilege> findAll(){
        return privilegeDAO.findAll();
    }
    //done
}
