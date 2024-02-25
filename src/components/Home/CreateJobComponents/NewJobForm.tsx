
import { CaseSensitive, Coins, Smartphone, PenBox, PenLine} from 'lucide-react'
import Input from "../CreateJobComponents/Input";
import {useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

export function NewJobForm () {

  return (
    <form 
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
        IType="text"
        icon={Coins}
        label='Valor do conserto'
        name='price'
        placeholder='Valor do conserto'
        
      />
      <Input 
        IType="text"
        icon={CaseSensitive}
        label='Nome do dispositivo'
        name='device'
        placeholder='Nome do dispositivo'
        
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