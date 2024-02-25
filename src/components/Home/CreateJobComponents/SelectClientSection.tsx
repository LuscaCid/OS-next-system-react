import { ArrowUp, Search, X } from "lucide-react";
import * as Dialog from '@radix-ui/react-dialog'
import { ModalContent } from "./ModalContent";
import { UsersProperties } from "../../../@types/CreateJob.d";


interface PropsDrilling{
    selectedUser : UsersProperties | null
    handleRemoveSelectedUser : () => void
    handleSelectUser : (userSelected : UsersProperties) => void
}

export function SelectClientSection ({selectedUser, handleSelectUser, handleRemoveSelectedUser} : PropsDrilling) {

    const styleOfButton = `font-bold items-center flex justify-between dark:text-zinc-300  w-full bg-transparent p-3 border dark:hover:bg-zinc-800/80 border-zinc-300 dark:border-zinc-800 rounded-md hover:bg-zinc-200/50 transition duration-200 cursor-text ${selectedUser === null && "animate-pulse"}`
    

    return (
      <section className='flex flex-col gap-2 mt-4 mx-2'>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button type='button' className={styleOfButton}>
                Select an Client <Search strokeWidth={1.25} size={20}/>
            </button>
          </Dialog.Trigger>    
          <ModalContent handleSelectUser={handleSelectUser} />
        </Dialog.Root>
        <span className='p-3 border flex items-center justify-between dark:border-zinc-800 border-zinc-300 rounded-md dark:hover:bg-zinc-800/80 hover:bg-zinc-200 transition duration-200 '>
          { 
            selectedUser?.name ? selectedUser.name : <span className="flex items-center"> Select an client above <ArrowUp size={20} className="mx-4" /></span> 
          }
          {
            selectedUser?.name && <X onClick={handleRemoveSelectedUser} className='text-red-500 cursor-pointer' size={20}/> 
          }       
        </span>
      </section>
      
        
    )
}