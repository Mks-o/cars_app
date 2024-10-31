import React from 'react';

const Car = ({ car_value, rent_car, remove_car }) => {

    return (
        <div className='card bg-dark text-light rounded border border-light col-4'>
            <label className='card-header'><kbd className='bg-secondary'>Model:</kbd> {car_value.model}</label>
            <section className='card-body text-start bg-secondary p-1 rounded border border-light'>
                <label>
                    <kbd className='bg-dark'>Mark:</kbd> {car_value.mark}
                </label>
                <label>
                    <kbd className='bg-dark'>Added date:</kbd> {car_value.addedDate}
                </label>
                <label>
                    <kbd className='bg-dark'>Price:</kbd> {car_value.price} for day
                </label>
                <img className='w-100 h-90 rounded border border-black' src={car_value.imagesrc} alt={car_value.model}>
                </img>
            </section>
            <section className='card-footer'>
                <label>{<kbd className={car_value.available ? 'bg-success' : 'bg-secondary'}>{car_value.available ?
                    "Available" : "Not available"}
                </kbd>}</label>
                <p>Rent date: {car_value.rentDate}</p>
                <button className={car_value.available ? 'btn btn-success w-100' : 'btn btn-secondary w-100'}
                  onClick={car_value.available ? rent_car : null}>{car_value.available ? "Rent car" : "Not available"}</button>

                <button className='btn btn-danger w-100' onClick={remove_car}>Remove car</button>
            </section>
        </div>
    );
}

export default Car;
