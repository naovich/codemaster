import { useReducer } from "react";
import { produce } from "immer";
import { getDataBydocId, getDataByField } from "./firebase";

export const initialState = {
  uid: 0,
  user: {
    firstname: "",
    lastname: "",
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
