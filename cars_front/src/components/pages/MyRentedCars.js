import React, { useContext, useEffect, useState } from 'react';
import { cars_context } from './../../utils/cars_repository_context';
import { cars_url, return_car, get_driver_cars } from './../../utils/constants';
import RentedRecordItem from './../elements/RentedRecordItem';


const MyRentedCars = () => {
    const [cars_records, set_cars_records] = useState([]);
    const { user, login } = useContext(cars_context);
    const url = cars_url + get_driver_cars + user.driver_id;
    const loadCars = () => {
        fetch(url).then((response) =>
            response.json()
        ).then((car_data) => {
            if (cars_records.length !== 0 || car_data.length===0) return;
            set_cars_records(car_data);
        }).catch((reason) => console.error(reason));
    }
    const returnCar = async (car_id) => {
        let current_record = cars_records.find(record => record.car_id === car_id);
        current_record.return_date = new Date().toISOString().split('T')[0];
        const url = cars_url + return_car + "/" + car_id + "/" + user.driver_id;
        await fetch((url), {
            headers: {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            method: "POST"
        });
        console.log(current_record);

        user.price -= getPrice(current_record);
        await login(user, "My rented cars");
        set_cars_records([])
    }
    const getPrice = (record) => {
        let days = (new Date(record.return_date) - new Date(record.rent_date)) / 1000 / 60 / 24 / 60;
        if (record.price == null) return 0;
        return record.price * (days > 0 ? days : 1);
    }
    useEffect(() => loadCars());
    return (
        <div className='color-dark row col-10 p-0 m-0 border bprder-light'>
            {cars_records.length > 0 ? cars_records.map((car_rent, index) => {
                return <RentedRecordItem
                    record={car_rent}
                    return_car={() => returnCar(car_rent.car_id, user)}
                    price={getPrice(car_rent)}
                    key={index} />
            }) : "No car records"}
        </div>
    );
}

export default MyRentedCars;