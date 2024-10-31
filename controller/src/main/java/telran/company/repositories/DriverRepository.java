package telran.company.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import telran.company.entity.DriverData;

public interface DriverRepository extends JpaRepository<DriverData, Integer>{

	@Query(nativeQuery = true, value = "Select * from drivers")
	public List<DriverData> getAllDrivers();

	@Query(nativeQuery = true, value = "Select * from drivers where password=?1")
	public Optional<DriverData> findByPassword(@Param("password") String password);

	public boolean existsByLogin(String login);
	
	@Query("Select d from DriverData d where d.password = :pass and d.login = :login")
	public Optional<DriverData> findByPasswordAndLogin(@Param ("pass") String password, @Param("login") String login);
}
