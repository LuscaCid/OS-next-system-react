import { UsersProperties } from "@/@types/CreateJob"
import { useReducer } from "react"

export type ActionType  = 
  | { type: 'SET_USER_SELECTED', payload: {data : UsersProperties} }
  | { type: 'REMOVE_USER_SELECTED' }

function reducer (state : UsersProperties | null  , action : ActionType) {
  switch (action.type) {
    case "SET_USER_SELECTED" : 
      return {
        id : action.payload.data.id,
        name : action.payload.data.name,
        cpf : action.payload.data.cpf
      }
      case "REMOVE_USER_SELECTED" :
        return {
          id : '',
          name : '',
          cpf : ''
        }
      default: return state
  }
  
}
export function NewJobFormReducerObject () {

  const [userSelected , dispatch] = useReducer(reducer, null)

  function handleSelectUser (user : UsersProperties) {
    dispatch({ type : "SET_USER_SELECTED", payload : {data : user} })
  }
  function handleRemoveUserSelected () {
    dispatch({ type : "REMOVE_USER_SELECTED" })
  }
  
  return {
    userSelected,
    handleSelectUser,
    handleRemoveUserSelected
  }

}


