package telran.company.entity;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import telran.company.dto.DriverDto;
import telran.company.dto.DriverInfoDto;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "drivers")
public class DriverData {
	@Id
	@Column(unique = true)
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	Integer driver_id;
	String name;
	String secondname;
	String mail;
	String login;
	String password;
	@Nonnull
	Long price;
	
	public DriverDto convertToDriverDto(){
		return new DriverDto(driver_id, login, password, price);
	}
	public DriverInfoDto convertToDriverInfoDto(){
		return new DriverInfoDto(driver_id, name, secondname, mail, price);
	}
	
}
