package md.utm.travelbuddy;

import java.time.format.DateTimeFormatter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import md.utm.travelbuddy.models.Offer;
@SpringBootApplication
public class TravelbuddyApplication {
	public static void main(String[] args) {

		final Logger logger = LoggerFactory.getLogger(TravelbuddyApplication.class);


		SpringApplication.run(TravelbuddyApplication.class, args);
		logger.debug("Started app");
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

	}
}
