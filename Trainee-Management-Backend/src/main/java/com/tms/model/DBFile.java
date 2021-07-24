package com.tms.model;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "files")
public class DBFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String fileType;
    
    private String category;
    
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "trainee")
    private Trainee trainee; 

    @Lob
    private byte[] data;

    public DBFile() {

    }
    
    

	public DBFile(String fileName, String fileType, String category, Trainee trainee, byte[] data) {
		super();
		this.fileName = fileName;
		this.fileType = fileType;
		this.category = category;
		this.trainee = trainee;
		this.data = data;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Trainee getTrainee() {
		return trainee;
	}

	public void setTrainee(Trainee trainee) {
		this.trainee = trainee;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
    
    

   
}
