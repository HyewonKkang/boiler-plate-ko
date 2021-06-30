import { combineReducers } from "redux";
import user from './user_reducer';

const rootReducer = combineReducers({ // 여러 reducer를 묶어줌
    user
})

export default rootReducer;