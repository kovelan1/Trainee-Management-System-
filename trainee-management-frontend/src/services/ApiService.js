import axios from 'axios';
import localStorageService from './localStorageService';
import fileDownload from 'js-file-download'

// import qs from 'qs';
const baseUrl = 'http://localhost:8080';

const userName=localStorageService.getItem("username");
const password=localStorageService.getItem("password");
const role=localStorageService.getItem("role");



export const getAuthonticated = async (user, password) => {
    let res = await axios({
        method: 'get',
        url: baseUrl + "/me",
        auth: {
            username: user,
            password: password
        }
    })
    return res
}

export const handleDownload = (id,filename) => {
    axios.get(baseUrl + `/downloadFile/${id}`, {
      responseType: 'blob',
      auth: {
        username: userName,
        password: password
    }
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
}

export const getTrainees = async () => {
    let res = await axios({
        method: 'get',
        url: baseUrl + "/trainees",
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const approveTrainee = async (id) => {
    let res = await axios({
        method: 'put',
        url: baseUrl + `/trainee/${role}/${id}`,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}


export const getArchiveTrainees = async () => {
    let res = await axios({
        method: 'get',
        url: baseUrl + "/trainees?isDeleted=true",
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const getSupervisor = async () => {
    let res = await axios({
        method: 'get',
        url: baseUrl + "/supervisor",
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const getSuggestedBy = async () => {
    let res = await axios({
        method: 'get',
        url: baseUrl + "/suggestedBy",
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const signup = async (data) => {
    let res = await axios({
        method: 'POST',
        url: baseUrl + "/signup",
        data:data
    })
    return res
}

export const addingTrainee = async (data) => {
    let res = await axios({
        method: 'POST',
        url: baseUrl + "/trainee",
        data:data,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const uploadFile = async (file,id,category) =>{
    const formData = new FormData();
    formData.append("file", file);
    formData.append("traineeId", id);
    formData.append("category", category);

    axios.post(baseUrl+ "/uploadFile",
        formData,
            {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            auth: {
                username: userName,
                password: password
            }
            }
        
        ).then((result)=>{
        }).catch()
}

export const getUserForRole = async (id) => {
    let res = await axios({
        method: 'GET',
        url: baseUrl + `/user/${id}`,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const deleteUser = async (id) => {
    let res = await axios({
        method: 'DELETE',
        url: baseUrl + `/user/${id}`,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const deleteTrainee = async (id) => {
    let res = await axios({
        method: 'DELETE',
        url: baseUrl + `/trainee/${id}`,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}


export const addingUser = async (data) => {
    let res = await axios({
        method: 'POST',
        url: baseUrl + `/create/${role}`,
        data:data,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const getSupervisorOfUser = async (data) => {
    let res = await axios({
        method: 'get',
        url: baseUrl + "/me/supervisor",
        data:data,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const updateTraineeCount = async (id,count) => {
    let res = await axios({
        method: 'put',
        url: baseUrl + `/supervisor/${count}/${id}`,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}
