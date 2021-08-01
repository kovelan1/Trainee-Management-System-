import React, { Component } from 'react'
import { getTrainees,handleDownload, deleteTrainee ,approveTrainee} from '../services/ApiService'
import { Link as RouterLink,withRouter, Redirect } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoneIcon from '@material-ui/icons/Done';
import Divider from '@material-ui/core/Divider';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Container, Grid, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import localStorageService from '../services/localStorageService';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));



 class TraineesList extends Component {
    state = {
        trainees: [],
        alert:false,
        alertMessage:'',
        searchKey: '',
        filterName: '',
        filterCIN: '',
        open: false,
        deleteopen:false,
        validateTraineeId:null,
        editopen:false,
        deleteId:null,
        files:[],
        seletedTrainee:{
            id: 3,
            firstname: "",
            lastname: "",
            cin: "",
            personal: "",
            address: {
                homeNumber: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                country: ""
            },
            phone: "",
            email: "",
            establishment: "",
            specialty: "",
            level: "",
            periodOfInternship: "",
            durationOfInternship: "",
            employeeName:"",
            paid: null,
            supervisor: {
                id: 1,
                user: {
                    username: "",
                    firstName: "",
                    lastName: "",
                    role: "",
                    enabled: true
                },
            traineesCount: 5
            },
            suggestedBy: {
                username: "",
                firstName: "",
                lastName: "",
                role: "",
                enabled: true
            },
            files: [{
                id: 1,
                fileName: "",
                fileType: "",
                category: "",
                data: ""}],
            hrValidated: false,
            directorConfirmed: false,
            deleted: false
        },

    }


    async componentDidMount() {
        await getTrainees().then(data => {
            const results = data.data;
            this.setState({
                trainees: results
            })

        }).catch(

        )
        console.log(this.state.trainees)
    }

    changeFilterName = (e) => {
        this.setState({ filterName: e.target.value });
    }

    changeFilterCIN = (e) => {
        this.setState({ filterCIN: e.target.value });
    }


    onSearch(key) {
        this.setState({
            searchKey: key
        })
        console.log(key)
        // return this.state.cards.fullName.filter(item => item.toLowerCase() == key.toLowerCase());
    }

    
    handelAgree =() =>{
        deleteTrainee(this.state.deleteId).then(data=>{}).catch();
        let temp= this.state.trainees.filter(item => item.id !== this.state.deleteId);
        this.setState({trainees:temp})
        this.setState({ deleteopen: false });
    }         
    
    handelValidAgree =()=>{
        this.editApprove(this.state.validateTraineeId);
    }

    handleEditOpen = (id) => {
        this.setState({validateTraineeId:id})
        this.setState({ editopen: true });
    };

    handleDeleteOpen = (id) => {
        this.setState({deleteId:id})
        this.setState({ deleteopen: true });
    };

    handleDeleteClose = () => {
        this.setState({ deleteopen: false });
    };

    handleeditClose=() =>{
        this.setState({editopen:false})
    }

    handleClickOpen = (trainee,files) => {
        console.log(files)
        this.setState({ seletedTrainee:trainee});
       this.setState({files:files})
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
     
    routeChange = (row) =>{ 
        // let path = `editcard`; 
  
        this.props.history.push({pathname:'/editTrainee',state:{ data:row }});
        // history.push(path)
    }

     editApprove =(id)=>{
         approveTrainee(id).then(data => {
             
            this.setState({alert:true});
            if(localStorageService.getItem('role')==='ROLE_hr'){
                
                this.setState({alertMessage:'Validated'})
                this.componentDidMount();
            }else{
                
                this.setState({alertMessage:'Confirmed'})
                this.componentDidMount();
            }
            
        }).catch()
        this.setState({editopen:false})
    }

    deleteById =(id) =>{
        deleteTrainee(id).then(data=>{}).catch();
    }

    render() {
        // let filtred = this.state.cards;
        // let filtred = this.state.cards.filter(item => item.fullName.toLowerCase() == this.state.searchKey.toLowerCase());
        let filtred = this.state.trainees.slice();
        if (this.state.filterName) {
            filtred = filtred.filter(item => item.firstname.toLowerCase() === this.state.filterName.toLowerCase() || item.lastname.toLowerCase() === this.state.filterName.toLowerCase());
        }
        if (this.state.filterCIN) {
            filtred = filtred.filter(item => item.cin.toLowerCase() == this.state.filterCIN.toLowerCase());
        }

        return (

            <div>
                {this.state.alert ? <Alert severity="success">{this.state.alertMessage}</Alert> :''}

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <TextField id="standard-basic" label="Search Name" onChange={this.changeFilterName} value={this.state.filterName} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField id="standard-basic" label="Search CIN" onChange={this.changeFilterCIN} value={this.state.filterCIN} />
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}>
                        {
                            (localStorageService.getItem('role') ==='ROLE_secretary' || localStorageService.getItem('role') ==='ROLE_admin') && 
                       
                    <div style={{textAlign:'right', marginTop:'15px'}}><Button variant="outlined" color="primary" onClick={()=>this.props.history.push("/addTrainee")}> Create New</Button></div>
                }
                    </Grid>
                </Grid>
                <br></br>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell><h4>Name</h4></TableCell>
                                <TableCell align="left"><h4>CIN</h4></TableCell>
                                <TableCell align="left"><h4>Level</h4></TableCell>
                                <TableCell align="left"><h4>Email</h4></TableCell>
                                <TableCell align="left"><h4>Phone</h4></TableCell>
                                <TableCell align="left"><h4>supervisor</h4></TableCell>
                                {localStorageService.getItem('role') ==='ROLE_hr' && <TableCell align="left"><h4>Validated</h4></TableCell>}
                                {localStorageService.getItem('role') ==='ROLE_director' && <TableCell align="left"><h4>Confirmed</h4></TableCell>}
                                <TableCell align="right"><h4>Actions  </h4></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.trainees && filtred.map((trainee, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell component="th" scope="row">
                                            {trainee.firstname} {trainee.lastname}
                                        </TableCell>
                                        <TableCell align="left">{trainee.cin}</TableCell>
                                        <TableCell align="left">{trainee.level}</TableCell>
                                        <TableCell align="left">{trainee.email}</TableCell>
                                        <TableCell align="left">{trainee.phone}</TableCell>
                                        <TableCell align="left">{trainee.supervisor.user.firstName} {trainee.supervisor.user.lastName}</TableCell>
                                        {localStorageService.getItem('role') ==='ROLE_hr' && <TableCell align="left">{trainee.hrValidated ? "Yes" : "No"}</TableCell>}
                                        {localStorageService.getItem('role') ==='ROLE_director' && <TableCell align="left">{trainee.directorConfirmed ? "Yes" : "No"}</TableCell>}
                                       
                                        <TableCell align="right">
                                        {localStorageService.getItem('role') ==='ROLE_admin' && !trainee.directorConfirmed  && 
                                            <IconButton edge="start" color="primary" onClick={e=>this.handleEditOpen(trainee.id)} aria-label="menu">
                                                <DoneIcon/>
                                            </IconButton>
                                            
                                            }
                                            
                                            {(localStorageService.getItem('role') ==='ROLE_secretary' || localStorageService.getItem('role') ==='ROLE_admin')  && <>
                                            
                                            <IconButton edge="start" color="primary" onClick={e=>this.routeChange(trainee)} aria-label="menu">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="start" color="secondary" onClick={e=>this.handleDeleteOpen(trainee.id)} aria-label="menu">
                                                <DeleteIcon />
                                            </IconButton>
                                            
                                            </>}
                                            {localStorageService.getItem('role') ==='ROLE_hr' && !trainee.hrValidated  && 
                                            <IconButton edge="start" color="primary" onClick={e=>this.handleEditOpen(trainee.id)} aria-label="menu">
                                                <EditIcon />
                                            </IconButton>
                                            
                                            }
                                           
                                            <IconButton edge="start" onClick={e=>this.handleClickOpen(trainee, trainee.files)} color="inherit" aria-label="menu">
                                                <VisibilityIcon />
                                            </IconButton>

                                        </TableCell>
                                        
                                    </TableRow>


                                ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                
                <Dialog
                    open={this.state.deleteopen}
                    onClose={this.handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want the delete the trainee?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleDeleteClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.handelAgree} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.editopen}
                    onClose={this.handleeditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {localStorageService.getItem('role')==='ROLE_hr' ? 'Do you want to validate the trainee?' :'Do you want to confirm the trainee?'}
                        
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleeditClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.handelValidAgree} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>

                <Dialog

                    maxWidth="sm"
                    fullWidth="lg"
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <div style={{textAlign:'center'}}>
                    <DialogActions>
                        <Button onClick={e => this.handleClose()} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                    <DialogTitle id="max-width-dialog-title">Trainee Details</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <DialogContentText>
                            {modelConteant(this.state.seletedTrainee)}
                            
                            {/* {this.state.seletedTrainee.firstname} */}
                        </DialogContentText>

                    </DialogContent>
                    </div>
                </Dialog>

            </div>
        )
    }
}
export default withRouter(TraineesList);


function modelConteant(trainee){


    console.log(trainee)
    return(
        <div >
           <table>
               <tbody style={{textAlign:'left'}}>
               <tr>
                   <th >Frist Name</th><th> : </th><th>{trainee.firstname}</th>
               </tr>
               <tr>
                   <th >Last Name </th><th> : </th><th>{trainee.lastname}</th>
               </tr>
               <tr>
                   <th >CIN </th><th> : </th><th>{trainee.cin}</th>
               </tr>
               <tr>
                   <th >Personal</th><th> : </th><th>{trainee.personal}</th>
               </tr>
               <tr>
                   <th >Address</th><th> : </th><th>{trainee.address.homeNumber} {trainee.address.address}, {trainee.address.city},{trainee.address.state}</th>
               </tr> 
               <tr>
                   <th >Phone</th><th> : </th><th>{trainee.phone}</th>
               </tr>
               <tr>
                   <th >Email</th><th> : </th><th>{trainee.email}</th>
               </tr>
               <tr>
                   <th >Establishment</th><th> : </th><th>{trainee.establishment}</th>
               </tr>
               <tr>
                   <th >Specialty</th><th> : </th><th>{trainee.specialty}</th>
               </tr>
               <tr>
                   <th >Level</th><th> : </th><th>{trainee.level}</th>
               </tr>
               <tr>
                   <th >Period Of Internship</th><th> : </th><th>{trainee.periodOfInternship}</th>
               </tr>
               <tr>
                   <th >Duration Of Internship</th><th> : </th><th>{trainee.durationOfInternship}</th>
               </tr>
               <tr>
                   <th >Paid</th><th> : </th><th>{trainee.paid ? "Yes" : "No"}</th>
               </tr>
               <tr>
                   <th >Supervisor</th><th> : </th><th>{trainee.supervisor.user.firstName} {trainee.supervisor.user.lastName}</th>
               </tr>
               <tr>
                   <th >Employee name</th><th> : </th><th>{trainee.employeeName}</th>
               </tr>
               <tr>
                   <th >HR Validated</th><th> : </th><th>{trainee.hrValidated ? "Yes" : "No"}</th>
               </tr>
               <tr>
                   <th >Director Confirmed</th><th> : </th><th>{trainee.directorConfirmed ? "Yes" : "No"}</th>
               </tr>
                {
                    trainee.files.map(file=>(
                        file.fileType !== null ?
                        <tr>
                            <th >{file.category}</th><th> : </th>
                            <th>
                            <Button
                                style={{textTransform: 'none'}}
                                variant="contained"
                                color="primary"
                                startIcon={<GetAppIcon />}
                                onClick={() => {handleDownload(file.id,file.fileName)}}
                            >
                                {file.fileName}
                            </Button>
                            
                                
                            </th>
                        </tr>
                        :''
                    ))
                }

               </tbody>
               
           </table>
          
            {/* <List>
                <ListItem >
                    <ListItemText align="right" primary="First Name :" />
                    <ListItemText  primary={trainee.firstname} />
                </ListItem>
                    
                <ListItem button>
                    <ListItemText primary="Last Name" />
                    <ListItemText primary={trainee.lastname} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="CIN" />
                    <ListItemText primary={trainee.cin} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Personal" />
                    <ListItemText align="left" primary={<Typography style={{textAlign:"left"}}>{trainee.personal} </Typography>}/>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Address" />
                    <ListItemText align="left" primary={<Typography style={{textAlign:"left"}}> {trainee.address.homeNumber+" "+ trainee.address.address+", "+trainee.address.city+", "+ trainee.address.state }</Typography>} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Personal" />
                    <ListItemText primary={trainee.personal} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Personal" />
                    <ListItemText primary={trainee.personal} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Personal" />
                    <ListItemText primary={trainee.personal} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Personal" />
                    <ListItemText primary={trainee.personal} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Personal" />
                    <ListItemText primary={trainee.personal} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Personal" />
                    <ListItemText primary={trainee.personal} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Personal" />
                    <ListItemText primary={trainee.personal} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Personal" />
                    <ListItemText primary={trainee.personal} />
                </ListItem>
                
            </List> */}
        </div>
    )
}