package com.tms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tms.model.Trainee;
import com.tms.model.User;
import java.util.List;

@Repository
public interface TraineeRepository extends JpaRepository<Trainee, Long>{
	
	
	
//	List<Trainee> findBySupervisor(String supervisor);
//	
//	@Override
//	@Query("select e from #{#trainee} e where e.deleted=false")
//	public List<Trainee> findAll();

//	//Look up deleted entities
//	@Query("select e from #{#trainee} e where e.deleted=true")
//	public List<Trainee> recycleBin(); 
//
//	//Soft delete.
//	@Query("update #{#trainee} e set e.deleted=true where e.id=?1")
//	@Modifying
//	public void softDelete(Long id); 
}
