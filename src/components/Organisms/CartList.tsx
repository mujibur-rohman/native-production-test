import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Atoms/Button";
import { DeleteOutlined } from "@ant-design/icons";
import { removeCart } from "@/store/cart";

// Component to display a list of items in the cart
function CartList() {
  // Get the cart items from the Redux store
  const cart = useSelector((state: RootState) => state.cart.cart);
  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col">
      {!cart.length ? (
        // Display message if the cart is empty
        <p className="text-center">Cart Empty</p>
      ) : (
        // Map through the cart items and display each one
        cart.map((c) => (
          <div className="flex gap-3 py-2 border-b last:border-none justify-between items-center" key={c.id}>
            <div className="">
              <p>{c.title}</p> {/* Display item title */}
              <p className="font-medium">{c.category.name}</p> {/* Display item category */}
            </div>
            <Button onClick={() => dispatch(removeCart(c))} size="sm" variant="error">
              <DeleteOutlined /> {/* Button to remove item from cart */}
            </Button>
          </div>
        ))
      )}
    </div>
  );
}

export default CartList;
