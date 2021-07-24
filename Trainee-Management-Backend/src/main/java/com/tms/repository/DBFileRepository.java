package com.tms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tms.model.DBFile;

public interface DBFileRepository extends JpaRepository<DBFile, Long>{
	
}
