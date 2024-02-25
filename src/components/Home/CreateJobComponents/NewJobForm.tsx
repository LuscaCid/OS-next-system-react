
import { Coins, Smartphone, PenBox, PenLine, CalendarCheck} from 'lucide-react'
import Input from "../CreateJobComponents/Input";
import { useForm, FormProvider } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod';
import { NewJobFormSchema, NewJobFormSchemaType, UsersProperties } from '../../../@types/CreateJob.d';
import { SelectClientSection } from './SelectClientSection';
import { useState } from 'react';



export function NewJobForm () {

  const [userSelected, setUserSelected] = useState<UsersProperties | null>(null)
 
  function handleRemoveUserSelected() {
    setUserSelected(null)
  }

  function handleSelectUser(userSelected : UsersProperties) {
    setUserSelected(userSelected)
  }

  const {handleSubmit, formState : { isSubmitting }} = useForm<NewJobFormSchemaType>({
    resolver : zodResolver(NewJobFormSchema),
    defaultValues : { 
      device : "",
      price : 0,
      date : new Date(),
      description : "",
    }
  })
  //form provider to inputs and handle submit form
  return (
    <form 
      /*onSubmit={handleSubmit}*/
      className=" border border-zinc-300 dark:border-zinc-800/80 rounded-md m-2 flex flex-col"
    >
      <h1 className='border-b p-1 dark:text-zinc-300 dark:border-zinc-800 border-zinc-300 w-full pb-1 text-xl text-zinc-800 font-bold  flex justify-between items-center'>
        Type some info to create a new Job <PenBox size={32} />
      </h1>
      <Input 
        IType="text"
        icon={Smartphone}
        label='Nome do dispositivo'
        name='device'
        placeholder='Nome do dispositivo'

      />
      <Input 
        IType="number"
        icon={Coins}
        label='Valor do conserto'
        name='price'
        placeholder='Valor do conserto'
        
      />
      <Input 
        IType="date"
        icon={CalendarCheck}
        label='Data de entrega'
        name='delivery'
        placeholder='Data de entrega'
      />
      <textarea 
        className='p-2 mx-2 resize-none bg-transparent border dark:border-zinc-800 border-zinc-300 rounded-md shadow-md min-h-20'
        placeholder='Descrição relatando os problemas'
      />

      <SelectClientSection 
        selectedUser={userSelected}
        handleRemoveSelectedUser={handleRemoveUserSelected}  
        handleSelectUser={handleSelectUser}
      />

      <button 
        type='submit'
        className=' disabled:opacity-5 m-2 disabled:cursor-not-allowed flex items-center justify-center bg-transparent text-zinc-950 dark:text-zinc-300 rounded-md p-2 flex-end hover:bg-zinc-200  dark:hover:bg-zinc-800/90 transition duration-200 border dark:border-zinc-800 border-zinc-300  shadow-lg'
        >

        <PenLine size={24} /> Generate
      </button> 

    </form>

  )
}