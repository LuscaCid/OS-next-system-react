
import { CaseSensitive, Coins, Smartphone, PenBox, PenLine, CalendarCheck} from 'lucide-react'
import Input from "../CreateJobComponents/Input";
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';


const NewJobFormSchema = z.object({
  device : z.string(),
  price : z.number(),
  date : z.date(),
  description : z.string(),

})

type NewJobFormSchemaType = z.infer<typeof NewJobFormSchema>

export function NewJobForm () {

  const {handleSubmit, formState : { isSubmitting }} = useForm<NewJobFormSchemaType>({
    resolver : zodResolver(NewJobFormSchema),
    defaultValues : { 
      device : "",
      price : 0,
      date : new Date(),
      description : "",
    }
  })

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
        className='p-2 resize-none bg-transparent border dark:border-zinc-800 border-zinc-300 rounded-md shadow-md min-h-20'
        placeholder='Descrição relatando os problemas'
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