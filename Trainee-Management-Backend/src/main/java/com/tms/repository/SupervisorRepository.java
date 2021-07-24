package com.tms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tms.model.Supervisor;
import com.tms.model.User;
import java.util.List;

public interface SupervisorRepository extends JpaRepository<Supervisor, Long>{

	List<Supervisor> findByUser(User user);
}
