package lk.bitproject.Employee;

import lk.bitproject.Employee.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeDAO extends JpaRepository<Employee,Integer> {


}
