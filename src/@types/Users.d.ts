export interface ClientDataFromBackend {
    id : string
    name : string
    email : string
    cpf : string
    created_at : string
    updated_at : string
    address : string
    phone : string
    address : {
        street : string
        number : string
        complement : string
        district : string
        city : string
        state : string
        zipcode : string
    }
}

export interface ClientDataRendering  {
    id? : string
    name : string
    email : string
    created_at : string
    phone : string
}