import React from 'react'
import AddTrainee from '../pages/AddTrainee'
import {useHistory ,useLocation,Redirect} from 'react-router-dom';

export default function EditTrainee(props) {

    
    let location = useLocation();
    return (
        <div>
          {!location.state ?  <Redirect to={{
          pathname: '/trainees'
        }}/>:
        <AddTrainee edit={true} data={props.data}/>
        }
        </div>
    )
}
