"use client";

import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Popover } from "antd";
import Link from "next/link";
import AppPadding from "./AppPadding";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Atoms/Button";
import Metamask from "./Metamask";
import { useState } from "react";
import { toast } from "sonner";
import { ethers } from "ethers";
import { addAccount } from "@/store/account";
import CartList from "./CartList";

function Navbar() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const account = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();

  const [isLoadingMetamask, setIsLoadingMetamask] = useState(false);
  const connectToMetamask = async () => {
    const ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      try {
        setIsLoadingMetamask(true);
        // Request access to the users MetaMask accounts
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // Get the connected Ethereum address
        const address = accounts[0];
        // Create an ethers.js provider using the injected provider from MetaMask
        const provider = new ethers.BrowserProvider(ethereum);
        // Get the account balance
        const balance = await provider.getBalance(address);
        // Update state with the results
        dispatch(addAccount({ address, balance: balance.toString() }));
      } catch (error) {
        toast.error("Error To Connected Metamask");
      } finally {
        setIsLoadingMetamask(false);
      }
    } else {
      toast.error("Metamask Not Installed");
    }
  };

  return (
    <nav className="border-b border-gray-300">
      <AppPadding className="flex justify-between items-center h-14 ">
        <Link href="/" className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-accent font-bold text-2xl">
          Shopei
        </Link>
        <div className="flex items-center gap-10">
          {account.address ? (
            <Popover content={<Metamask />} placement="bottom" title="My Account" trigger="click">
              <Button variant="outlined">My Account</Button>
            </Popover>
          ) : (
            <Button disabled={isLoadingMetamask} onClick={connectToMetamask}>
              {isLoadingMetamask ? "Connecting" : "Connect To Metamask"}
            </Button>
          )}
          <Popover content={<CartList />} placement="bottom" title="Cart" trigger="click">
            <Badge count={cart.length}>
              <ShoppingCartOutlined className="text-xl cursor-pointer" />
            </Badge>
          </Popover>
        </div>
      </AppPadding>
    </nav>
  );
}

export default Navbar;
