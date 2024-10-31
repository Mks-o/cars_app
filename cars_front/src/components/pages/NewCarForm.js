
import React, { useContext } from 'react';
import { cars_context } from './../../utils/cars_repository_context';
import { cars_url } from './../../utils/constants';

const NewCarForm = () => {
    const model = React.createRef();
    const mark = React.createRef();
    const price = React.createRef();
    const image = React.createRef();

    const { changePage } = useContext(cars_context);

    const add_new_car = async (e) => {
        e.preventDefault();
        let car = {
            model: model.current.value,
            mark: mark.current.value,
            addedDate: new Date().toISOString().split('T')[0],
            rentDate: new Date().toISOString().split('T')[0],
            imagesrc: image.current.value,
            price: price.current.value,
            available: true
        }
        const url = cars_url + "add_car";
        await fetch((url), {
            headers: {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(car)
        }).catch(reason => console.log(reason))
        changePage('Show all cars');
    }
    const group_class = 'input-group-mb-2 p-0 m-0';
    return (
        <form className='col-10 bg-dark text-light rounded border border-light row justify-content-start text-start p-0 m-0 align-baseline h-100 align-self-start'>
            <div className={group_class}>
                <label className='bg-secondary rounded border w-25' htmlFor='model'>Car model: </label>
                <input required={true} className='rounded w-75' name='model' placeholder='car model' ref={model}></input>
            </div>
            <div className={group_class}>
                <label className='bg-secondary rounded border w-25' htmlFor='mark'>Car mark: </label>
                <input required={true} className='rounded w-75' name='mark' placeholder='car mark' ref={mark}></input>
            </div>
            <div className={group_class}>
                <label className='bg-secondary rounded border w-25' htmlFor='price'>Price: </label>
                <input type='number' required={true} className='rounded w-75' name='price' placeholder='car price' ref={price}></input>
            </div>
            <div className={group_class}>
                <label className='bg-secondary rounded border w-25' htmlFor='icon'>Icon: </label>
                <input required={true} className='rounded w-75' name='icon' placeholder='car image url' ref={image}></input>
            </div>

            <button onClick={(e) => add_new_car(e)} className='btn btn-success border border-light'>Add car</button>
        </form>
    );
}

export default NewCarForm;
