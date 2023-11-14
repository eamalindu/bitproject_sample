package lk.bitproject.Employee.Dao;

import lk.bitproject.Employee.Entity.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeStatusDAO extends JpaRepository<EmployeeStatus,Integer> {

}
