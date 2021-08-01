package com.tms.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.persistence.EntityManager;

import org.hibernate.Filter;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import com.tms.exceprtion.FileStorageException;
import com.tms.exceprtion.MyFileNotFoundException;
import com.tms.exceprtion.UserNotFoundException;
import com.tms.model.DBFile;
import com.tms.model.Supervisor;
import com.tms.model.Trainee;
import com.tms.model.User;
import com.tms.repository.DBFileRepository;
import com.tms.repository.SupervisorRepository;
import com.tms.repository.TraineeRepository;
import com.tms.repository.UserRepository;

@Service
public class TraineeService {

	@Autowired
	private TraineeRepository traineeRepository;
	
	@Autowired
    private EntityManager entityManager;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SupervisorRepository supRepo;
	
	@Autowired
    private DBFileRepository dbFileRepository;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired 
	private SupervisorRepository supervisorRepository;

	

	public List<Trainee> getAllTrainees(boolean isDeleted) {
		Session session = entityManager.unwrap(Session.class);
	    Filter filter = session.enableFilter("deletedTraineeFilter");
	    filter.setParameter("isDeleted", isDeleted);
	    List<Trainee> trainee = traineeRepository.findAll();
	    session.disableFilter("deletedTraineeFilter");
		
		return trainee;
	}

	public List<Trainee> getBySupervisor(String username) throws UserNotFoundException {
		User user =userRepository.findByUsername(username);
		Supervisor supervisor= user.getSupervisor();
//		Supervisor supervisor=supRepo.findById(user).orElseThrow(()-> new UserNotFoundException("supervisor Not available"));
		
		return supervisor.getTrinees();
	}

//	public List<Trainee> getBySugession(String username) throws UserNotFoundException {
//		User sugesster=userRepository.findById(username).orElseThrow(()-> new UserNotFoundException("supervisor Not available"));
//		return sugesster.getSuggested();
//	}

	@Transactional
	public ResponseEntity<?> createTrainee(Trainee trainee){
		Supervisor supervisor= supervisorRepository.findById(trainee.getSupervisor().getId()).orElseThrow();
		List<Trainee> trainees=supervisor.getTrinees().stream().filter(t-> t.isDeleted() == false).collect(Collectors.toList());
		
		if(trainees.size()>= supervisor.getTraineesCount()) {
			return new ResponseEntity<String>("Trainees Limit Excided",HttpStatus.BAD_REQUEST);
		}
		Trainee createdTrainee =traineeRepository.save(trainee);
		
		
//		try {
//			sendEmail(trainee.getFirstname() +" "+trainee.getLastname(), trainee.getSupervisor().getUser().getUsername());
//		} catch (MessagingException e) {
//			return new ResponseEntity<String> ("Error occoured while sending the email",HttpStatus.BAD_REQUEST);
//			
//		} catch (IOException e) {
//			return new ResponseEntity<String> ("Error occoured while sending the email",HttpStatus.BAD_REQUEST);
//		}
		
		return new ResponseEntity<Trainee>(trainee,HttpStatus.OK);
	}

	
	public DBFile storeFile(MultipartFile file,long traineeId, String category) throws UserNotFoundException {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            Trainee trainee=traineeRepository.findById(traineeId).orElseThrow(()-> new UserNotFoundException("Trainee not found"));

            DBFile dbFile = new DBFile(fileName, file.getContentType(),category,trainee, file.getBytes());

            return dbFileRepository.save(dbFile);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public DBFile getFile(long fileId) {
        return dbFileRepository.findById(fileId)
                .orElseThrow(() -> new MyFileNotFoundException("File not found with id " + fileId));
    }
	
    
	private String sendEmail(String trainee, String supervisor) throws MessagingException, IOException{
	

		String mgString="You have appointed to supervise "+trainee+".";
		
		
		MimeMessagePreparator messagePreparator = mimeMessage -> {
	        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage,true);
	        messageHelper.setFrom("ac2019resume@gmail.com");
	        messageHelper.setTo(supervisor);
	        messageHelper.setSubject("Supervisor Appointment");
	        messageHelper.setText(mgString,true);
	        
	    };
    
    
    	javaMailSender.send(messagePreparator);
   
    	return "done";
	}

	public Trainee hrValidate(long id) throws UserNotFoundException {
		Trainee trainee=traineeRepository.findById(id).orElseThrow(()-> new UserNotFoundException("Trainee not found"));
		trainee.setHrValidated(true);
		
		return traineeRepository.save(trainee);
	}

	public Trainee confirmation(long id) throws UserNotFoundException {
		Trainee trainee=traineeRepository.findById(id).orElseThrow(()-> new UserNotFoundException("Trainee not found"));
		trainee.setDirectorConfirmed(true);
		
		return traineeRepository.save(trainee);
	}

	public void archiveTrainee(long id) {
		traineeRepository.deleteById(id);
	}

	public Iterable<Trainee> findAllDelete(boolean isDeleted) {
		Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedTraineeFilter");
        filter.setParameter("isDeleted", isDeleted);
        Iterable<Trainee> trainees =  traineeRepository.findAll();
        session.disableFilter("deletedTraineeFilter");
        return trainees;
	}

	
}
