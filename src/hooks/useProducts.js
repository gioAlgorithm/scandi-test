
import { useQuery, gql } from "@apollo/client"

// data from graphql
const GET_PRODUCTS = gql`


query {
  categories{
    name
    products{
      id
      gallery
      name
      inStock
      prices{
        currency{
					symbol
          label
        }
				amount
      }
    }
  }
}



`

export const useProducts = ()=>{
    const {error, data} = useQuery(GET_PRODUCTS )
    return{
        error, data
    }
}