import { createContext, useContext, useReducer, useEffect } from "react";
import axios from 'axios';
// productReducer as reducer 
import reducer from '../reducers/productReducer'


const API = "https://api.pujakaitem.com/api/products";
const AppContext = createContext();

const initialState = {
   isLoading : false,
   isError : false ,

   // products is in form of arrays of objects
   products : [] ,
   featureProducts : [],
   isSingleLoading : false,
   singleProduct : {} , 
   // We only want single Product which is in form of object -> so use '{}'
}



const AppProvider = ({children})=>{
    
   // It returns two elements of an array 
   // productReducer as reducer 
   const [state, dispatch] = useReducer(reducer, initialState ) ;
   
   
   // url parameter receives API 
    const getProducts = async (url)=>{

      dispatch({type : "SET_LOADING" });

       try{
       // Store API data in res 
        const res = await axios.get(url) ;

        // data is an array of products in API
        const products = await res.data ;
        // console.log(products); 
         
        // payload means what you need to complete this operation
        dispatch({type : "SET_API_DATA" , payload : products});
       }
       catch(error){
         dispatch({type: "API_ERROR"})
       }
    }
   
   

   //-------- 2nd API call to get data for single Product ---------------


   //  Pass getSingleProduct in <AppContext.Provider value={{...state , getSingleProduct}}>
   const getSingleProduct = async (url)=>{
      dispatch({type : "SET_SINGLE_LOADING" });
      try{
         const res = await axios.get(url) ;
         const singleProduct = await res.data ;
         console.log(singleProduct);
         dispatch({type : "SET_SINGLE_PRODUCT" , payload : singleProduct});
      }
      catch(error){
         dispatch({type : "SET_SINGLE_ERROR"});
      }
   }


     

    // We already have the data automatically when we refresh the page 
    // To get this every time i use --> useEffect hook
    
    useEffect(()=>{
      // We pass API to getProducts() i.e above defined
      getProducts(API) ;
   },[]);




    
    return (<AppContext.Provider value={{...state , getSingleProduct}}>
         {children}
    </AppContext.Provider> 
   );
};

// Custom Hooks 

const useProductContext = ()=>{
    return useContext(AppContext) ;
}

export { AppProvider , AppContext, useProductContext } ;