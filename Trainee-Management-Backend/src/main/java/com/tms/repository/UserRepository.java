package com.tms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tms.model.User;
import java.lang.String;
import java.util.List;



public interface UserRepository extends JpaRepository<User, String>{
	
	List<User> findByRole(String role);

	User findByUsername(String username);
}
