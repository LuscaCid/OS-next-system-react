
import { Coins, Smartphone, PenBox, PenLine} from 'lucide-react'
import Input from "../CreateJobComponents/Input";
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { NewJobFormSchema, NewJobFormSchemaType } from '../../../@types/CreateJob.d';
import { SelectClientSection } from './SelectClientSection';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IHistoryData } from '@/@types/HistoryData';
import { AddNewJob, GenCacheObject, generateObjectToSend } from '../../../Functions/newJobFunctions';
import { NewJobFormReducerObject } from "../../../reducers/NewJobForm";

export function NewJobForm () {

  const { 
    userSelected,
    handleSelectUser,
    handleRemoveUserSelected 
  } = NewJobFormReducerObject()
 
  const newJobFormProps = useForm<NewJobFormSchemaType>({
    resolver : zodResolver(NewJobFormSchema),
    defaultValues : { 
      device : "",
      description : "",
    }
  })
  //form provider to inputs and handle submit form

  const {handleSubmit, reset, register} = newJobFormProps

  const queryClient = useQueryClient()

  const { mutateAsync: addNewJobMutation } = useMutation({
    mutationFn : AddNewJob,
    onSuccess : (_ ,variables) => {
      queryClient.setQueryData(['history'], 
      (state : IHistoryData []) => [GenCacheObject(variables), ...state ])
      reset()
    }
  })
  
  async function handleSubmitForm(data : NewJobFormSchemaType) {
    const isAllFilled = data.description && data.tag && data.device && data.price
    const newJobMutationObject = generateObjectToSend(data, userSelected)

    if(isAllFilled && userSelected?.name) {
      await addNewJobMutation(newJobMutationObject)
      handleRemoveUserSelected()
    }
    else return alert('todos os campos do formulario precisam ser preenchidos!')
  }
  return (
    <FormProvider {...newJobFormProps}>
      <form 
        onSubmit={handleSubmit(handleSubmitForm)}
        className=" border flex-1 border-zinc-300 dark:border-zinc-800/80 rounded-md m-2 flex flex-col gap-1"
      >
      <h1 
        className='border-b p-1 dark:text-zinc-300 dark:border-zinc-800 border-zinc-300 w-full pb-1 text-xl text-zinc-800 font-bold  flex justify-between items-center'>
        Create a new Job <PenBox size={32} />
      </h1>
      
      <Input 
        IType="text"
        icon={Smartphone}
        input_name='device'
        input_placeholder='Nome do dispositivo'

      />
      <Input 
        IType="text"
        icon={Coins}
        input_name='price'
        input_placeholder='Valor do conserto'
        
      />
      <Input 
        IType="text"
        icon={Coins}
        input_name='tag'
        input_placeholder='Dê uma tag'
        
      />
      <textarea 
        className='p-2 mx-2 resize-none bg-transparent border dark:border-zinc-800 border-zinc-300 rounded-md shadow-md min-h-20'
        placeholder='Descrição relatando os problemas'
        {...register('description')}
      />

      <SelectClientSection 
        selectedUser={userSelected}
        handleSelectUser={handleSelectUser}
        handleRemoveSelectedUser={handleRemoveUserSelected}
      />
      <button 
        type='submit'
        className=' disabled:opacity-5 m-2 disabled:cursor-not-allowed flex items-center justify-center bg-transparent text-zinc-950 dark:text-zinc-300 rounded-md p-2 flex-end hover:bg-zinc-200  dark:hover:bg-zinc-800/90 transition duration-200 border dark:border-zinc-800 border-zinc-300  shadow-lg'
      >
        <PenLine size={24} /> Generate
      </button> 

    </form>
    </FormProvider>
    

  )
}