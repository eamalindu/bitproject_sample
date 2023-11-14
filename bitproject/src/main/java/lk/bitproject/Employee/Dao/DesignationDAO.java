package lk.bitproject.Employee.Dao;

import lk.bitproject.Employee.Entity.Designation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DesignationDAO extends JpaRepository<Designation,Integer> {
}
