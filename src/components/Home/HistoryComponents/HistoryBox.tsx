import { IRenderHistoryProps } from '@/@types/HistoryData'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export function HistoryBox({ customer_name,description,arrived_at,device, tag} : IRenderHistoryProps){
    
    const formattedDate = formatDistanceToNow(arrived_at, {
        addSuffix : true,
        locale : ptBR 
    })

    let formattedDescription = description?.slice(0,80)
    formattedDescription = formattedDescription + '...'
    return (
        <div className='flex flex-col gap-2 p-2 bg-transparent border dark:border-zinc-800  border-zinc-300 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800/80 transtion duration-200 shadow-md'>
            <header className='flex justify-between items-center'>
                <strong className='text-zinc-950 font-bold text-lg dark:text-zinc-200'>{customer_name}</strong> 
                <span className='text-sm font-medium text-zinc-600 dark:text-zinc-400'>{formattedDate}</span>
            </header>
            <h1 className='font-semibold text-md text-zinc-800 dark:text-zinc-300'>{device}</h1>
            <span className='text-zinc-600 dark:text-zinc-400 font-semibold'>
                {formattedDescription}
            </span>
            <footer className='w-fit px-2 py-1 bg-zinc-950 dark:bg-zinc-200  dark:text-zinc-950 font-bold text-zinc-100 rounded-md cursor-pointer'>
                {tag}
            </footer>
        </div>
    )
}