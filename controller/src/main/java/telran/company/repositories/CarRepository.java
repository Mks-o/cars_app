package telran.company.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import telran.company.entity.CarData;

public interface CarRepository extends JpaRepository<CarData, Integer>{
	
	@Query(nativeQuery = true, value = "select * from car_data where available = true")
	public List<CarData> getAllAvailableCars();
	
	@Query(nativeQuery = true, value = "select * from car_data")
	public List<CarData> getAllCars();

}
