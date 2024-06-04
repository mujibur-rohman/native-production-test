import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Atoms/Button";
import { removeAccount } from "@/store/account";

type Props = {};

function Metamask({}: Props) {
  const account = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();
  return (
    <div className="space-y-2">
      <p>Address : {account.address}</p>
      <p>Balance : {account.balance}</p>
      <Button variant="error" onClick={() => dispatch(removeAccount())}>
        Disconnect
      </Button>
    </div>
  );
}

export default Metamask;
