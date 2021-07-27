package com.tms.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.ParamDef;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "trainee")
@SQLDelete(sql = "UPDATE trainee SET deleted = true WHERE id=?")
@FilterDef(name = "deletedTraineeFilter", parameters = @ParamDef(name = "isDeleted", type = "boolean"))
@Filter(name = "deletedTraineeFilter", condition = "deleted = :isDeleted")
public class Trainee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String firstname;
	private String lastname;
	private String cin;
	private String personal;
	private Address address;
	private String phone;
	private String email;
	private String establishment; 
	private String specialty; 
	private String level;
	private String periodOfInternship;
	private String durationOfInternship;
	private String employeeName;
	
	@ManyToOne
    @JoinColumn(name = "supervisor")
	private Supervisor supervisor;
	
	
	@ManyToOne
    @JoinColumn(name = "suggestedBy")
	private User suggestedBy;
	
	@OneToMany(mappedBy = "trainee")
	private List<DBFile> files;
	
	private boolean hrValidated;
	private boolean directorConfirmed; 
	private boolean deleted=Boolean.FALSE;
	
	public Trainee() {
		// TODO Auto-generated constructor stub
	}
	
	
	

	public Trainee(Long id, String firstname, String lastname, String cin, String personal, Address address,
			String phone, String email, String establishment, String specialty, String level, String periodOfInternship,
			String durationOfInternship, Supervisor supervisor, User suggestedBy) {
		super();
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.cin = cin;
		this.personal = personal;
		this.address = address;
		this.phone = phone;
		this.email = email;
		this.establishment = establishment;
		this.specialty = specialty;
		this.level = level;
		this.periodOfInternship = periodOfInternship;
		this.durationOfInternship = durationOfInternship;
		this.supervisor = supervisor;
		this.suggestedBy = suggestedBy;
		
	}




	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getCin() {
		return cin;
	}

	public void setCin(String cin) {
		this.cin = cin;
	}

	public String getPersonal() {
		return personal;
	}

	public void setPersonal(String personal) {
		this.personal = personal;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEstablishment() {
		return establishment;
	}

	public void setEstablishment(String establishment) {
		this.establishment = establishment;
	}

	public String getSpecialty() {
		return specialty;
	}

	public void setSpecialty(String specialty) {
		this.specialty = specialty;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getPeriodOfInternship() {
		return periodOfInternship;
	}

	public void setPeriodOfInternship(String periodOfInternship) {
		this.periodOfInternship = periodOfInternship;
	}

	public String getDurationOfInternship() {
		return durationOfInternship;
	}

	public void setDurationOfInternship(String durationOfInternship) {
		this.durationOfInternship = durationOfInternship;
	}

	public Supervisor getSupervisor() {
		return supervisor;
	}

	public void setSupervisor(Supervisor supervisor) {
		this.supervisor = supervisor;
	}

	public User getSuggestedBy() {
		return suggestedBy;
	}

	public void setSuggestedBy(User suggestedBy) {
		this.suggestedBy = suggestedBy;
	}

	public List<DBFile> getFiles() {
		return files;
	}

	public void setFiles(List<DBFile> files) {
		this.files = files;
	}

	public boolean isHrValidated() {
		return hrValidated;
	}
	
	public void setHrValidated(boolean hrValidated) {
		this.hrValidated = hrValidated;
	}

	public boolean isDirectorConfirmed() {
		return directorConfirmed;
	}
	
	public void setDirectorConfirmed(boolean directorConfirmed) {
		this.directorConfirmed = directorConfirmed;
	}
	
	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	
	
	
}
