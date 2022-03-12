import { useReducer } from "react";
import { produce } from "immer";
import { getDataBydocId, getDataByField } from "./firebase";

export const initialState = {
  uid: 0,
  user: {
    firstname: "",
    lastname: "",
  },
  postCode: {
    id: 0,
    title: "",
    comment: "",
    lang: "",
    category: "",
    code: `
      import React, { useState } from "react";
      function Example() {
        const [count, setCount] = useState(0);
        return (
          <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button> <button onClick={() => setCount(count + 1)}>Click me</button>
            </div>
        );
      }
      `,
  },
};

const reducer = async (state = initialState, action) => {
  switch (action.type) {
    case "login":
      const mdata = await getDataBydocId("users", action.payload);
      return produce(state, (draft) => {
        draft.user = mdata;
      });

    case "1":

    default:
      return {};
  }
};

export default reducer;
