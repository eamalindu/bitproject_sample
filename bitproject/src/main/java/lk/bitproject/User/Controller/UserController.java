package lk.bitproject.User.Controller;
import lk.bitproject.User.Entity.User;
import lk.bitproject.User.Dao.UserDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController

@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserDAO userDAO;

    @GetMapping
    public ModelAndView userUI(){
        ModelAndView userView = new ModelAndView();
        userView.setViewName("user.html");
        return userView;
    }

    @GetMapping(value = "/findall",produces = "application/json")
    public List<User> findAll(){
        return userDAO.findAll();
    }

    @DeleteMapping
    public String deleteUser(@RequestBody User user){

        //authentication and authorization should be done first
        //check existing
        User currentUser = userDAO.getReferenceById(user.getId());
        if(currentUser==null){
            return "Delete Failed! No Such User";
        }
        try{
            user.setStatus(false);
            userDAO.save(user);

            return "OK";
            //dependencies
        }
        catch (Exception ex){
            return "Delete Failed " + ex.getMessage();
        }

    }



}
