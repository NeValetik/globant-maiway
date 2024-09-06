package md.utm.travelbuddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class TravelbuddyApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelbuddyApplication.class, args);
	}

}
