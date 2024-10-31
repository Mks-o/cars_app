package telran.company;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
//   @PropertySource(name = "H2.properties", value = { "H2.properties" })
  @PropertySource(name = "SQL.properties", value = { "SQL.properties" })
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
