export const cars_url = 'http://localhost:8080/';
export const get_all_cars = 'get_all_cars';
export const rent_car = 'rent_car';
export const return_car = 'return_car';
export const remove_car_url = 'remove_car/';
export const get_driver_cars = 'get_driver_cars/';
export const get_available_cars = 'get_available';
export const get_all_records = 'get_all_records';
export const get_top_10_drivers = 'get_top_10_drivers';
export const get_top_10_cars = 'get_top_10_cars';
export const menu_labels = ['Add new car', 'Show all cars', 'Show available cars', 'My rented cars', 'Statistic', 'Logout']
export const set_headers = (auth) => {
    let headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
    }
    if (auth != null) headers.Authorization = auth
    return headers;
}