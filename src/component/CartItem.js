import FormatPrice from "../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../contexts/cartContext";

const CartItem = ({ id, name, image, color, price, amount }) => {

    const { removeItem, setDecrease, setIncrement } = useCartContext();

    // const setDecrease = () => {
    //   amount > 1 ? setAmounts(amount - 1) : setAmounts(1);
    // };

    // const setIncrease = () => {
    //   amount < stock ? setAmounts(amount + 1) : setAmounts(stock);
    // };

    return (
        <div className="cart_heading grid grid-five-column">

        {/* Name Column -------------------------------------------------------  */}

            <div className="cart-image--name">
                <div>
                    <figure>
                        <img src={image} alt={id} />
                    </figure>
                </div>
                <div>
                    <p>{name}</p>
                    <div className="color-div">
                        <p>color:</p>
                        <div
                            className="color-style"
                            style={{ backgroundColor: color, color: color }}></div>
                    </div>
                </div>
            </div>


        {/* price Column -----------------------------------------------------  */}


            <div className="cart-hide">
                <p>
                    <FormatPrice price={price} />
                </p>
            </div>


        {/* Quantity Column ---------------------------------------------------  */}


            <CartAmountToggle
                amount={amount}
                // id is passed to uniquely identify cart item
                setDecrease={() => setDecrease(id)}
                setIncrease={() => setIncrement(id)}
            />


        {/* Subtotal Column ------------------------------------------------------------ */}


            <div className="cart-hide">
                <p>
                    <FormatPrice price={price * amount} />
                </p>
            </div>



        {/* RemoveItem Column ------------------------------------------------------------ */}

           
            <div>
                 {/* Pass Unique Id of the item to get remove ---------*/}
                <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
            </div>
        </div>
    );
};

export default CartItem;