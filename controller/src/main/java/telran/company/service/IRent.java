package telran.company.service;

import java.util.List;

import telran.company.dto.CarDataDto;
import telran.company.dto.DriverDto;
import telran.company.dto.DriverInfoDto;
import telran.company.dto.Rent_recordDto;
import telran.company.entity.CarData;
import telran.company.entity.DriverData;

public interface IRent {

	public List<CarData> getAllAvailableCarsData();

	public List<CarData> getAllCars();

	public List<DriverInfoDto> getAllDrivers();

	public List<Rent_recordDto> getAllRentRecords();

	public List<CarDataDto> getTop10Cars();

	public List<DriverInfoDto> getTop10Drivers();

	public List<Rent_recordDto> getAllDriverCars(Integer driver_id);

	public CarData addNewCar(CarDataDto cardata);

	public CarData updateCarData(CarDataDto carData);

	public CarData removeCar(Integer id);

	public CarData getCar(Integer id);

	public Rent_recordDto rentCar(Integer car_id, Integer driver_id);

	public Rent_recordDto returnCar(Integer car_id, Integer driver_id);

	public DriverInfoDto register(DriverData driver);

	public DriverInfoDto login(DriverDto driver);

	public DriverInfoDto logOut(DriverDto driver);
}
