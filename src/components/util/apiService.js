import http from "../../http-common"
const renderAllWorkSpace = () => {
    return http.get("workspace/");
}

const creatNewWorkSpace = (name) => {
    let data = {
        name: name,
    };
    console.log(data);
    return http.post("workspace/create", data);
}

const DeleteWorkSpace = (id) => {

    return http.delete(`https://xcareer1backend.onrender.com/api/workspace?workspaceId=${id}`);
}

// const UpdateWorkspaces = (id ,name)=>{
//     let data = {
//         name: name,
//         id:id
//       };
//        return http.put(
//         `http://localhost:9090/api/project/${id}`,
//         data
//       );
// }

const dataAssign = (id) => {
    return http.get(`member/userId/${id}`);

}


const renderWorkspace = (id) => {
    return http.get(
        `https://xcareer1backend.onrender.com/api/project?workspaceId=${id}`
    );
}


const listUser = (offset, limit) => {
    return http.get(`https://xcareer1backend.onrender.com/api/auth/seeusers?offset=${offset}&limit=${limit}`)
}


const creatMem = (projectId, userId) => {
    let dataCreate = {
        projectId: projectId,
        userId: userId,

    };
    return http.post(
        `https://xcareer1backend.onrender.com/api/member/add`,
        dataCreate
    );
}


const renderAllMemInProject = (id) => {
    return http.get(
        `https://xcareer1backend.onrender.com/api/member/projectId/${id}`
    );

}

const getMemProject = (id) => {
    return http.get(
        `https://xcareer1backend.onrender.com/api/member/userId/${id}`
    );
}


const kickUser = (projectId, userId) => {

    return http.delete(
        `https://xcareer1backend.onrender.com/api/member/kick?projectId${projectId}&userId${userId}`,

    );
}

export { renderAllWorkSpace, creatNewWorkSpace, DeleteWorkSpace, dataAssign, renderWorkspace, listUser, creatMem, renderAllMemInProject, kickUser }