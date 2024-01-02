package lk.bitproject.Employee.Dao;

import lk.bitproject.Employee.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeDAO extends JpaRepository<Employee,Integer> {


    //native
    @Query(value = "SELECT lpad(max(emp.empnumber)+1,6,0) as empnumber FROM bitproject.employee as emp;",nativeQuery = true)
    String getNextEmpNumber();

    //hql
    @Query(value = "SELECT e from Employee e where e.nic=?1")
    Employee getByNIC(String nic);

    //get * info from given email
    @Query(value = "SELECT e from Employee e where e.email=?1")
    Employee getByEmail(String email);

    @Query(value = "select e from Employee e where e.id not in (select u.employeeId from User u where u.employeeId is not null)")
    List<Employee> getEmployeesWithoutUserAccount();
}
