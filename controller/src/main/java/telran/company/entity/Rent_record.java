package telran.company.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import telran.company.dto.Rent_recordDto;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "rent_records")
public class Rent_record {
	@Id
	@Column(unique = true,nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	Integer rent_id;
	@ManyToOne(targetEntity = CarData.class)
	CarData car;
	@ManyToOne(fetch = FetchType.LAZY, targetEntity = DriverData.class)
	DriverData driver;
	Long price;
	LocalDate rentDate;	
	LocalDate returnDate;
	
	public Rent_recordDto convertToDto() {
		return new Rent_recordDto(rent_id, car.getCar_id(),driver.getDriver_id(), car.getModel(), car.getMark(),car.getImagesrc(), driver.getName(), driver.getSecondname(), price, rentDate, returnDate);
	}
}
