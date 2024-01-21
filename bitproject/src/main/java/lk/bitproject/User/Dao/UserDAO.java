package lk.bitproject.User.Dao;

import lk.bitproject.Employee.Entity.Employee;
import lk.bitproject.User.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDAO extends JpaRepository<User,Integer> {

    //get * info from given email
    @Query(value = "SELECT u from User u where u.email=?1")
    User getByEmail(String email);

    //get * info from employee id
    @Query(value = "SELECT u from User u where u.employeeId.id=?1")
    User getByEmployee(Integer id);
}
