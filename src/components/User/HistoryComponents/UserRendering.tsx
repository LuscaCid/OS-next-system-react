import { ClientDataRendering } from "@/@types/Users" 
import { UserBox } from "./UserBox"
import { useEffect, useState } from "react"

interface Props {
    query : string
    UserHistory : ClientDataRendering [] | undefined
}

export function HistoryRender({query, UserHistory} : Props) {

    const [displayUserHistory, setDisplayUserHistory] = useState<ClientDataRendering [] | undefined>(UserHistory)

    useEffect(() => {
        
        if(UserHistory){
          setDisplayUserHistory(displayUserHistory.filter((element : ClientDataRendering) => {
                const description = element.description.toLowerCase()
                const name = element.customer_name.toLowerCase()
                const device = element.device.toLowerCase()

                if(description.includes(query.toLowerCase()))return element
                if(name.includes(query.toLowerCase()))return element
                if(device.includes(query.toLowerCase()))return element
            }))
            
        }
    }, [query])

    return (
        <>
            {
            displayJobsHistory!.length > 0 &&  displayJobsHistory!.map((element : IHistoryData) => {
              return (
                <UserBox 
                  key={element.id}
                  arrived_at={element.arrived_at}
                  customer_name={element.customer_name}
                  description={element.description}
                  device={element.device}
                  tag={element.tag}
                />
              )
            })
          }
        </>
        
    )
}