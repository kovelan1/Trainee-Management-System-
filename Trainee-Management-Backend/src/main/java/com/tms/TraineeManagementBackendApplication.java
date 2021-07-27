package com.tms;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tms.model.Supervisor;
import com.tms.model.Trainee;
import com.tms.model.User;
import com.tms.repository.SupervisorRepository;
import com.tms.repository.TraineeRepository;
import com.tms.repository.UserRepository;



@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class TraineeManagementBackendApplication {
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
	private TraineeRepository traineeRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	 
	@Autowired
	private SupervisorRepository supRepo;
	
    @PostConstruct
    public void initData() {
        List<User> users = Stream.of(
                new User("admin@gmail.com", passwordEncoder.encode("admin"),"sam","bill","ROLE_admin",true ),
               
                new User("hr@gmail.com", passwordEncoder.encode("hr"),"hr","deo","ROLE_hr",true )
        ).collect(Collectors.toList());
        userRepository.saveAll(users);
        
//        List<Supervisor> supervisors =Stream.of(
//        		new Supervisor(userRepository.findByUsername("pkovelan5@gmail.com"),5)
//        		 ).collect(Collectors.toList());
//        supRepo.saveAll(supervisors);
//        
//        List<Trainee> trainees =Stream.of(
//        		new Trainee(null,"f name", "lastname", "cin", "personal",null, "phone", "email", "establishment", "specialty", "level", "periodOfInternship", "durationOfInternship", userRepository.findByUsername("sup@gmail.com"), userRepository.findByUsername("sup@gmail.com"), "cvUrl", "motivationLetterUrl", "certificateUrl")
//        		).collect(Collectors.toList());
//        traineeRepository.saveAll(trainees);
    }

	public static void main(String[] args) {
		SpringApplication.run(TraineeManagementBackendApplication.class, args);
	}

}
