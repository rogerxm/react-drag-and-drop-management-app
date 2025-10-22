import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { type RootState } from "./store/store";
import { increment } from "./store/userSlice";

function App() {
  const count = useSelector((state: RootState) => state.users.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <button onClick={() => dispatch(increment())}>Incrementar</button>
        <span>{count}</span>
      </div>
    </>
  );
}

export default App;
