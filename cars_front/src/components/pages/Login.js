import React, { useContext, useState } from 'react';
import { cars_context } from './../../utils/cars_repository_context';
import { cars_url } from './../../utils/constants';



const Login = () => {
    const { login, changePage, login_submit } = useContext(cars_context)
    const [reason, set_reason] = useState("");
    const loginvalue = React.createRef();
    const password = React.createRef();
    let status = React.createRef();

    const login_handle = async (event) => {
        event.preventDefault(0);
        let user = {
            login: loginvalue.current.value,
            password: password.current.value
        }
        status = await login_submit(user);
        if (status === true) login(user, "Show available cars");
        else set_reason("Cannot get response from -> " + cars_url + "login");
    }
    return (
        <form className='col-12
            bg-dark 
            text-light 
            rounded border
            border-light 
            text-start m-0'
            onSubmit={(e) => login_handle(e)}>
            <div className='input-group-mb-2'>
                <label className='bg-secondary rounded border' htmlFor='login'>login: </label>
                <input required={true} className='rounded' name='login' placeholder='login' ref={loginvalue}></input>
            </div>
            <div className='input-group-mb-2'>
                <label className='bg-secondary rounded border' htmlFor='current-password'>password: </label>
                <input required={true} type='password' className='rounded' name='current-password' placeholder='password' ref={password}></input>
            </div>
            <button className='btn btn-success border border-light h-20' type='submit'>login</button>
            <button className='btn btn-danger text-light border border-light h-20' onClick={() => changePage('Register')}>register</button>
            <p>{reason}</p>
        </form>
    );
}

export default Login;
