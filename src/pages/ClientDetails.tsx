import { useSearchParams } from "react-router-dom"

export function ClientDetails () {
    
    const [searchParams] = useSearchParams()
    console.log(searchParams.keys)
    return (
        <main>
            <h1>
                {searchParams
                }
            </h1>
        </main>
    )
}