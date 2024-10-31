package telran.company.dto;

import java.time.LocalDate;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Rent_recordDto {
	Integer rent_id;
	Integer car_id;
	Integer driver_id;
	String car_model;
	String car_name;
	String car_image_src;
	String driver_name;
	String second_name;
	Long price;
	LocalDate rent_date;	
	LocalDate return_date;
}
