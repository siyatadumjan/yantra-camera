package com.online.yantra_system.repo;

import com.online.yantra_system.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Integer> {

    @Query(value = "select * from users where email=?1", nativeQuery = true)
    Optional<UserEntity> getUserByEmail(String email);
}
