import { IHistoryData } from "@/@types/HistoryData"
import { HistoryBox } from "./HistoryBox"
import { useEffect, useState } from "react"

interface Props {
    query : string
    JobsHistory : IHistoryData [] | undefined
}

export function HistoryRender({query, JobsHistory} : Props) {

    const [displayJobsHistory, setDisplayJobsHistory] = useState<IHistoryData [] | undefined>(JobsHistory)

    useEffect(() => {
        
        if(JobsHistory){
            setDisplayJobsHistory(JobsHistory.filter((element : IHistoryData) => {
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
                <HistoryBox 
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