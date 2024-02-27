
import { UsersProperties } from '@/@types/CreateJob'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


interface Props {
    handleSelectUser : (userSelected : UsersProperties) => void
}
export function ModalContent ({handleSelectUser} : Props) { 
    const navigate = useNavigate()
    const [query, setQuery] = useState<string>('')
    const [usersFound, setUsersFound] = useState<UsersProperties[]>()
    
    async function fetchUser() {
        const response = await fetch('http://localhost:3000/clients')
        const data : UsersProperties [] = await response.json()
        return data
    } 

    function filterDataFromQuery(usersArr : UsersProperties [] , query : string){
        const filteredDataWithinQuery = usersArr.filter((user : UsersProperties) => {

            const formattedQuery = query.toLowerCase()
            const usernameFormatted = user.name.toLowerCase()
            
            if(usernameFormatted.includes(formattedQuery) && query !== '') return user
            if(user.cpf.includes(query) && query !== '')return user
        })
        
        return filteredDataWithinQuery
    }

    function handleSelectAUserInsideThisFunction(data : UsersProperties) {
        handleSelectUser(data)
    }

    useEffect(() =>{
        if(!query)return
        async function load(){
            const usersArr = await fetchUser()         
            const filteredUsers = filterDataFromQuery(usersArr, query)
            setUsersFound(filteredUsers)
        }
        load()
    }, [query])    
    
    return ( 
        <Dialog.Portal>
            <Dialog.Overlay className='absolute inset-0 h-screen w-screen bg-zinc-800/50 '/>
            <Dialog.Content className='mx-auto  dark:bg-zinc-950/80 border dark:border-zinc-800/50  border-zinc-300 min-w-72 w-full max-w-96 rounded-md p-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-100'>
                <Dialog.Close className='absolute top-2 right-2 bg-transparent cursor-pointer text-red-500 hover:text-red-600 transition duration-200'>
                    <X size={24}/> 
                </Dialog.Close>
                <Dialog.Title className='text-lg font-bold dark:text-zinc-300 text-zinc-900 mb-4'>
                    Search
                </Dialog.Title>
                
                <input 
                    className='bg-transparent mb-2 w-full px-2 py-1 rounded-full border border-zinc-300 dark:border-zinc-800/80 dark:text-zinc-300 text-zinc-950 '
                    placeholder='name or cpf'
                    type="text" 
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                />
                <section className='rounded-md border h-40 border-zinc-300 dark:border-zinc-800/80 min-h-4 flex flex-col gap-1 overflow-y-auto p-2 '>
                    {
                    usersFound && usersFound.length > 0 ? (
                        usersFound.map((user) =>{
                            return (
                                <Dialog.Close asChild key={user.id}>
                                    <button
                                        type='submit'
                                        value={user.name}
                                        onClick={() => handleSelectAUserInsideThisFunction(user)}
                                        className='rounded-md w-full bg-zinc-300 dark:bg-zinc-800 p-1 text-sm font-bold dark:hover:bg-zinc-900 transition duration-200 hover:bg-zinc-400'>
                                        {user.name}
                                    </button>
                                </Dialog.Close>  
                            )  
                        })
                    ) : ( <span className='p-2 text-sm font-bold'>
                            enter name or cpf to find a user
                        </span>)
                    } 
                </section>
                <footer  className='w-full flex flex-col items-center'>
                    <span className='mx-auto  dark:text-zinc-600 text-zinc-300'>or</span>
                    <button
                        className='rounded-sm w-full p-2 bg-transparent border border-zinc-300 dark:border-zinc-800/80 hover:bg-zinc-200 transition duration-200 dark:hover:bg-zinc-700/80 dark:text-zinc-300 font-bold text-lg text-zinc-500'
                        onClick={() => navigate('/user')}    
                    >
                        Register a new customer
                    </button>
                </footer>
            </Dialog.Content>
        </Dialog.Portal>
        

    )
}

