package lk.bitproject.Privilege.Dao;

import lk.bitproject.Privilege.Entity.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilegeDAO extends JpaRepository<Privilege,Integer> {
}
