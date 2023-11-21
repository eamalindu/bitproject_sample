package lk.bitproject.Employee.Dao;

import lk.bitproject.Employee.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeDAO extends JpaRepository<Employee,Integer> {


    //native
    @Query(value = "SELECT lpad(max(emp.empnumber)+1,6,0) as empnumber FROM bitproject.employee as emp;",nativeQuery = true)
    String getNextEmpNumber();
}
