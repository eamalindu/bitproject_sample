package lk.bitproject.Employee.Dao;

import lk.bitproject.Employee.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeDAO extends JpaRepository<Employee,Integer> {


}
