import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState(""); // 상태 변화 (props x)
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => { // 입력 시 따라쳐지도록
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // page refresh 방지

        let body = {
            email: Email,
            password: Password
        }
        
        // Redux 사용방식
        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess) {
                props.history.push('/')
            }
        })
    }

   return (
    <div style={{
        display:'flex', justifyContent:'center', alignItems:'center'
        , width: '100%', height:'100vh'
    }}>
        <form style={{display:'flex', flexDirection:'column'}}
            onSubmit={onSubmitHandler}
        >
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler}/> 
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler}/>
            <br />
            <button type="submit">
                Login
            </button>
        </form>
    </div>
   )
}

export default LoginPage
