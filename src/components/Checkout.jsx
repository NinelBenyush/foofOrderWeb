import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext";
import { currencyFormat } from "../util/formatting";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const reqConfig = {
    method:'POST',
    headers:{
        'Content-Type' :'application/json'
    },
};

export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);

    const {data, loading, error, sendReq, clearData} =  useHttp('http://localhost:3000/orders', reqConfig);

    const total = cartCtx.items.reduce((totalPrice, item) => 
        totalPrice+ item.quantity* item.price, 0)

    function handleClose(){
        userCtx.hideCheckout();
    }

    function handleFinish(){
        userCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event){
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendReq(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        )
    }

    let actions = ( <>
    <Button textOnly type="button" onClick={handleClose} >Close</Button>
        <Button> Submit Order</Button> 
        </>);
    
    if(loading){
        actions = <span>Sending order data...</span>
    }

    if(data && !error) {
        return <Modal open={userCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted</p>
            <p className="modal-actions">
                <Button onClick={handleClose} >Okay</Button>
            </p>

        </Modal>
    }


    return (
        <Modal open={userCtx.progress === 'checkout'} onClose={handleClose} >
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormat.format(total)}</p>
                <Input label='Full Name' type="text" id="name" />
                <Input label="E-mail Adress" id="email" type="email" />
                <Input label="Street" id='street' type="text" />

                <div className="control-row">
                <Input label="Postal Code" id="postal-code" type="text" />
                <Input label="City" id="city" type="text" />
                </div>

                {error && <Error title="failed to submit order" mess={error} />}

                <p className="modal-actions">
                    {actions}
                </p>

            </form>

        </Modal>
    )
}