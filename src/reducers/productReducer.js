
const ProductReducer = (state, action) => {

    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true
            }
        case "SET_API_DATA":

            // featureData contains all prodcuts that have 'featured==true' in API data
            // action.payload containes array of products 
            const featureData = action.payload.filter((curElem) => {
                return curElem.featured === true;
            })

            return {
                ...state,
                isLoading: false,
                products: action.payload,
                featureProducts: featureData
            };


        case "API_ERROR": {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        case "SET_SINGLE_LOADING":
            return {
                ...state,
                isSingleLoading: true,
            };

        case "SET_SINGLE_PRODUCT":
            return {
                ...state,
                isSingleLoading: false,
                singleProduct: action.payload,
            };

        case "SET_SINGLE_ERROR":
            return {
                ...state,
                isSingleLoading: false,
                isError: true,
            };


        case "SET_API_DATA":

            return {
                ...state,
                isLoading: false,
                products: action.payload,
            };
                





        default: {
            return state;
        }

    }

}


// default is used so that ProductReducer can be import via alias name 
export default ProductReducer;