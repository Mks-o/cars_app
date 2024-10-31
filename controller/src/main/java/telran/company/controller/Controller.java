package telran.company.controller;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import telran.company.dto.CarDataDto;
import telran.company.dto.DriverDto;
import telran.company.dto.DriverInfoDto;
import telran.company.dto.Rent_recordDto;
import telran.company.entity.CarData;
import telran.company.entity.DriverData;
import telran.company.service.RentService;

@RestController
@RequiredArgsConstructor
@Validated
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class Controller {

	RentService rentService;

	@GetMapping("/get_available")
	@CrossOrigin
	public List<CarData> getAllAvailableCarsData() {
		return rentService.getAllAvailableCarsData();
	}

	@GetMapping("/get_all_cars")
	@CrossOrigin
	public List<CarData> getAllCars() {
		return rentService.getAllCars();
	}

	@GetMapping("/get_all_drivers")
	@CrossOrigin
	public List<DriverInfoDto> getAllDrivers() {
		return rentService.getAllDrivers();
	}

	@GetMapping("/get_all_records")
	@CrossOrigin
	public List<Rent_recordDto> getAllRecords() {
		return rentService.getAllRentRecords();
	}

	@GetMapping("/get_top_10_cars")
	@CrossOrigin
	public List<CarDataDto> getTop10Cars() {
		return rentService.getTop10Cars();
	}

	@GetMapping("/get_top_10_drivers")
	@CrossOrigin
	public List<DriverInfoDto> getTop10Drivers() {
		return rentService.getTop10Drivers();
	}

	@GetMapping("/get_driver_cars/{driver_id}")
	@CrossOrigin
	public List<Rent_recordDto> getAllDriverCars(@PathVariable Integer driver_id) {
		return rentService.getAllDriverCars(driver_id);
	}

	@GetMapping("/get_driver/{id}")
	@CrossOrigin
	public DriverDto getDriver(@PathVariable Integer id) {
		return rentService.getDriver(id);
	}

	@GetMapping("/get_car/{id}")
	@CrossOrigin
	public CarData getCar(@PathVariable Integer id) {
		return rentService.getCar(id);
	}

	@PutMapping("/add_car")
	@CrossOrigin
	public CarData addNewCar(@RequestBody CarDataDto carData) {
		return rentService.addNewCar(carData);
	}

	@PostMapping("/update_car")
	@CrossOrigin
	public CarData updateCarData(@RequestBody CarDataDto carData) {
		return rentService.updateCarData(carData);
	}

	@DeleteMapping("/remove_car/{id}")
	@CrossOrigin
	public CarData removeCar(@PathVariable Integer id) {
		return rentService.removeCar(id);
	}

	@PostMapping("/rent_car/{car_id}/{driver_id}")
	@CrossOrigin
	public Rent_recordDto rentCar(@PathVariable Integer car_id, @PathVariable Integer driver_id) {
		return rentService.rentCar(car_id, driver_id);
	}

	@PostMapping("/return_car/{car_id}/{driver_id}")
	@CrossOrigin
	public Rent_recordDto returnCar(@PathVariable Integer car_id, @PathVariable Integer driver_id) {
		return rentService.returnCar(car_id, driver_id);
	}

	@PostMapping("/register")
	@CrossOrigin
	public DriverInfoDto register(@RequestBody DriverData driverData) {
		return rentService.register(driverData);
	}

	@PostMapping("/login")
	@CrossOrigin
	public DriverInfoDto login(@RequestBody DriverDto driverDto) {
		return rentService.login(driverDto);
	}

	@PostMapping("/logout")
	@CrossOrigin
	public DriverInfoDto logOut(@RequestBody DriverDto driverDto) {
		return rentService.logOut(driverDto);
	}

}
