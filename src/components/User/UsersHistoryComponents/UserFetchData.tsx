import { useQuery } from "@tanstack/react-query"
import LoadingHistory from "./loading"
import { UsersRendering } from "./UserRendering"
import { ClientDataRendering } from "@/@types/Users"

interface Props {
  query : string
}

export function UserFetch({query} : Props) {

  const {isLoading, data : UsersHistory, isError } = useQuery({
    queryFn : () => fetchHistory(),
    queryKey : ["UsersHistory"],
  })

  async function fetchHistory () {  
    const response = await fetch('http://localhost:3000/clients')
    const data : ClientDataRendering [] = await response.json()
    console.log(data)
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
      <UsersRendering UserHistory={UsersHistory} query={query}/>
    </>
  )

}