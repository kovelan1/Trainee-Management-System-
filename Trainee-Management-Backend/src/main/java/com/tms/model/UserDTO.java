package com.tms.model;

import java.util.List;

public class UserDTO {

	private User user;
	private List<Trainee> trainees;
	private List<Trainee> sugessions;
	
	public UserDTO() {
		// TODO Auto-generated constructor stub
	}
	
	

	public UserDTO(User user, List<Trainee> trainees, List<Trainee> sugessions) {
		this.user = user;
		this.trainees = trainees;
		this.sugessions = sugessions;
	}



	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Trainee> getTrainees() {
		return trainees;
	}

	public void setTrainees(List<Trainee> trainees) {
		this.trainees = trainees;
	}

	public List<Trainee> getSugessions() {
		return sugessions;
	}

	public void setSugessions(List<Trainee> sugessions) {
		this.sugessions = sugessions;
	}
	
	
}
