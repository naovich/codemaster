import { useReducer } from "react";
import { produce } from "immer";

export const initialState = {
  uid: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return produce(state, (draft) => {
        draft.uid = 0;
      });

    case "1":

    default:
      return {};
  }
};

export default reducer;
