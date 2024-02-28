import { AddNewJobMutationType, NewJobFormSchemaType, UsersProperties } from "@/@types/CreateJob"

/**
 * FUNCOES ABAIXO RELACIONADAS AO PROCEDIMENTO DE FETCH, CONTROLE DE QUERIES E CACHE 
 */



export async function AddNewJob(newJobFnData : AddNewJobMutationType) {
  try {
    const objectToSend = {
      client_id : newJobFnData.userSelected.id,
      arrived_at : new Date().toUTCString(),
      customer_name : newJobFnData.userSelected.name,
      description :newJobFnData.description,
      tag : newJobFnData.tag,
      device : newJobFnData.device
    }
    await fetch('http://localhost:3000/orders', {
      body : JSON.stringify(objectToSend),
      method : "POST"
    })
    
  } catch(err : unknown) {
    alert(err)
    console.log(err)
  }
  
}



/**
 * funcoes abaixo para geracao de objetos a partir de dados fornecidos atraves dos parametros 
 */


export function generateObjectToSend(data : NewJobFormSchemaType, userSelected : (UsersProperties | null)) {
  return {
    tag : data.tag,
    description : data.description,
    device : data.device,
    price : data.price,
    userSelected : {
      cpf : userSelected?.cpf,
      id : userSelected?.id,
      name : userSelected?.name
    } as UsersProperties
  }
}

export function GenCacheObject(variables :  AddNewJobMutationType){
  return {
    device : variables.device,
    price : variables.price,
    description : variables.description,
    arrived_at : new Date().toUTCString(),
    customer_name : variables.userSelected.name,
    tag : variables.tag,
    id : Math.ceil(Math.random() * 3000),
    client_id : variables.userSelected.id
  }
}