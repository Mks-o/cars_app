import React, { useState } from 'react';
import { cars_url, get_all_records, get_top_10_cars, set_headers } from '../../utils/constants';
import RentedRecordItem from '../elements/RentedRecordItem';
import { get_top_10_drivers } from './../../utils/constants';
import Car from './../elements/Car';
import Driver from '../elements/Driver';


const StatisticPage = () => {
    const [records, set_cars_records] = useState({ data: null, current_request: "" });

    const loadRecords = (request) => {
        let headers = set_headers();
        headers.method = "GET";
        fetch(cars_url + request, headers).then((response) =>
            response.json()
        ).then((car_data) => {
            set_cars_records({ data: car_data, current_request: request });
        }).catch((reason) => console.error(reason));
    }

    const showElements = () => {
        console.log(records.current_request);
        switch (records.current_request) {
            case "get_all_records":
                return records.data?.map((car_rent, index) => {
                    return <RentedRecordItem
                        record={car_rent}
                        return_car={() => null}
                        price={getPrice(car_rent)}
                        key={index} />
                })
            case "get_top_10_cars":
                return records.data?.map((car, index) => {
                    return <Car car_value={car} rent_car={null} remove_car={null} key={index} />
                })
            case "get_top_10_drivers":
                return records.data?.map((driver, index) => {
                    return <Driver driverInfo={driver} key={index} />
                })
            default:
                return <div className='h1'>Select category</div>;
        }
    }

    const getPrice = (record) => {
        let days = (new Date(record.return_date) - new Date(record.rent_date)) / 1000 / 60 / 24 / 60;
        if (record.price == null) return 0;
        return record.price * (days > 0 ? days : 1);
    }

    return (
        <div className='color-dark row col-10 p-0 m-0 border bprder-light'>
            <button
                className='bg-secondary text-light'
                onClick={() => loadRecords(get_all_records)}>All records</button>
            <button
                className='bg-secondary text-light'
                onClick={() => loadRecords(get_top_10_cars)}>Top 10 cars</button>
            <button
                className='bg-secondary text-light'
                onClick={() => loadRecords(get_top_10_drivers)}>Most active top 10 drivers</button>
            {showElements()}
        </div>
    );
}

export default StatisticPage;