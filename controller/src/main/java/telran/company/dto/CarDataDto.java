package telran.company.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import telran.company.entity.CarData;
@Data

@AllArgsConstructor
public class CarDataDto {
	Integer car_id;
	String model;
	String mark;
	LocalDate addedDate;
	LocalDate rentDate;
	String Imagesrc;
	Long price;
	Boolean available;
	public CarData convertToEntity() {
		return new CarData(car_id, model, mark, addedDate,rentDate, Imagesrc, price, available);
	}
}
