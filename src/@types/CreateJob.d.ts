import { z } from "zod"

export interface UsersProperties {  
  id : string
  name : string
  cpf : string
}

export const NewJobFormSchema = z.object({
  device : z.string(),
  price : z.number(),
  date : z.date(),
  description : z.string(),

})

export type NewJobFormSchemaType = z.infer<typeof NewJobFormSchema>
