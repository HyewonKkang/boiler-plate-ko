import {
    LOGIN_USER, REGISTER_USER
} from '../_actions/types'

export default function (state={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload } // ...은 그대로 가져옴을 의미
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload } // ...은 그대로 가져옴을 의미
            break;
        default:
            return state;
    }
}