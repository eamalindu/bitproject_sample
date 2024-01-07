package lk.bitproject.Privilege.Dao;

import lk.bitproject.Privilege.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDAO extends JpaRepository<Role,Integer> {
}
