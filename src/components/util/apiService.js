import http from "../../http-common"

const renderAllWorkSpace = ()=>{
    return http.get("workspace/");
}

const creatNewWorkSpace = (name)=>{
    let data = {
        name: name,
      };
      console.log(data);
    return http.post("workspace/create", data);
}

const DeleteWorkSpace = (id)=>{
   
    return http.delete(`workspace/${id}`);
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

const dataAssign =(id)=>{
    return http.get(`member/userId/${id}`);

}


const renderWorkspace = (id)=>{
    return http.get(
        `http://localhost:9090/api/project?workspaceId=${id}`
      );
}

export{renderAllWorkSpace ,creatNewWorkSpace ,DeleteWorkSpace , dataAssign ,renderWorkspace}