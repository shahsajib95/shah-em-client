import { userData, userLoading } from "./reducer";

export const userLoggedIn = (data) => async (dispatch) => {
    dispatch(loadingUser(true))
    dispatch(userData(data));
    dispatch(loadingUser(false))
};

export const loadingUser = (data) => async (dispatch) => {
    dispatch(userLoading(data));
  };
