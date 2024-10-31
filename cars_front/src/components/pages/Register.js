import React, { useContext } from 'react';
import { cars_context } from './../../utils/cars_repository_context';
import { cars_url } from './../../utils/constants';


const Register = () => {
    const { login, changePage } = useContext(cars_context);
    const userName = React.createRef();
    const seconduserName = React.createRef();
    const mail = React.createRef();
    const loginvalue = React.createRef();
    const password = React.createRef();
    let status = React.createRef();
    const login_submit = async (event) => {
        event.preventDefault(0);
        let user = {
            name: userName.current.value,
            secondname: seconduserName.current.value,
            mail: mail.current.value,
            login: loginvalue.current.value,
            password: password.current.value,
            price: 10000
        }
        const url = cars_url + "register";
        await fetch((url), {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            method: "POST",
            body: JSON.stringify(user)
        }).then(response => response.json()).then(data => user.driver_id = data.driver_id).catch(() => status = false)
        if (status) login(user, 'Show all cars');
    }
    return (
        <form className='col-12 bg-dark 
            text-light rounded border border-light 
            text-start p-2 align-self-start' onSubmit={(e) => login_submit(e)}>
            <div className='input-group-mb-2'>
                <label className='bg-secondary rounded border' htmlFor='userName'>User name: </label>
                <input required={true} className='rounded' name='userName' placeholder='user name' ref={userName}></input>
            </div>
            <div className='input-group-mb-2'>
                <label className='bg-secondary rounded border' htmlFor='secondname'>Second name: </label>
                <input required={true} className='rounded' name='secondname' placeholder='second name' ref={seconduserName}></input>
            </div>
            <div className='input-group-mb-2'>
                <label className='bg-secondary rounded border' htmlFor='mail'>Mail: </label>
                <input required={true} type='email' className='rounded' name='mail' placeholder='example@dow.il' ref={mail}></input>
            </div>
            <div className='input-group-mb-2'>
                <label className='bg-secondary rounded border' htmlFor='login'>login: </label>
                <input required={true} className='rounded' name='login' placeholder='login' ref={loginvalue}></input>
            </div>
            <div className='input-group-mb-2'>
                <label className='bg-secondary rounded border' htmlFor='password'>password: </label>
                <input required={true} type='password' className='rounded' name='password' placeholder='password' ref={password}></input>
            </div>
            <button className='btn btn-success border border-light h-20' type='submit'>registration</button>
            <button className='btn text-white btn-danger border border-light h-20' onClick={() => changePage('Login')}>login</button>
        </form>
    );
}

export default Register;
