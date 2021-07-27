package com.tms.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.hibernate.annotations.SQLDelete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users" )
@SQLDelete(sql = "UPDATE users SET deleted = true WHERE username=?")
@FilterDef(name = "deletedUserFilter", parameters = @ParamDef(name = "isDeleted", type = "boolean"))
@Filter(name = "deletedUserFilter", condition = "deleted = :isDeleted")
public class User {

    @Id
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    
    private String password;
    
    private String firstName;
    private String lastName;
    private String role;
    private boolean enabled;
    private boolean deleted=Boolean.FALSE;
    
    public boolean isDeleted() {
		return deleted;
	}


	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@JsonIgnore
    @OneToOne(mappedBy = "user")
    private Supervisor supervisor;
    
	//    @JsonIgnore
//    @OneToMany(mappedBy = "supervisor")
//    private List<Trainee> trinees;

    @JsonIgnore
    @OneToMany(mappedBy = "suggestedBy")
    private List<Trainee> suggested;
    
    public User() {}


    public User(String username, String password,String firstName,String lastName, String role, boolean enabled) {

		this.username = username;
		this.password = password;
		this.firstName=firstName;
		this.lastName=lastName;
		this.role = role;
		this.enabled = enabled;
	}


	public String getUsername() {
        return username;
    }


    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public boolean isEnabled() {
        return enabled;
    }


    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}



//	public List<Trainee> getTrinees() {
//		return trinees;
//	}
//
//	public void setTrinees(List<Trainee> trinees) {
//		this.trinees = trinees;
//	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public Supervisor getSupervisor() {
		return supervisor;
	}


	public void setSupervisor(Supervisor supervisor) {
		this.supervisor = supervisor;
	}


	public List<Trainee> getSuggested() {
		return suggested;
	}



	public void setSuggested(List<Trainee> suggested) {
		this.suggested = suggested;
	}

	public String getPassword() {
		return password;
	}



}