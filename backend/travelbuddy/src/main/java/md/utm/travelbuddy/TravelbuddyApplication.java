package md.utm.travelbuddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@SpringBootApplication
public class TravelbuddyApplication {
	public static void main(String[] args) {

		final Logger logger = LoggerFactory.getLogger(TravelbuddyApplication.class);
		SpringApplication.run(TravelbuddyApplication.class, args);
		System.out.println("Hello Traveler!");
		logger.debug("Started app");
	}
}
