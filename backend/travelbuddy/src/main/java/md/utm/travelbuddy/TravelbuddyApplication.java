package md.utm.travelbuddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class TravelbuddyApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelbuddyApplication.class, args);
		System.out.println("Hello Traveler");
	}

}
