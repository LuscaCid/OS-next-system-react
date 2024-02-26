
## annotations 

````js

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface PostsProps {
  slug : string
  title : string
  date : string
}

const FormSchema = z.object({
  title : z.string(),
  slug : z.string()
})
type FormType = z.infer<typeof FormSchema>
export default function Home (){
  const queryClient = useQueryClient()
  const {register, handleSubmit, reset} = useForm({
    resolver : zodResolver(FormSchema),
    defaultValues: {
      title: '',
      slug: ''
    }
  })

  const {data : postsFetched , isLoading, isError} = useQuery({
    queryFn : () => {
      console.log('fetched')
      return fetchPosts()
    },
    queryKey : ["home"],
    staleTime : Infinity
  });

  const { mutateAsync : addPostMutation } = useMutation({
    mutationFn : addPost,
    onSuccess : (_, variables) => {
      queryClient.invalidateQueries({queryKey : ['home']})
      //outra abordagem é setar o cache nesta funcao de onSuccess
      queryClient.setQueryData(["home"], (state) =>{
         return [...state, {
           date : variables.date,
           slug : variables.slug,
           tilte : variables.title
        }]
      })

},
    onError : () => {
      alert('try again later')
    } 
  })

  async function addPost(newPost : PostsProps) {
    const response = await fetch('http://localhost:3000/posts', {
      method : "POST",
      body : JSON.stringify(newPost)
    })
    const data = await response.json()
    return data
  }

  async function fetchPosts() {
    const response = await fetch('http://localhost:3000/posts')
    const posts : PostsProps[] = await response.json()
    return posts
  }
  async function handleSubmitByUser (data : FormType){
    const newPost : PostsProps = { 
      date : new Date().toISOString(),
      slug : data.slug,
      title : data.title  
    }
    const res = await addPostMutation(newPost)
    console.log(res)
    reset()
  }  

  if(isLoading) {
    return (
      <h1>
        Carregando...
      </h1>
    )
  }

  if(isError) {
    return (
      <h1>a Error was Ocurred when fetching</h1>
    )
  }
  return (
    <div className='w-fit m-auto rounded-md bg-zinc-200 p-2 flex  gap-2'>
 
      {
        postsFetched!.map((post : PostsProps) => (
          <div className='flex flex-col gap-2 rounded-sm bg-zinc-400 p-2' key={post.title}>
            <h1 className='text-zinc-900'>{post.title}</h1>
            <p className='text-zinc-600'>{post.slug}</p>
            <p className='text-zinc-400'>{post.date}</p>
          </div>
        ))
      }
      <form 
      className='flex flex-col gap-2'
      onSubmit={handleSubmit(handleSubmitByUser)}>
        <input 
          type="text" 
          {...register('title')}
          />
        <input 
          type="text" 
          {...register('slug')}
          />
        <button 
        type='submit'>
          Send
        </button>
      </form>
    </div>
  )
}
````