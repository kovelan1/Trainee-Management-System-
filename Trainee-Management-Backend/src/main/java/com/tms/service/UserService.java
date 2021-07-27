package com.tms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.hibernate.Filter;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tms.exceprtion.UserExcistException;
import com.tms.model.Supervisor;
import com.tms.model.Trainee;
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
    private EntityManager entityManager;
	

	
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
		Session session = entityManager.unwrap(Session.class);
	    Filter filter = session.enableFilter("deletedUserFilter");
	    filter.setParameter("isDeleted", false);
//	    supervisor.getTrinees().stream().filter(t-> t.isDeleted() == false).collect(Collectors.toList());
	    List<Supervisor> supervisors = supervisorRepository.findAll().stream().filter(t-> t.getUser().isDeleted() == false).collect(Collectors.toList());
	    session.disableFilter("deletedTraineeFilter");
		
		return supervisors;
	}


	public List<User> getAllSuggestedBy() {
		Session session = entityManager.unwrap(Session.class);
	    Filter filter = session.enableFilter("deletedUserFilter");
	    filter.setParameter("isDeleted", false);
	    List<User> user = userRepository.findAll();
	    session.disableFilter("deletedTraineeFilter");
	    
		return user;
	}


	public List<User> getAllUserByRole(String role) {
		
		Session session = entityManager.unwrap(Session.class);
	    Filter filter = session.enableFilter("deletedUserFilter");
	    filter.setParameter("isDeleted", false);
	    List<User> user = userRepository.findByRole(role);
	    session.disableFilter("deletedTraineeFilter");
	    
		return user;
	}


	public Supervisor getSupervisorByPrinc(String name) {
		System.out.println(name);
		Session session = entityManager.unwrap(Session.class);
	    Filter filter = session.enableFilter("deletedUserFilter");
	    filter.setParameter("isDeleted", false);
	    User user = userRepository.getById(name);
	    
//		User user=userRepository.getById(name);
//		 user.getSupervisor();
//		Supervisor getsupervisor=new Supervisor();
		
		List<Supervisor> supervisors=supervisorRepository.findAll();
		
		supervisors.forEach((supervisor)->{
			if(supervisor.getUser().getUsername().equals(name)) {
				idLong= supervisor.getId();
			}
		});
		session.disableFilter("deletedTraineeFilter");
		return supervisorRepository.findById(idLong).orElseThrow();
	}


	public Supervisor updateCountSup(long id, int count) {
		Supervisor supervisor=supervisorRepository.findById(id).orElseThrow();
		supervisor.setTraineesCount(count);
		return supervisorRepository.save(supervisor);
	}


	public void deleteUser(String username) {
//		User user= userRepository.findByUsername(username);
//		if(user.getRole().equals("ROLE_supervisor")) {
//			supervisorRepository.deleteById(user.getSupervisor().getId());
//		}

		userRepository.deleteById(username);
		
	}

	public void deleteSupervisor(String username,long id) {
		supervisorRepository.deleteById(id);
		userRepository.deleteById(username);
		
	}
	

}
