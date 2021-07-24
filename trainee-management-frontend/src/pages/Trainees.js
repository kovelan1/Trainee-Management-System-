import React ,{Component} from 'react'
import TraineesList from '../components/TraineesList'
import { getSupervisor,updateTraineeCount } from '../services/ApiService'
import localStorageService from '../services/localStorageService'
import Paper from '@material-ui/core/Paper';
import { Button, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Trainees extends Component {
    state={
        supervisorList:[],
        supervisor:[],
        supervisorCount:'',
        open:false,
        name:null,
        
    }

    async componentDidMount() {
        await getSupervisor().then(data=>{
            const results = data.data;
            this.setState({supervisorList:results});
            
          }).catch()

          await this.getSupervisorTrainessCount();
    }
    
     getSupervisorTrainessCount(){
        this.state.supervisorList.map(sup=>{
            console.log(sup.user.username);
            if(sup.user.username === localStorageService.getItem('username')){
                console.log(sup.traineesCount)
                 this.setState({supervisor:sup});
            }
        })
    }

    updateTrineesCount(){
        updateTraineeCount(this.state.supervisor.id,this.state.name).then(data=>{
            this.setState({open:false})
            this.componentDidMount()
        }).catch()
        this.setState({open:false})
    }

    handleClose(){
        this.setState({open:false})
    }
    
    handleChange=(event)=>{
        this.setState({name:event.target.value})
        console.log(this.state.name)
    }
    render() {
        
        // console.log(filtred)
    return (
        <div>
            {localStorageService.getItem('role')==='ROLE_supervisor' && 
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                   
                    <p style={{textAlign:'right'}}> <h4> Traniees Allocation : {this.state.supervisor.traineesCount}</h4> </p>
                    </Grid>
                    <Grid item xs={12} sm={3} > <div style={{textAlign:'left', marginTop:'15px'}}></div><Button variant="outlined" color="primary" onClick={()=>this.setState({open:true})}>Update</Button></Grid>
            </Grid>
                
            
            }

        <Dialog open={this.state.open} onClose={()=>this.handleClose()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    label="Count"
                    type="number"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={()=> this.handleClose()} color="primary">
                    Cancel
                </Button>
                <Button onClick={()=>this.updateTrineesCount()} color="primary">
                    Add
                </Button>
                </DialogActions>
            </Dialog>

            <br></br>
            <br></br>
            <br></br>
           <TraineesList/>
        </div>
    )}
}
