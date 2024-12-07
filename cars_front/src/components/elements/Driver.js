import React from 'react';

const Driver = ({driverInfo}) => {
    return (
        <div className='bg-secondary text-light rounded border border-light col-4 row text-start p-0 m-0'>
            <kbd className='bg-dark'>Name:</kbd>
            <label>{driverInfo.name}</label>
            <kbd className='bg-dark'>Second name:</kbd>
            <label>{driverInfo.secondname}</label>
            <kbd className='bg-dark'>Mail:</kbd>
            <label>{driverInfo.mail}</label>
            <kbd className='bg-dark'>Balance:</kbd>
            <label className={driverInfo.price<0?'btn btn-danger':'btn btn-success'}>{driverInfo.price}</label>
        </div>
    );
}

export default Driver;
