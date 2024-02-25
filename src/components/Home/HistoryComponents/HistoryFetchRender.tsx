import { IHistoryData } from "@/@types/HistoryData"
import { useQuery } from "@tanstack/react-query"
import LoadingHistory from "./loading"
import { HistoryBox } from "./HistoryBox"

interface Props {
  query : string
}

export function HistoryFetchAndRendering({query} : Props) {

  const {isLoading, data : JobsHistory, isError } = useQuery({
    queryFn : () => fetchHistory(query),
    queryKey : ["history", query],
    retry : 2
  })

  async function fetchHistory (query : string) {
    await new Promise(resolver => setTimeout(resolver, 2000))
    const response = await fetch('http://localhost:3000/orders')
    let data : IHistoryData [] = await response.json()
    if(query) {
      console.log(query)
      data = data.filter ((element : IHistoryData) => {
        const description = element.description.toLowerCase()
        const customer_name = element.customer_name.toLowerCase()
        if(description.includes(query.toLowerCase())){
          return element
        }
        if(customer_name.includes(query.toLowerCase())){
          return element
        }
      })
    }
    return data
  }

  if(isLoading) {
    return <LoadingHistory />
  }
  if(isError) {
    return (
      <div>
        <h1 className="text-3x1">Error when fetchig</h1>
      </div>
    )
  }
  return (
    <>
      {
        JobsHistory!.length > 0 &&  JobsHistory!.map((element : IHistoryData) => {
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