import { commonApi } from "./commonApi"
import { serverurl } from "./serverUrl"


export const registerApi = async(reqBody) =>{
    return await commonApi('POST',`${serverurl}/register`,reqBody,'')
}

export const loginApi = async(reqBody) =>{
    return await commonApi('POST',`${serverurl}/login`,reqBody,'')
}

export const addProjectApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverurl}/add-project`,reqBody,reqHeader)
}

export const homeProjectApi = async()=>{
    return await commonApi('GET',`${serverurl}/home-project`,"","")
}

export const allProjectApi = async(searchKey)=>{
    return await commonApi('GET',`${serverurl}/all-project?search=${searchKey}`,"","")
}

export const userProjectApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverurl}/user-project`,"",reqHeader)
}

export const removeUserProjectApi = async(id)=>{
    return await commonApi('DELETE',`${serverurl}/remove-userproject/${id}`,{},"")
}

export const updateUserProjectApi = async(id,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverurl}/edit-project/${id}`,reqBody,reqHeader)
}

export const updateProfileApi = async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverurl}/update-profile`,reqBody,reqHeader)
}



