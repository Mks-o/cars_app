package telran.company.entity;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import telran.company.dto.CarDataDto;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "car_data")
public class CarData {
	@Id
	@Column(unique = true)
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	Integer car_id;
	String model;
	String mark;
	LocalDate addedDate;
	LocalDate rentDate;
	String Imagesrc;
	Long price;
	Boolean available;
	
	
	public CarDataDto convertToDto() {
		return new CarDataDto(car_id, model, mark, addedDate,rentDate, Imagesrc,price,available);
	}
}
