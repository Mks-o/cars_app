package telran.company.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import telran.company.entity.CarData;
import telran.company.entity.DriverData;
import telran.company.entity.Rent_record;

public interface RentRepository extends JpaRepository<Rent_record, Integer> {

	public Rent_record findFirstByCar(CarData car);

	public void deleteAllByCar(CarData data);

	public List<Rent_record> findAllByDriver(DriverData driver);

	@Query("Select r from Rent_record r where r.car = :car and r.driver = :driver and r.returnDate is NULL")
	public Rent_record findFirstByCarAndDriver(@Param("car") CarData car_data, @Param("driver") DriverData driver);

	@Query("select r.car from Rent_record r group by r.car.car_id order by count(*) DESC  limit 9")
	public List<CarData> findTop10Car();

	@Query("select r.driver from Rent_record r group by r.driver.driver_id order by count(*) DESC limit 10")
	public List<DriverData> findTop10Drivers();
}