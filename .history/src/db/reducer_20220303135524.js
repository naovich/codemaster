import { useReducer } from "react";
import { produce } from "immer";
import { BadgeMark } from "@mui/material";

export const initialState = {};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "0":
      return produce(state, (draft) => {
        draft.uid = 0;
      });

    case "1":
      break;
  }
};
