import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import l from "../assets/oneLogo.svg";

export default function Header(){
    const carCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = carCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems +item.quantity;
    },0)

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header" >
            <div id="title">
            <img src={l} alt='logo' />
            <h1 >ORDER-FOOD</h1>
            </div>
            <nav>
            <Button textOnly onClick={handleShowCart} >Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}