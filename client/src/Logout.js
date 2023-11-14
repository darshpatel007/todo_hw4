import React, { useContext } from "react";
import { StateContext } from "./Contexts";

export default function Logout() {
  const { state, dispatch } = useContext(StateContext);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <p>
        Logged In As: <b>{state.user}</b>
      </p>
      <input
        type="submit"
        value="Log Out"
        onClick={() => dispatch({ type: "LOGOUT" })}
      />
    </form>
  );
}
