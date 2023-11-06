package lk.bitproject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController

//class level mapping
// because /employee is common in all Mappings we can declare it as a class level mapping
@RequestMapping(value = "/privilege")
public class PrivilegeController {

    @GetMapping
    public ModelAndView privilegeUI(){
        ModelAndView privilegeView = new ModelAndView();
        privilegeView.setViewName("privilege.html");
        return privilegeView;
    }
}
