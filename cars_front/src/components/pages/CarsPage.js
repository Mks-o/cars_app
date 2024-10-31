import React, { useContext, useEffect, useState } from 'react';
import { cars_context } from './../../utils/cars_repository_context';
import { cars_url, get_available_cars, get_all_cars, rent_car, return_car, remove_car_url } from './../../utils/constants';
import Car from './../elements/Car';


const CarsPage = () => {
    const { currentPage, user } = useContext(cars_context)
    const [cars, setCars] = useState(null);
    const loadCars = () => {
        const url = cars_url + (currentPage === 'Show all cars' ? get_all_cars : get_available_cars)
        
        console.log(url);

        fetch(url).then((response) =>
            response.json()
        ).then((car_data) => {
            if (cars !== null && cars.length === car_data.length) return;
            setCars(car_data)
        }).catch((reason) => console.error(reason));
    }
    const rentCar = async (car) => {
        let res = cars.find(cars => cars.car_id === car.car_id);
        res.available = !res.available;
        res.rentDate = new Date().toISOString().split('T')[0];
        const url = cars_url + (!res.available ? rent_car : return_car) + "/" + car.car_id + "/" + user.driver_id;

        await fetch((url), {
            headers: {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            method: "POST"
        })
        setCars(null)
    }
    const remove_car = async (car) => {
        const url = cars_url + remove_car_url + car.car_id;
        await fetch((url), {
            headers: {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Content-Type": "application/json"
            },
            method: "DELETE"
        })
        setCars(null)
    }
    useEffect(() => loadCars())

    return (
        <div className='color-dark row col-9 p-0 ms-1'>
            {cars?.map((car, index) => <Car car_value={car} rent_car={() => rentCar(car)} remove_car={() => remove_car(car)} key={index} />)}
        </div>
    );
}

export default CarsPage;

