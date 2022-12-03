const INITIAL_STATE = {
  account: {
    _id: "",
    token: "",
    username: "",
    // name: "",
    // createdAt: "",
  },
  islogin: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_USER_LOGIN_SUCCES":
      console.log(action);
      return {
        ...state,
       
        account: {
          id: action?.payload?.data?.data?._id,
          token: action?.payload?.data?.data?.token,
          username: action?.payload?.data?.data?.username,

          //   name: action.payload.data.data.id,
          //   createdAt: action.payload.data.data.id,
        },
        islogin: true,
      };

    default:
      return state;
  }
};

export default userReducer;
