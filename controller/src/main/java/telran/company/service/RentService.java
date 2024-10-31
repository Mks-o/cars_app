package telran.company.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import javax.security.auth.login.AccountNotFoundException;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import telran.company.dto.*;
import telran.company.entity.*;
import telran.company.repositories.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RentService implements IRent {

	CarRepository carRepository;
	DriverRepository driverRepository;
	RentRepository rentRepository;

	@Override
	@Transactional
	public CarData addNewCar(CarDataDto carData) {
		CarData data = carRepository.save(carData.convertToEntity());
		return data;
	}

	@Override
	public List<CarData> getAllAvailableCarsData() {
		List<CarData> data = carRepository.getAllAvailableCars();
		return data;
	}

	@Override
	public List<CarData> getAllCars() {
		List<CarData> data = carRepository.getAllCars();
		return data;
	}

	@Override
	public List<DriverInfoDto> getAllDrivers() {
		List<DriverData> data = driverRepository.getAllDrivers();
		return data.stream().map(x -> x.convertToDriverInfoDto()).toList();
	}

	@Override
	@Transactional
	public CarData updateCarData(CarDataDto carData) {
		CarData data;
		try {
			data = carRepository.findById(carData.getCar_id())
					.orElseThrow(() -> new AccountNotFoundException("No car with this id"));
			data = carData.convertToEntity();
			return data;
		} catch (AccountNotFoundException e) {
			return null;
		}
	}

	@Override
	@Transactional
	public CarData removeCar(Integer id) {
		CarData data = carRepository.findById(id).get();
		System.out.println(id);
		rentRepository.deleteAllByCar(data);
		carRepository.deleteById(id);
		return data;
	}

	@Override
	@Transactional
	public Rent_recordDto rentCar(Integer car_id, Integer driver_id) {
		CarData car_data = carRepository.findById(car_id).get();
		DriverData driver = driverRepository.findById(driver_id).orElse(null);
		if (car_data == null || driver == null)
			return null;
		car_data.setAvailable(false);
		car_data.setRentDate(LocalDate.now());
		Rent_record rent = new Rent_record(null, car_data, driver, car_data.getPrice(), LocalDate.now(), null);
		rentRepository.save(rent);
		// driver.setCarHistory(cars);
		// carRepository.save(car_data);
		// driverRepository.save(driver);
		return rent.convertToDto();
	}

	@SuppressWarnings("null")
	@Override
	@Transactional
	public Rent_recordDto returnCar(Integer car_id, Integer driver_id) {
		CarData car_data = carRepository.findById(car_id).get();
		DriverData driver = driverRepository.findById(driver_id).orElse(null);
		System.out.println(car_data + " / " + driver);
		if (car_data == null || driver == null)
			return null;
		car_data.setAvailable(true);
		LocalDate rentdate = car_data.getRentDate();
		int days = (int) ChronoUnit.DAYS.between(rentdate, LocalDateTime.now());
		Long price = days > 0 ? (days * car_data.getPrice()) : car_data.getPrice();
		driver.setPrice(driver.getPrice() - price);
		car_data.setRentDate(LocalDate.now());
		Rent_record rent = rentRepository.findFirstByCarAndDriver(car_data, driver);
		System.out.println(rent);
		if (rent != null)
			rent.setReturnDate(LocalDate.now());
		carRepository.save(car_data);
		driverRepository.save(driver);
		rentRepository.save(rent);
		return rent.convertToDto();
	}

	@Override
	@Transactional
	public DriverInfoDto register(DriverData driverData) {
		if (driverRepository.existsByLogin(driverData.getLogin())) {
			return null;
		}
		driverRepository.save(driverData);
		return driverData != null ? driverData.convertToDriverInfoDto() : null;
	}

	@Override
	public DriverInfoDto login(DriverDto driver) {
		System.out.println(driver);
		DriverData data = driverRepository.findByPasswordAndLogin(driver.getPassword(), driver.getLogin())
				.orElse(new DriverData(-1, "Not found", null, null, null, null, 0L));

		return data.getPassword().equals(driver.getPassword()) && driver.getLogin().equals(data.getLogin())
				? data.convertToDriverInfoDto()
				: null;
	}

	@Override
	public DriverInfoDto logOut(DriverDto driver) {
		DriverData data = driverRepository.findByPasswordAndLogin(driver.getPassword(), driver.getLogin())
				.orElse(new DriverData(-1, "Not found", null, null, null, null, 0L));
		return data.getPassword().equals(driver.getPassword()) && driver.getLogin().equals(data.getLogin())
				? data.convertToDriverInfoDto()
				: null;
	}

	public CarData getCar(Integer id) {
		CarData data = carRepository.findById(id).get();
		return data;
	}

	public DriverDto getDriver(Integer id) {
		DriverData data = driverRepository.findById(id).get();
		return data.convertToDriverDto();
	}

	public List<Rent_recordDto> getAllDriverCars(Integer driver_id) {
		Optional<DriverData> driver = driverRepository.findById(driver_id);
		if (driver.isEmpty())
			return null;
		List<Rent_record> records = rentRepository.findAllByDriver(driver.get());
		return records.stream().map(record -> record.convertToDto()).toList();
	}

	@Override
	public List<Rent_recordDto> getAllRentRecords() {
		return rentRepository.findAll().stream().map(record -> record.convertToDto()).toList();
	}

	@Override
	public List<CarDataDto> getTop10Cars() {
		List<CarData> records = rentRepository.findTop10Car();
		System.out.println(records);
		return records.stream().map(car -> car.convertToDto()).toList();
	}

	@Override
	public List<DriverInfoDto> getTop10Drivers() {
		List<DriverData> records = rentRepository.findTop10Drivers();
		return records.stream().map(driver -> driver.convertToDriverInfoDto()).toList();
	}

}
