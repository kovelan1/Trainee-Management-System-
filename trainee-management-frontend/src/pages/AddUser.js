import React from 'react';
import { Link as RouterLink,useLocation, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  Grid,
  CardMedia,
  Card, CardContent,
  CircularProgress,
    FormControl,
    Container,
    FormHelperText,
    Link,
    TextField,
    Paper,
    Input,
    Select,
    InputLabel,
    Fab,
    IconButton,
  } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import * as Yup from 'yup';
import { Formik } from 'formik';

import {addingUser, getSupervisor, getSuggestedBy, uploadFile} from '../services/ApiService'
import localStorageService from '../services/localStorageService';

export default function AddUser(props) {
    const history= useHistory();
    let location = useLocation();
    const[alert, setAlert]=React.useState(false);
    const[loading, setLoading]=React.useState(false);
    const[alertMessage, setAlertMessage]=React.useState('');

    React.useEffect(() => {
        
      }, []);

     

    return (
        <div>
            {loading ?
           <CircularProgress />
           :
            <Typography >
           
           <Formik
             enableReinitialize={true}
               
               initialValues={{
                    firstName: props.edit ? location.state.data.firstname : '',
                    lastName: props.edit ? location.state.data.lastname :'',
                    username: props.edit ? location.state.data.email : '',
                    password: props.edit ? location.state.data.password : '',
                    role:props.edit ? location.state.data.role : '',
               
               }}
               validationSchema={
                   
               
               Yup.object().shape({
                    firstName: Yup.string().max(255).required('First name name is required'),
                    lastName: Yup.string().max(255).required('Last name is required'),
                   
                    username: Yup.string().email('Must be a valid email').max(255).required('User Name is required'),
                   password:Yup.string().max(15).required('Password is required'),
                   
                   role: Yup.string().max(255).required('Role is required'),
                //    supervisor: Yup.string().max(255).required('Supervisor is required'),
                //    suggestedBy: Yup.string().max(255).required('Suggested By is required'),
                   
               })
            


               }
               
               onSubmit={async values => {
                // const valuesToSend = { ...values, supervisor,suggestedBy}
                        setLoading(true);
                       await addingUser(values).then(data=>{
                           // console.log(data.data)
                           
                           setLoading(false);
                           history.push('/users');

                        //    history.push({pathname:'/addcard',state:{ data:true }});
                       }).catch(
                           
                       )
                   
                   
               
               }}
           >
               {({
               errors,
               handleBlur,
               handleChange,
               handleSubmit,
               isSubmitting,
               touched,
               values
               }) => (
               <form onSubmit={handleSubmit}>
                    <Container maxWidth="md">
                     <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                error={Boolean(touched.firstName && errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                label="First name"
                                margin="normal"
                                name="firstName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                error={Boolean(touched.lastName && errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                
                                label="Last Name"
                                margin="normal"
                                name="lastName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                variant="outlined"
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                error={Boolean(touched.username && errors.username)}
                                helperText={touched.username && errors.username}
                                label="User Name"
                                margin="normal"
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                variant="outlined"
                                required
                            />  
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                                fullWidth
                                label="Password"
                                margin="normal"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                variant="outlined"
                                required
                            />
                        </Grid>
                    </Grid>
                    
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" >
                                <InputLabel htmlFor="outlined-age-native-simple">Role</InputLabel>
                                    <Select
                                    fullWidth
                                    native
                                    error={Boolean(touched.role && errors.role)}
                                    helperText={touched.role && errors.role}
                                    margin="normal"
                                    variant="outlined"
                                    // value={category}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Role"
                                    name= 'role'
                                    inputProps={{
                                        
                                        id: 'outlined-age-native-simple',
                                    }}
                                    >
                                    <option aria-label="Role" value="" />
                                    {localStorageService.getItem('role') ==='ROLE_admin'?
                                    
                                        <option value='ROLE_hr'>HR </option>
                              
                                    :<>
                                        <option value='ROLE_supervisor'>Supervisor </option>
                                        <option value='ROLE_secretary'>Secretary </option>
                                    </>
                                    }
                                    
                                    
                                </Select>
                            </FormControl>
                           
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            
                                
                            </Grid>
                        </Grid>
                        
                    
                   

                    <div style={{textAlign:'right', marginTop:'20px'}}>
                   <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Finish
                </Button>
                   </div>
                   </Container>
                   
               
                  
               </form>
               )}
           </Formik>
       </Typography>
        
        
                            }
        </div>
    )
}
