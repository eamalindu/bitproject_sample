package lk.bitproject.Privilege.Controller;

import lk.bitproject.Privilege.Dao.RoleDAO;
import lk.bitproject.Privilege.Entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RoleController {

    @Autowired
    private RoleDAO roleDao;


    @GetMapping(value = "/role/findall")
    public List<Role> findAll(){
        return roleDao.findAll();
    }
}
