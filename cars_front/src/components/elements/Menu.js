import React, { useContext } from 'react';
import { cars_context } from './../../utils/cars_repository_context';
import { menu_labels } from '../../utils/constants';
const Menu = () => {
    const { user, changePage } = useContext(cars_context);
    return (
        <div className='col-2 column bg-dark rounded border border-light p-0 m-0'>
            {
                user != null
                && <section className='text-light bg-secondary rounded border border-white p-0 m-0'>
                    <p className='p-0 m-0'>{"Welcome: " + user.login}</p>
                    <p className={user.price > 0 ? 'bg-success rounded p-0 m-0' : 'bg-danger rounded p-0 m-0'}>{"Your balance: " + user.price}</p>
                </section>
            }
            {menu_labels.map((menu, index) => {
                return <button className='btn btn-secondary border border-light w-100 mt-1'
                    key={index}
                    onClick={() => changePage(menu)}>{menu}</button>
            })}
        </div>
    );
}

export default Menu;
