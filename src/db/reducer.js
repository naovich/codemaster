import { produce } from "immer";
import { getDataBydocId } from "./firebase";

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
    code: "",
  },
};

const reducer = async (state = initialState, action) => {
  switch (action.type) {
    case "login":
      const mdata = await getDataBydocId("users", action.payload);
      return produce(state, (draft) => {
        draft.user = mdata;
      });

    case "post":
      const post = await getDataBydocId("codes", action.payload);
      return produce(state, (draft) => {
        draft.postCode = post;
      });

    default:
      return {};
  }
};

export default reducer;
