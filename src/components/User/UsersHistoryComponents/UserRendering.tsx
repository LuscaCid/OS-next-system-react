import { ClientDataRendering } from "@/@types/Users" 
import { UserBox } from "./UserBox"
import { useEffect, useState } from "react"

interface Props {
    query : string 
    UserHistory : ClientDataRendering [] | undefined
}

export function UsersRendering({query, UserHistory} : Props) {

    const [displayUserHistory, setDisplayUserHistory] = useState<ClientDataRendering [] | undefined>(UserHistory)

    useEffect(() => {
        
        if(displayUserHistory){
          setDisplayUserHistory(UserHistory!.filter((element : ClientDataRendering) => {
                const name = element.name.toLowerCase()
                const email = element.email.toLowerCase()
                if(email.includes(query.toLowerCase()))return element
                if(name.includes(query.toLowerCase()))return element
          }))
        }
    }, [query, UserHistory]) 
    return (
        <>
            {
            displayUserHistory!.length > 0 &&  displayUserHistory!.map((element : ClientDataRendering) => {
              return (
                <UserBox 
                  key={element.id}
                  email={element.email}
                  phone={element.phone}
                  name={element.name}
                  created_at= {element.created_at}
                />
              )
            })
          }
        </>
    )
}