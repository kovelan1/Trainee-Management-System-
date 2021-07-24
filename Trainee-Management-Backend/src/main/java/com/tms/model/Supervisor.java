package com.tms.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "supervisor")
public class Supervisor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;


	@OneToOne
	@JoinColumn(name = "user" , referencedColumnName = "username")
	private User user;
	
	@JsonIgnore
	@OneToMany(mappedBy = "supervisor")
	private List<Trainee> trinees;
	
	private int traineesCount;
	
	public Supervisor() {
		// TODO Auto-generated constructor stub
	}
	
	

	public Supervisor(User user, int traineesCount) {
		super();
		this.user = user;
		this.traineesCount = traineesCount;
	}



	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Trainee> getTrinees() {
		return trinees;
	}

	public void setTrinees(List<Trainee> trinees) {
		this.trinees = trinees;
	}

	public int getTraineesCount() {
		return traineesCount;
	}

	public void setTraineesCount(int traineesCount) {
		this.traineesCount = traineesCount;
	}
	
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
}
