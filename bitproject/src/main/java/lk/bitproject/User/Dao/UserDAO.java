package lk.bitproject.User.Dao;

import lk.bitproject.User.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDAO extends JpaRepository<User,Integer> {
}
