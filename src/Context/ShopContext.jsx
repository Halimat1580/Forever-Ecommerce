import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) =>  {
    const currency ='$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // console.log("Backend URL:", backendUrl);
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false)
    const [cartItems,setCartItems] = useState({});
    const [products, setProducts] = useState([]);
   
    const [token, setToken] = useState('');
    const navigate = useNavigate ();

    const addToCart = async (itemId,size) => {

        if (!size) {
            toast.error('select product size')
            return;
        }
   
         let cartData = structuredClone(cartItems);

         if(cartData[itemId]) {
          if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
          }
          else{
            cartData[itemId][size] = 1;
          }
         }
         else{
            cartData[itemId] = {};
            cartData[itemId][size] =  1;
         }
         setCartItems(cartData);

         if (token) {
            try {
                
                await axios.post(backendUrl + '/api/cart/add', {itemId,size}, {headers:{token}})
            } catch (error) {
                console.log(error);

                toast.error(error.message)
            }
         }
         
        }

    

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }

        return totalCount;
    }

   const updateQuantity = async (itemId,size,quantity) => {
    let cartData = structuredClone(cartItems);
    cartData [itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
        try {
            await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers : {token}})
        } catch (error) {
            console.log(error);

            toast.error(error.message)
        }
    }


   }

   const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems) {
        let itemInfo = products.find((product)=> product._id === items);
        for(const item in cartItems[items]){
            try {
                if (cartItems[items][item]> 0) {
                     totalAmount += itemInfo.price * cartItems[items][item];
                }
            } catch (error){

            }
        }
    }
    return totalAmount;
   }

   const getProductsData = async () => {
    try {

        const response = await axios.get(backendUrl + '/api/product/list')
        
        if(response.data.success){
            setProducts(response.data.products)
        } else {
            toast.error(response.data.response )
        }
        

      
        
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
   };

   const getUserCart = async ( token ) => {
    try {
         const response = await axios.post(backendUrl + '/api/cart/get', {},{headers:{token}})
         if (response.data.success) {
            setCartItems(response.data.cartData)
         }


    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
   }

   useEffect(() => {
    getProductsData();
}, []);

useEffect(()=>{
    if (!token && localStorage.getItem('token')) {
        setToken (localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
    }
    
        
    },[])

   


    const value = {
        products, setCartItems,  currency,  delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,setCartItems,
        getCartCount,updateQuantity,
        getCartAmount, navigate,  backendUrl,
        setToken, token

    };
       
    return (
        <ShopContext.Provider value={value}>
            {props.children}

        </ShopContext.Provider>
    )
}


export default ShopContextProvider;



















// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//     const currency = "$";
//     const delivery_fee = 10;
//     const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure this is defined in your .env file
//     const [search, setSearch] = useState("");
//     const [showSearch, setShowSearch] = useState(false);
//     const [cartItems, setCartItems] = useState({});
//     const [products, setProducts] = useState([]);
//     const navigate = useNavigate();

//     const addToCart = async (itemId, size) => {
//         if (!size) {
//             toast.error("Please select a product size.");
//             return;
//         }

//         const cartData = structuredClone(cartItems);

//         if (cartData[itemId]) {
//             if (cartData[itemId][size]) {
//                 cartData[itemId][size] += 1;
//             } else {
//                 cartData[itemId][size] = 1;
//             }
//         } else {
//             cartData[itemId] = { [size]: 1 };
//         }

//         setCartItems(cartData);
//     };

//     const getCartCount = () => {
//         let totalCount = 0;
//         for (const items in cartItems) {
//             for (const item in cartItems[items]) {
//                 if (cartItems[items][item] > 0) {
//                     totalCount += cartItems[items][item];
//                 }
//             }
//         }
//         return totalCount;
//     };

//     const updateQuantity = (itemId, size, quantity) => {
//         const cartData = structuredClone(cartItems);
//         cartData[itemId][size] = quantity;
//         setCartItems(cartData);
//     };

//     const getCartAmount = () => {
//         let totalAmount = 0;
//         for (const items in cartItems) {
//             const itemInfo = products.find((product) => product._id === items);
//             if (!itemInfo) continue; // Skip if product info is missing

//             for (const item in cartItems[items]) {
//                 if (cartItems[items][item] > 0) {
//                     totalAmount += itemInfo.price * cartItems[items][item];
//                 }
//             }
//         }
//         return totalAmount;
//     };

//     const getProductsData = async () => {
//         try {
//             console.log("Fetching products from:", backendUrl + "/api/product/list");
//             const response = await axios.get(`${backendUrl}/api/product/list`);

//             if (response.data.success) {
//                 setProducts(response.data.products);
//             } else {
//                 toast.error(response.data.message || "Failed to fetch products.");
//             }
//         } catch (error) {
//             console.error("Error fetching products:", error.response || error.message);
//             toast.error(error.response?.data?.message || "An error occurred while fetching products.");
//         }
//     };

//     useEffect(() => {
//         if (!backendUrl) {
//             console.error("Backend URL is not defined. Check your environment variables.");
//             toast.error("Backend URL is not configured.");
//             return;
//         }

//         getProductsData();
//     }, []);

//     const value = {
//         products,
//         currency,
//         delivery_fee,
//         search,
//         setSearch,
//         showSearch,
//         setShowSearch,
//         cartItems,
//         addToCart,
//         getCartCount,
//         updateQuantity,
//         getCartAmount,
//         navigate,
//         backendUrl,
//     };

//     return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
// };

// export default ShopContextProvider;
