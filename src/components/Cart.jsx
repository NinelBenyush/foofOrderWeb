import { useContext } from "react"
import Modal from "./UI/Modal.jsx"
import CartContext from "../store/CartContext"
import { currencyFormat } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";
import Checkout from "./Checkout.jsx";

export default function Cart(){
    const carCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const total = carCtx.items.reduce((totalPrice, item) => 
        totalPrice+ item.quantity* item.price, 0)

    function handleCloseCart(){
        userProgressCtx.hideCart();
    }

    function handleGoToCheck(){
        userProgressCtx.showCheckout();
    }


    return (
        <Modal className="cart" 
        open={userProgressCtx.progress === 'cart'} 
        onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}    >
            <h2>your cart</h2>
            <ul>
                {carCtx.items.map((item) => (
                    <CartItem 
                    key={item.id} 
                    name={item.name} 
                    quantity={item.quantity} 
                    price={item.price}
                    onIncrease={() => carCtx.addItem(item)}
                    onDecrease={() => carCtx.removeItem(item.id)}
                     />
              )  )}
            </ul>
            <p className="cart-total">{currencyFormat.format(total)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {carCtx.items.length >0 ? 
                ( <Button onClick={handleGoToCheck}>Go to checkout</Button>)
                : null}
               
            </p>
        </Modal>
    )
}