package com.tms.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;

import org.hibernate.result.UpdateCountOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.tms.exceprtion.UserExcistException;
import com.tms.exceprtion.UserNotFoundException;
import com.tms.model.DBFile;
import com.tms.model.Supervisor;
import com.tms.model.Trainee;
import com.tms.model.User;
import com.tms.service.TraineeService;
import com.tms.service.UserService;


@RestController
@CrossOrigin
public class HomeController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private TraineeService traineeService;

//	get the user details on login
	@GetMapping("/me")
	public User getUser(Principal principal) {
		
    	return userService.getUserByPrincipal(principal.getName());
    }
	
	@GetMapping("/me/supervisor")
	@PreAuthorize("hasRole('ROLE_supervisor')")
	public Supervisor getSupervisorByPrincp(Principal principal) {
		
    	return userService.getSupervisorByPrinc(principal.getName());
    }
	
	@PutMapping("/supervisor/{count}/{id}")
	@PreAuthorize("hasRole('ROLE_supervisor')")
	public Supervisor updateCountSupervisor(@PathVariable(value = "count") int count, @PathVariable(value = "id") long id) {
		return userService.updateCountSup(id, count);
	}

	//user related api
	//For admin to create HR & Director 
	@PostMapping("/create/ROLE_admin")
	@PreAuthorize("hasRole('ROLE_admin')")
	public ResponseEntity<?> createHR(@RequestBody User user) throws UserExcistException {
		if(user.getRole().equals("ROLE_hr") || user.getRole().equals("ROLE_director")) {
			return new ResponseEntity<User>(userService.createUser(user),HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("Your are not allowed",HttpStatus.UNAUTHORIZED);
		}
		
	}
	
	
	//for Hr to create supervisor & secretary 
	@PostMapping("/create/ROLE_hr")
	@PreAuthorize("hasRole('ROLE_hr')")
	public ResponseEntity<?> createUsers(@RequestBody User user) throws UserExcistException {
		if(user.getRole().equals("ROLE_secretary") || user.getRole().equals("ROLE_supervisor")) {
			return new ResponseEntity<User>(userService.createUser(user),HttpStatus.OK);
			
		}else {
			return new ResponseEntity<String>("Your are not allowed",HttpStatus.UNAUTHORIZED);
		}
		
	}
	
	
	@GetMapping("/trainees")
//	@PreAuthorize("hasAnyRole('ROLE_hr','ROLE_supervisor','ROLE_director','ROLE_secretary')")
	public List<Trainee> getAllTrainees(@RequestParam(value = "isDeleted", required = false, defaultValue = "false") boolean isDeleted) {
//		System.out.println(isDeleted);
    	return traineeService.getAllTrainees(isDeleted);
    }
	
	@GetMapping("/supervisor")
	public List<Supervisor> getAllSupervisor() {
    	return userService.getAllSupervisor();
    }
	
	@GetMapping("/suggestedBy")
//	@PreAuthorize("hasAnyRole('ROLE_hr','ROLE_supervisor','ROLE_director','ROLE_secretary')")
	public List<User> getAllSuggestedBy() {
    	return userService.getAllSuggestedBy();
    }
	
	@GetMapping("/user/ROLE_admin")
	public List<User> getUserForAdmin() {
    	return userService.getAllSuggestedBy();
    }
	
	@GetMapping("/user/ROLE_hr")
	public List<User> getUserForHR() {
		List<User> users= new ArrayList<User>();
		users.addAll(userService.getAllUserByRole("ROLE_supervisor"));
		users.addAll(userService.getAllUserByRole("ROLE_secretary"));
    	return users;
    }
	
	@GetMapping("/undersupervice/{username}")
	public List<Trainee> getTraineesBySupervisor(@PathVariable(value = "username") String username) throws UserNotFoundException{
		return traineeService.getBySupervisor(username);
	}
	
//	@GetMapping("/sugessions/{username}")
//	public List<Trainee> getTraineesBySugession(@PathVariable(value = "username") String username) throws UserNotFoundException{
//		return traineeService.getBySugession(username);
//	}
	
	
	@PostMapping("/trainee")
	@PreAuthorize("hasAnyRole('ROLE_admin','ROLE_secretary')")
	public ResponseEntity<?> createTrainee(@RequestBody Trainee trainee) {
	
			return traineeService.createTrainee(trainee);
		
	}
	
	@PostMapping("/uploadFile")
	@PreAuthorize("hasAnyRole('ROLE_admin','ROLE_secretary')")
    public void uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("traineeId") long traineeId,@RequestParam("category") String category) throws UserNotFoundException {
         traineeService.storeFile(file,traineeId,category);

    }

    @GetMapping("/downloadFile/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable long fileId) {
        // Load file from database
        DBFile dbFile = traineeService.getFile(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
                .body(new ByteArrayResource(dbFile.getData()));
    }
    
    //update trainee status by HR
    @PutMapping("/trainee/ROLE_hr/{id}")
	@PreAuthorize("hasRole('ROLE_hr')")
    public Trainee updateHrValidate(@PathVariable(value = "id") long id) throws UserNotFoundException {
    	return traineeService.hrValidate(id);
    }
    
  //update trainee status by HR
    @PutMapping("/trainee/ROLE_admin/{id}")
	@PreAuthorize("hasRole('ROLE_admin')")
    public Trainee updateConfirmation (@PathVariable(value = "id") long id) throws UserNotFoundException {
    	return traineeService.confirmation(id);
    }
    
    
    @DeleteMapping("/trainee/{id}")
    @PreAuthorize("hasAnyRole('ROLE_admin','ROLE_secretary')")
    public void deletTrainee(@PathVariable(value = "id") long id) throws UserNotFoundException {
    	 traineeService.archiveTrainee(id);
    }
	
    
    @GetMapping("/deleted/trainee")
    public Iterable<Trainee> findAllDelete(@RequestParam(value = "isDeleted", required = false, defaultValue = "false") boolean isDeleted) {
        return traineeService.findAllDelete(isDeleted);
    }
    
    @DeleteMapping("/supervisor/{username}/{id}")
    @PreAuthorize("hasAnyRole('ROLE_admin','ROLE_hr')")
    public void deletsupervisor(@PathVariable(value = "username") String username, @PathVariable(value = "id") long id) throws UserNotFoundException {
    	 userService.deleteSupervisor(username,id);
    }
    
    @DeleteMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ROLE_admin','ROLE_hr')")
    public void deletUser(@PathVariable(value = "username") String username) throws UserNotFoundException {
    	 userService.deleteUser(username);
    }
    
    
//	@GetMapping("/trainee")
//	@PreAuthorize("hasRole('ROLE_trainee')")
//	public User getTrainee(Principal principal) {
//    	return userService.getUserByPrincipal(principal.getName());
//    }
	
	
}
