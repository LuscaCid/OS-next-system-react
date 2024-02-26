import { z } from "zod"

export interface UsersProperties {  
  id : string
  name : string
  cpf : string
}

export const NewJobFormSchema = z.object({
  device : z.string(),
  price : z.string(),
  tag : z.string(),
  description : z.string(),

})

export type AddNewJobMutationType = {
  device: string;
  price: string;
  tag: string;
  description: string;
  userSelected : UsersProperties
}

export type NewJobFormSchemaType = z.infer<typeof NewJobFormSchema>
