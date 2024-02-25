export interface IHistoryData {
  id  : string
  client_id : string
  arrived_at : string
  customer_name : string
  description : string
  tag : string
  device : string
}

export interface IRenderHistoryProps {
  arrived_at : string
  customer_name : string
  description : string
  tag : string
  device : string
}