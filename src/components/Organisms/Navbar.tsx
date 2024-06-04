"use client";

import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Popover } from "antd";
import Link from "next/link";
import AppPadding from "./AppPadding";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Atoms/Button";
import { removeCart } from "@/store/cart";

function Navbar() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const contentCart = (
    <div className="flex flex-col">
      {!cart.length ? (
        <p className="text-center">Cart Empty</p>
      ) : (
        cart.map((c) => (
          <div className="flex gap-3 py-2 border-b last:border-none justify-between items-center" key={c.id}>
            <div className="">
              <p>{c.title}</p>
              <p className="font-medium">{c.category.name}</p>
            </div>
            <Button onClick={() => dispatch(removeCart(c))} size="sm" variant="error">
              <DeleteOutlined />
            </Button>
          </div>
        ))
      )}
    </div>
  );

  return (
    <nav className="border-b border-gray-300">
      <AppPadding className="flex justify-between items-center h-14 ">
        <Link href="/" className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-accent font-bold text-2xl">
          Shopei
        </Link>
        <Popover content={contentCart} placement="bottom" title="Cart" trigger="click">
          <Badge count={cart.length}>
            <ShoppingCartOutlined className="text-xl cursor-pointer" />
          </Badge>
        </Popover>
      </AppPadding>
    </nav>
  );
}

export default Navbar;
