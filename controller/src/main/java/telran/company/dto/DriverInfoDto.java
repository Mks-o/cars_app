package telran.company.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DriverInfoDto {
	Integer driver_id;
	String name;
	String secondname;
	String mail;
	Long price;
}
