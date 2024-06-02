import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import Link from "next/link";
import AppPadding from "./AppPadding";

type Props = {};

function Navbar({}: Props) {
  return (
    <nav className="border-b border-gray-300">
      <AppPadding className="flex justify-between items-center h-14 ">
        <Link href="/" className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-accent font-bold text-2xl">
          Shopei
        </Link>
        <Badge count={5}>
          <ShoppingCartOutlined className="text-xl cursor-pointer" />
        </Badge>
      </AppPadding>
    </nav>
  );
}

export default Navbar;
