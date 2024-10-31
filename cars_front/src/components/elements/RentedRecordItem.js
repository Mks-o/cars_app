import React from 'react';

const RentedRecordItem = ({ record, return_car, price }) => {
    const returnValues = {
        style: (record.return_date ? 'btn btn-success border w-100 p-0 m-0' : 'btn btn-warning border w-100 p-0 m-0'),
        click_function: record.return_date ? null : return_car,
        button_text: record.return_date ? "return date " + record.return_date : `Return car (Price: ${price})`
    }
    return (
        <div className='bg-dark text-light text-start rounded border border-secondary d-flex p-0 m-0'>
            <img className='w-50 h-75 rounded border p-0 m-1 border-light' src={record.car_image_src} alt={record.car_model}></img>
            <section className='w-75 row m-1 text-start d-flex border border-light p-2 m-0 rounded'>
                <label><kbd className='bg-secondary'>Model:</kbd> {record.car_model}</label>
                <label>
                    <kbd className='bg-secondary'>Mark:</kbd> {record.car_name}
                </label>
                <label>
                    <kbd className='bg-secondary'>Price:</kbd> {record.price}
                </label>
                <label>
                    <kbd className='bg-secondary'>Driver:</kbd> {record.driver_name} {record.second_name}
                </label>
                <label>
                    <kbd className='bg-secondary'>Rented date:</kbd> {record.rent_date}
                </label>
                <button className={returnValues.style} onClick={returnValues.click_function}>{returnValues.button_text}</button>
            </section>
        </div>
    );
}

export default RentedRecordItem;
