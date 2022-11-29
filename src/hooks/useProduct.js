import { useQuery, gql } from "@apollo/client"

// data from graphql
const GET_PRODUCT = gql`


query GetProduct($id: String!){
  product(id: $id){
    	id
			name
    	inStock
      gallery
    	description
    	category
    	brand
      prices{
				amount
        currency{
        	label  
          symbol
				}
      }
    	attributes{
				id
        name
        type
        items{
					displayValue
          value
          id
        }
      }
    }
  
}

`
// getting product by id
export const useProduct = (id)=>{
    
    const {error, data} = useQuery(GET_PRODUCT,{
      variables:{
        id
      }
    } )

    return{
        error, data
    }
    
}