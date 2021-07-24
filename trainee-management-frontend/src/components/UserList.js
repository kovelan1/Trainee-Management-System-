import React, { Component } from 'react'
import { getUsers, getUserForRole } from '../services/ApiService'
import { Link as RouterLink,withRouter, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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



 class UserList extends Component {
    state = {
        users: '',
        open: false,
        deleteopen:false,
        deleteId:null,
        

    }

    userRole(role){
        switch(role) {
            case 'ROLE_admin':
              return 'Administator';
            case 'ROLE_hr':
                return 'HR';
            case 'ROLE_supervisor':
                return 'Supervisor';
            case 'ROLE_secretary':
                return 'Secretary';
            default:
              return '';
          }
    }

    async componentDidMount() {
        await getUserForRole(localStorageService.getItem('role')).then(data => {
            const results = data.data;
            this.setState({
                users: results
            })

        }).catch(

        )
        console.log(this.state.users)
    }
    
    // handelAgree =() =>{
    //     deleteTrainee(this.state.deleteId).then(data=>{}).catch();
    //     let temp= this.state.users.filter(item => item.id !== this.state.deleteId);
    //     this.setState({users:temp})
    //     this.setState({ deleteopen: false });
    // }            

    // handleDeleteOpen = (id) => {
    //     this.setState({deleteId:id})
    //     this.setState({ deleteopen: true });
    // };

    // handleDeleteClose = () => {
    //     this.setState({ open: false });
    // };
     
  

    // deleteById =(id) =>{
    //     deleteTrainee(id).then(data=>{}).catch();
    // }

    render() {
        let filtred = this.state.users.slice();
        return (

            <div>


                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}>
                    <div style={{textAlign:'right', marginTop:'15px'}}><Button variant="outlined" color="primary" onClick={()=>this.props.history.push("/addUser")}> Create New</Button></div>
                    </Grid>
                </Grid>
                <br></br>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell align="left"><h4>First Name</h4></TableCell>
                                <TableCell align="left"><h4>Last Name</h4></TableCell>
                                <TableCell align="left"><h4>User Name</h4></TableCell>
                                <TableCell align="left"><h4>Role</h4></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.users && filtred.map((user, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell align="left">{user.firstName}</TableCell>
                                        <TableCell align="left">{user.lastName}</TableCell>
                                        <TableCell align="left">{user.username}</TableCell>
                                        <TableCell align="left">{this.userRole(user.role)}</TableCell>
                                        <TableCell align="right">
{/*                                             
                                            <IconButton edge="start" color="secondary" onClick={e=>this.handleDeleteOpen(user.id)} aria-label="menu">
                                                <DeleteIcon />
                                            </IconButton> */}
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
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want the delete the user?
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

                
            </div>
        )
    }
}
export default withRouter(UserList);


// function modelConteant(trainee){


//     console.log(trainee)
//     return(
//         <div >
//            <table>
//                <tbody style={{textAlign:'left'}}>
//                <tr>
//                    <th >Frist Name</th><th> : </th><th>{trainee.firstname}</th>
//                </tr>
//                <tr>
//                    <th >Last Name </th><th> : </th><th>{trainee.lastname}</th>
//                </tr>
//                <tr>
//                    <th >CIN </th><th> : </th><th>{trainee.cin}</th>
//                </tr>
//                <tr>
//                    <th >Personal</th><th> : </th><th>{trainee.personal}</th>
//                </tr>
//                <tr>
//                    <th >Address</th><th> : </th><th>{trainee.address.homeNumber} {trainee.address.address}, {trainee.address.city},{trainee.address.state}</th>
//                </tr> 
//                <tr>
//                    <th >Phone</th><th> : </th><th>{trainee.phone}</th>
//                </tr>
//                <tr>
//                    <th >Email</th><th> : </th><th>{trainee.email}</th>
//                </tr>
//                <tr>
//                    <th >Establishment</th><th> : </th><th>{trainee.establishment}</th>
//                </tr>
//                <tr>
//                    <th >Specialty</th><th> : </th><th>{trainee.specialty}</th>
//                </tr>
//                <tr>
//                    <th >Level</th><th> : </th><th>{trainee.level}</th>
//                </tr>
//                <tr>
//                    <th >Period Of Internship</th><th> : </th><th>{trainee.periodOfInternship}</th>
//                </tr>
//                <tr>
//                    <th >Duration Of Internship</th><th> : </th><th>{trainee.durationOfInternship}</th>
//                </tr>
//                <tr>
//                    <th >Employee Name</th><th> : </th><th>{trainee.employeeName}</th>
//                </tr>
//                <tr>
//                    <th >Supervisor</th><th> : </th><th>{trainee.supervisor.user.firstName} {trainee.supervisor.user.lastName}</th>
//                </tr>
//                <tr>
//                    <th >SuggestedBy</th><th> : </th><th>{trainee.suggestedBy.firstName} {trainee.suggestedBy.lastName}</th>
//                </tr>
//                <tr>
//                    <th >HR Validated</th><th> : </th><th>{trainee.hrValidated ? "Yes" : "No"}</th>
//                </tr>
//                <tr>
//                    <th >Director Confirmed</th><th> : </th><th>{trainee.directorConfirmed ? "Yes" : "No"}</th>
//                </tr>
//                 {
//                     trainee.files.map(file=>(
//                         file.fileType !== null ?
//                         <tr>
//                             <th >{file.category}</th><th> : </th>
//                             <th>
//                             <Button
//                                 style={{textTransform: 'none'}}
//                                 variant="contained"
//                                 color="primary"
//                                 startIcon={<GetAppIcon />}
//                                 onClick={() => {handleDownload(file.id,file.fileName)}}
//                             >
//                                 {file.fileName}
//                             </Button>
                            
                                
//                             </th>
//                         </tr>
//                         :''
//                     ))
//                 }

//                </tbody>
               
//            </table>
          
//             {/* <List>
//                 <ListItem >
//                     <ListItemText align="right" primary="First Name :" />
//                     <ListItemText  primary={trainee.firstname} />
//                 </ListItem>
                    
//                 <ListItem button>
//                     <ListItemText primary="Last Name" />
//                     <ListItemText primary={trainee.lastname} />
//                 </ListItem>
//                 <ListItem button>
//                     <ListItemText primary="CIN" />
//                     <ListItemText primary={trainee.cin} />
//                 </ListItem>
//                 <ListItem button>
//                     <ListItemText primary="Personal" />
//                     <ListItemText align="left" primary={<Typography style={{textAlign:"left"}}>{trainee.personal} </Typography>}/>
//                 </ListItem>
//                 <ListItem button>
//                     <ListItemText primary="Address" />
//                     <ListItemText align="left" primary={<Typography style={{textAlign:"left"}}> {trainee.address.homeNumber+" "+ trainee.address.address+", "+trainee.address.city+", "+ trainee.address.state }</Typography>} />
//                 </ListItem>
//                 <ListItem button>
//                     <ListItemText primary="Personal" />
//                     <ListItemText primary={trainee.personal} />
//                 </ListItem>
//                 <ListItem button>
//                     <ListItemText primary="Personal" />
//                     <ListItemText primary={trainee.personal} />
//                 </ListItem>
//                 <ListItem button>
//                     <ListItemText primary="Personal" />
//                     <ListItemText primary={trainee.personal} />
//                 </ListItem>
//                 <ListItem button>
//                     <ListItemText primary="Personal" />
//                     <ListItemText primary={trainee.personal} />
//                 </ListItem>
//                 <ListItem button>
//                     <ListItemText primary="Personal" />
//                     <ListItemText primary={trainee.personal} />
//                 </ListItem>
//                 <ListItem button>
//                     <ListItemText primary="Personal" />
//                     <ListItemText primary={trainee.personal} />
//                 </ListItem>
//                 <ListItem button>
//                     <ListItemText primary="Personal" />
//                     <ListItemText primary={trainee.personal} />
//                 </ListItem>
//                 <ListItem button>
//                     <ListItemText primary="Personal" />
//                     <ListItemText primary={trainee.personal} />
//                 </ListItem>
                
//             </List> */}
//         </div>
//     )
// }