package lk.bitproject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class loginController {

    @GetMapping(value = "/loginfrom")
    public ModelAndView loginUI(){
        ModelAndView loginView = new ModelAndView();
        loginView.setViewName("login.html");
        return loginView;
    }
    @GetMapping(value = "/dashboard")
    public ModelAndView dashboardUI(){
        ModelAndView dashboardView = new ModelAndView();
        dashboardView.setViewName("dashboard.html");
        return dashboardView;
    }

}
