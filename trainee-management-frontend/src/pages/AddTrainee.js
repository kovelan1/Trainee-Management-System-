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
import Alert from '@material-ui/lab/Alert';

import * as Yup from 'yup';
import { Formik } from 'formik';

import {addingTrainee, getSupervisor, getSuggestedBy, uploadFile} from '../services/ApiService'

export default function AddTrainee(props) {
    const history= useHistory();
    let location = useLocation();
    const[alert, setAlert]=React.useState(false);
    const[severity, setSeverity]=React.useState('');
    const[loading, setLoading]=React.useState(false);
    const[alertMessage, setAlertMessage]=React.useState('');
    const[supervisorList, setSupervisorList]=React.useState('');
    const[userList, setUserList]=React.useState('');
    const[suggestedBySel, setSuggestedBy]=React.useState('');
    const[supervisorSel, setSupervisor]=React.useState('');
    const[files, setFiles]=React.useState([{
        id: null,
        file: "",
        category: ""
    }]);
    const[fileCount, setFileCount]=React.useState(0);

    React.useEffect(() => {
        async function getLists(){
          await getSupervisor().then(data=>{
            setSupervisorList(data.data)
          }).catch()

          await getSuggestedBy().then(data=>{
            setUserList(data.data)
          }).catch()

          if(props.edit){
            setSupervisor(location.state.data.supervisor);
            setSuggestedBy(location.state.data.suggestedBy);
          }
          
        }
        getLists();
      }, []);

      const incremenat=()=>{
        setFiles([...files,{
            id: null,
            file: "",
            category: ""
        }])
      }

      const selectSupHandler=(e)=>{
          console.log(e.target.value);

          setSupervisor(supervisorList[e.target.value]);
          console.log(supervisorSel);
      }
      const selectSugestHandler=(e)=>{
        console.log(e.target.value);

        setSuggestedBy(userList[e.target.value]);
        console.log(suggestedBySel);
    }

      const handleCategoryValueChange = (index,type, e) => {
        const item = [...files];
        if(type==="category"){
            item[index].category=e.target.value;
        }else{
            item[index].file=e.target.files[0];
        }
        

        setFiles(item);
        console.log(files);
        // const updatedValues = values.map((value, i) => {
        //   if (i === index) {
        //     return e.target.value;
        //   } else {
        //     return value;
        //   }
        // });
        // setValues(updatedValues);
      };

    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

    return (
        <div>
            {loading ?
           <CircularProgress />
           :
            <Typography >
           {  alert && <Alert severity={severity}>{alertMessage}</Alert>}
           <Formik
             enableReinitialize={true}
               
               initialValues={{
               id: props.edit ? location.state.data.id : null,
               firstname: props.edit ? location.state.data.firstname : '',
               lastname: props.edit ? location.state.data.lastname :'',
               cin: props.edit ? location.state.data.cin : '',
               address:{
                   homeNumber: props.edit ? location.state.data.address.homeNumber :'',
                   address: props.edit ? location.state.data.address.address :'',
                   city: props.edit ? location.state.data.address.city : '',
                   state: props.edit ? location.state.data.address.state : '',
                   zip: props.edit ? location.state.data.address.zip : '',
                   country: props.edit ? location.state.data.address.country : '',
               },
               email: props.edit ? location.state.data.email : '',
               establishment: props.edit ? location.state.data.establishment : '',
               specialty:props.edit ? location.state.data.specialty : '',
               mobile: props.edit ? location.state.data.mobile : '',
               level: props.edit ? location.state.data.level : '',
               employeeName: props.edit ? location.state.data.employeeName : '',
               personal:  props.edit ? location.state.data.personal : '',
               phone: props.edit ? location.state.data.phone : '',
               periodOfInternship: props.periodOfInternship ? location.state.data.periodOfInternship : '',
               durationOfInternship: props.durationOfInternship ? location.state.data.durationOfInternship : '',
               }}
               validationSchema={
                   
               
               Yup.object().shape({
                firstname: Yup.string().max(255).required('First name name is required'),
                lastname: Yup.string().max(255).required('Last name is required'),
                   address: Yup.object().shape({
                       country: Yup.string().max(255).required('Country is required'),
                       address:Yup.string().max(255).required('Locality / Street is required'),
                       homeNumber:Yup.string().max(255).required('Home/Office number is required'),
                       city:Yup.string().max(255).required('City is required'),
                       state:Yup.string().max(255).required('State is required'),
                       zip:Yup.string().max(255).required('Zip is required'),
                       
                //    phone:Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(10).required('Mobile number is required'),
                   }),
                   email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                   personal:Yup.string().max(15).required('Personal is required'),
                   cin:Yup.string().max(15).required('CIN is required'),
                   establishment:Yup.string().max(15).required('Establishment is required'),
                   specialty:Yup.string().max(255).required('Specialty is required'),
                   level:Yup.string().max(255).required('Level is required'),
                   phone:Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(9).required('Mobile number is required'),
                   employeeName: Yup.string().max(255).required('Employee Name is required'),
                   periodOfInternship: Yup.string().max(255).required('Period is required'),
                   durationOfInternship: Yup.string().max(255).required('Duration is required'),
                   
               })
            


               }
               
               onSubmit={async values => {
                   const supervisor=supervisorSel;
                   const suggestedBy=suggestedBySel;
                const valuesToSend = { ...values, supervisor,suggestedBy}
                        setLoading(true);
                       await addingTrainee(valuesToSend).then(data=>{
                           // console.log(data.data)
                           if(!props.edit){
                            files.map(file=>{
                                uploadFile(file.file,data.data.id,file.category).then(data=>{
                               }).catch(
                          
                                   )
                          })
                           }
                           setLoading(false);
                           history.push('/trainees');

                        //    history.push({pathname:'/addcard',state:{ data:true }});
                       }).catch(function (error){
                        setLoading(false);
                        setAlert(true)
                        setAlertMessage("Trainees Limit Excided")
                        setSeverity('error')
                      })
                   
                   
               
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
                                error={Boolean(touched.firstname && errors.firstname)}
                                helperText={touched.firstname && errors.firstname}
                                label="First name"
                                margin="normal"
                                name="firstname"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstname}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                error={Boolean(touched.lastname && errors.lastname)}
                                helperText={touched.lastname && errors.lastname}
                                
                                label="Last Name"
                                margin="normal"
                                name="lastname"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastname}
                                variant="outlined"
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                error={Boolean(touched.cin && errors.cin)}
                                helperText={touched.cin && errors.cin}
                                label="CIN"
                                margin="normal"
                                name="cin"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.cin}
                                variant="outlined"
                                required
                            />  
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(touched.personal && errors.personal)}
                                helperText={touched.personal && errors.personal}
                                fullWidth
                                label="Personal"
                                margin="normal"
                                name="personal"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.personal}
                                variant="outlined"
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(errors.address  && errors.address.homeNumber && touched.address && touched.address.homeNumber)}
                                helperText={errors.address && errors.address.homeNumber && touched.address && touched.address.homeNumber}
                                fullWidth
                                label="Home Number / Office No"
                                margin="normal"
                                name="address.homeNumber"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address.homeNumber}
                                variant="outlined"
                                required
                            />  
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                // && touched.address.address
                                error={Boolean(errors.address  && errors.address.address && touched.address && touched.address.address)}
                                helperText={errors.address && errors.address.address && touched.address && touched.address.address}
                                label="Locality / Sector"
                                margin="normal"
                                name="address.address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address.address}
                                variant="outlined"
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(errors.address  && errors.address.city && touched.address && touched.address.city)}
                                helperText={errors.address  && errors.address.city && touched.address && touched.address.city}
                                fullWidth
                                label="City"
                                margin="normal"
                                name="address.city"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address.city}
                                variant="outlined"
                                required
                            />  
                        </Grid>
                        <Grid item xs={12} sm={6}>      
                            <TextField
                                error={Boolean(errors.address  && errors.address.state && touched.address && touched.address.state)}
                                helperText={errors.address && errors.address.state && touched.address && touched.address.state}
                                fullWidth
                                label="State"
                                margin="normal"
                                name="address.state"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address.state}
                                variant="outlined"
                                required
                            />  
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(errors.address && errors.address.zip && touched.address && touched.address.zip)}
                                helperText={errors.address  && errors.address.zip && touched.address && touched.address.zip}
                                fullWidth
                                label="Zip Code"
                                margin="normal"
                                name="address.zip"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address.zip}
                                variant="outlined"
                                required
                            />  
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(errors.address && errors.address.country && touched.address && touched.address.country)}
                                helperText={errors.address  && errors.address.country && touched.address && touched.address.country}
                                fullWidth
                                label="Country"
                                margin="normal"
                                name="address.country"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address.country}
                                variant="outlined"
                                required
                            />  
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                error={Boolean(touched.phone && errors.phone)}
                                helperText={touched.phone && errors.phone}
                                label="Mobile Number"
                                margin="normal"
                                name="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="number"
                                value={values.phone}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                                fullWidth
                                label="Email Address"
                                margin="normal"
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.email}
                                variant="outlined"
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(touched.specialty && errors.specialty)}
                                helperText={touched.specialty && errors.specialty}
                                fullWidth
                                label="Speciality "
                                margin="normal"
                                name="specialty"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="text"
                                value={values.specialty}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(touched.establishment && errors.establishment)}
                                helperText={touched.establishment && errors.establishment}
                                fullWidth
                                label="Establishment "
                                margin="normal"
                                name="establishment"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="text"
                                value={values.establishment}
                                variant="outlined"
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(touched.level && errors.level)}
                                helperText={touched.level && errors.level}
                                fullWidth
                                label="Level "
                                margin="normal"
                                name="level"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="text"
                                value={values.level}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(touched.employeeName && errors.employeeName)}
                                helperText={touched.employeeName && errors.employeeName}
                                fullWidth
                                label="Employee Name "
                                margin="normal"
                                name="employeeName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="text"
                                value={values.employeeName}
                                variant="outlined"
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(touched.periodOfInternship && errors.periodOfInternship)}
                                helperText={touched.periodOfInternship && errors.periodOfInternship}
                                fullWidth
                                label="period Of Internship "
                                margin="normal"
                                name="periodOfInternship"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="text"
                                value={values.periodOfInternship}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(touched.durationOfInternship && errors.durationOfInternship)}
                                helperText={touched.durationOfInternship && errors.durationOfInternship}
                                fullWidth
                                label="Duration Of Internship"
                                margin="normal"
                                name="durationOfInternship"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="text"
                                value={values.durationOfInternship}
                                variant="outlined"
                                required
                            />
                        </Grid>
                    </Grid>
                    {props.edit ? '': <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">Supervisor</InputLabel>
                            <Select
                            fullWidth
                            native
                            // error={Boolean(touched.supervisor && errors.supervisor)}
                            // helperText={touched.supervisor && errors.supervisor}
                            margin="normal"
                            variant="outlined"
                            onBlur={handleBlur}
                            onChange={e=>selectSupHandler(e)}
                            label="Supervisor"
                            name="supervisor"
                            inputProps={{
                                
                                id: 'outlined-age-native-simple',
                            }}
                            required
                            >
                            <option aria-label="Supervisor" value="" />
                            {supervisorList && supervisorList.map((sup,index)=>
                                
                                <option value={index}>{sup.user.firstName} {sup.user.lastName} </option>
                            )}
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" >
                                <InputLabel htmlFor="outlined-age-native-simple">Suggested By</InputLabel>
                                    <Select
                                    fullWidth
                                    native
                                    // error={Boolean(touched.suggestedBy && errors.suggestedBy)}
                                    // helperText={touched.suggestedBy && errors.suggestedBy}
                                    margin="normal"
                                    variant="outlined"
                                    
                                    onBlur={handleBlur}
                                    onChange={e=>selectSugestHandler(e)}
                                    label="Suggested By"
                                    name= 'suggestedBy'
                                    inputProps={{
                                        
                                        id: 'outlined-age-native-simple',
                                    }}
                                    
                                    required
                                    >
                                        {/* selected="selected" */}
                                  <option aria-label="suggestedBy" value="" />
                                    {userList && userList.map((user,index)=>
                                        
                                            <option key={index} value={index}>{user.firstName} {user.lastName} </option>
                                        
                                        
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    { files && files.map((count,index)=>
                        <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            
                            <Input 
                                //  error={Boolean(touched.employeeName && errors.employeeName)}
                                //  helperText={touched.employeeName && errors.employeeName}
                                fullWidth
                                label="Employee Name "
                                margin="normal"
                                name="file"
                                onBlur={handleBlur}
                                onChange={e=>handleCategoryValueChange(index,"file",e)}
                                type="file"
                                //  value={values.employeeName}
                                variant="outlined"
                                required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" >
                                <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
                                    <Select
                                    fullWidth
                                    native
                                    error={Boolean(touched.suggestedBy && errors.suggestedBy)}
                                    helperText={touched.suggestedBy && errors.suggestedBy}
                                    margin="normal"
                                    variant="outlined"
                                    // value={category}
                                    onBlur={handleBlur}
                                    onChange={e=>handleCategoryValueChange(index,"category",e)}
                                    label="Suggested By"
                                    name= 'category'
                                    inputProps={{
                                        
                                        id: 'outlined-age-native-simple',
                                    }}
                                    >
                                    <option aria-label="SuggestedBy" value="" />
                                    <option value='CV'>CV </option>
                                    <option value='Education'>Education </option>
                                    <option value='Personal'>Personal </option>
                                    
                                </Select>
                            </FormControl>
                                {/* {
                                    index===0 ? '':
                                
                            <div style={{textAlign:'left'}}>
                                <IconButton edge="start" color="secondary" aria-label="menu">
                                    <DeleteIcon />
                                </IconButton>
                                </div>
                                } */}
                            </Grid>
                        </Grid>
                        )}
                    
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                        <Fab color="primary" aria-label="add" onClick={e=>incremenat()}>
                                <AddIcon />
                            </Fab>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            
                        </Grid>
                    </Grid>
                    </div>}

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
