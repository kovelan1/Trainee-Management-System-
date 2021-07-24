package com.tms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tms.exceprtion.UserExcistException;
import com.tms.model.Supervisor;
import com.tms.model.User;
import com.tms.model.UserDTO;
import com.tms.repository.SupervisorRepository;
import com.tms.repository.UserRepository;



@Service
public class UserService {

	@Autowired 
	private UserRepository userRepository;
	
	@Autowired 
	private SupervisorRepository supervisorRepository;
	
	

	
	@Autowired
	private PasswordEncoder passwordEncoder;

	private Long idLong;
	
	
	
	public User getUserByPrincipal(String userName){
		return userRepository.findByUsername(userName);
	}

	
	public User createUser(User user) throws UserExcistException {
		if(userRepository.existsById(user.getUsername())) {
			throw new UserExcistException("UserName already there");
		}
		else {
			String password=user.getPassword();
			String encodePass=passwordEncoder.encode(password);
			user.setPassword(encodePass);
			user.setEnabled(true);
			
			userRepository.save(user);
			
			if(user.getRole().equals("ROLE_supervisor")) {
				Supervisor supervisor= new Supervisor();
				supervisor.setTraineesCount(5);;
				supervisor.setUser(user);
				supervisorRepository.save(supervisor);
			}
				
			
			return user;
		}
		
		
	}
	

	public List<Supervisor> getAllSupervisor() {
		
		return supervisorRepository.findAll();
	}


	public List<User> getAllSuggestedBy() {
		
		return userRepository.findAll();
	}


	public List<User> getAllUserByRole(String role) {
		
		return userRepository.findByRole(role);
	}


	public Supervisor getSupervisorByPrinc(String name) {
		System.out.println(name);
		User user=userRepository.getById(name);
//		 user.getSupervisor();
//		Supervisor getsupervisor=new Supervisor();
		
		List<Supervisor> supervisors=supervisorRepository.findAll();
		
		supervisors.forEach((supervisor)->{
			if(supervisor.getUser().getUsername().equals(name)) {
				idLong= supervisor.getId();
			}
		});
		return supervisorRepository.findById(idLong).orElseThrow();
	}


	public Supervisor updateCountSup(long id, int count) {
		Supervisor supervisor=supervisorRepository.findById(id).orElseThrow();
		supervisor.setTraineesCount(count);
		return supervisorRepository.save(supervisor);
	}

	

}
