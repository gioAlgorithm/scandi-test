
import { useQuery, gql } from "@apollo/client"

// data from graphql
const GET_CURRENCY = gql`


query {
  currencies{
    label
    symbol
  }
}



`

export const useCurrency = ()=>{
    const {error, data} = useQuery(GET_CURRENCY )
    return{
        error, data
    }
}