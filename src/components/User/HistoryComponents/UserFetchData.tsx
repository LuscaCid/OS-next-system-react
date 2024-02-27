import { IHistoryData } from "@/@types/HistoryData"
import { useQuery } from "@tanstack/react-query"
import LoadingHistory from "./loading"
import { HistoryRender } from "./HistoryRendering"

interface Props {
  query : string
}

export function HistoryFetchAndRendering({query} : Props) {

  const {isLoading, data : JobsHistory, isError } = useQuery({
    queryFn : () => fetchHistory(),
    queryKey : ["history"],
  })

  async function fetchHistory () {  
    const response = await fetch('http://localhost:3000/orders')
    let data : IHistoryData [] = await response.json()
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
      <HistoryRender JobsHistory={JobsHistory} query={query}/>
    </>
  )

}