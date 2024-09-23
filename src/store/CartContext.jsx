
import { createContext, useReducer } from "react";

 const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

function cartReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id)
        
        const updatedItems = [...state.items];

        if(existingCartItemIndex > -1){   
            const updatedItem = {
                ...state.items[existingCartItemIndex],
                quantity: state.items[existingCartItemIndex].quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems.push({ ...action.item, quantity:1});
        }
        return {...state, items:updatedItems}
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id // Use action.id here
        );
    
        if (existingCartItemIndex === -1) {
            console.warn("Item not found in cart for removal: ", action.id);
            return state;
        }
    
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
    
        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
    
        return { ...state, items: updatedItems };
    }

    if(action.type === 'CLEAR'){
        return {...state, items:[]};
    }

    return state;
}

export function CartContextProvider({children}) {
    const [cart, dispacthCartAction] = useReducer(cartReducer, {items:[]});

    function addItem(item){
        dispacthCartAction({
            type:"ADD_ITEM",
            item
        })
    }

    function removeItem(id){
        dispacthCartAction({
            type:"REMOVE_ITEM",
            id
        })
    }

    function clearCart(){
        dispacthCartAction({
            type:'CLEAR'
        })
    }
    
    

    const cartContext = {
        items : cart.items,
        addItem,
        removeItem,
        clearCart
    }

    console.log(cartContext)

    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
}

export default CartContext;