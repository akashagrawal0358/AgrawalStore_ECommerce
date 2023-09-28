
const filterReducer = (state, action) => {

  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS": {

      //  To get price of each item
      let priceArr = action.payload.map((curElem) => curElem.price);
      // console.log( priceArr);

      let maxPrice = Math.max(...priceArr);
      //  console.log(maxPrice);

      return {
        ...state,
        // [ ...action.payload]  is a copy of original data , not affect org. data
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };
    }
    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    // Sorting Function 
    case "GET_SORT_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
      };

    // ------------------------ SORTING_PRODUCTS ---------------------------------


    case "SORTING_PRODUCTS":
      let newSortData;

      // let tempSortProduct = [...action.payload];


      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }

        if (sorting_value === "highest") {
          return b.price - a.price;
        }

        if (sorting_value === "a-z") {
          // this sort the data in ascending 
          return a.name.localeCompare(b.name);
        }

        if (sorting_value === "z-a") {
          // decending
          return b.name.localeCompare(a.name);
        }
      };

      newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filter_products: newSortData,
      };


    // ------------------------- UPDATE_FILTERS_VALUE --------------------------------


    case "UPDATE_FILTERS_VALUE": {
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value
        }
      }
    }

    case "FILTERS_PRODUCTS": {
      let { all_products } = state;
      // tempFilterProduct --> stores reference of all_products so that we not change original data
      let tempFilterProduct = [...all_products];

      // text is in filterSection, used to refer 
      const { text, category, company, color, price } = state.filters;


      // if text changes then executes 
      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text);
        })
      }



      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.category === category;
        })
      }


      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.company === company;
        })
      }


      if (color !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) =>
          curElem.colors.includes(color)
        );
      }


      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter((curElem) =>
          curElem.price === price
        );
      } else {
        tempFilterProduct = tempFilterProduct.filter((curElem) =>
          curElem.price <= price
        );
      }


      return {
        ...state,
        filter_products: tempFilterProduct,
      }
    }

    
    // ------------------------------- CLEAR_FILTERS ------------------------------------------


    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          company: "all",
          color: "all",
          maxPrice: 0,
          price: state.filters.maxPrice,
          minPrice: state.filters.maxPrice,
        },
      };




    default:
      return state
  }

}



export default filterReducer;