import { createContext, useContext, useEffect, useReducer } from "react"
import { useProductContext } from './productContext'
import reducer from "../reducers/filter_reducer"

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,

    // "sorting_value" stores the value of sorting user wants 
    sorting_value : "lowest", 
    filters:{
        text : "",
        category : "all",
        company : "all" ,
        color : "all",
        price : 0 ,
        maxPrice : 0 ,
        minPrice : 0 
    }
}


export const FilterContextProvider = ({ children }) => {

    // products contains all the data , that is provided by useProductContext
    const { products } = useProductContext();

    const [state, dispatch] = useReducer(reducer, initialState);


    // to set the grid view
    const setGridView = () => {
        return dispatch({ type: "SET_GRID_VIEW" });
    };

    // to set the list view
    const setListView = () => {
        return dispatch({ type: "SET_LIST_VIEW" });
    };


    // sorting function that is used in Sort.js 
    const sorting = (event) => {
        let userValue = event.target.value;
        dispatch({ type: "GET_SORT_VALUE", payload: userValue });
    };


    const clearFilters = ()=>{
        dispatch({type : "CLEAR_FILTERS" })
    }

    // This effect is used when u want to show data according to the sorting 
    // To get this , we have to re-render the page 
    useEffect(()=>{
        dispatch({type : "FILTERS_PRODUCTS" });

        dispatch({type: "SORTING_PRODUCTS", payload : products});
    },[ products , state.sorting_value , state.filters ])


    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products })
        // [products] when any change occur then it triggers useEffect hook
    }, [products]);

     
    // ------------------- FilterValue -----------------------------------------------


    // Update filter values
    const updateFilterValue = (event) =>{
        let name = event.target.name ;
        let value = event.target.value ;
        dispatch({type: "UPDATE_FILTERS_VALUE" , payload : {name ,value}})
      }








    return (
        <FilterContext.Provider value={{
            ...state,
            setListView,
            setGridView,
            sorting,
            updateFilterValue,
            clearFilters,
        }} >
            {children}
        </FilterContext.Provider>
    )
}

// Custum hooks for --> to not import context everywhere

export const useFilterContext = () => {
    return useContext(FilterContext);
}