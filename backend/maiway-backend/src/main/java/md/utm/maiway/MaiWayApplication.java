package md.utm.maiway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@SpringBootApplication
public class MaiWayApplication {
	public static void main(String[] args) {

		final Logger logger = LoggerFactory.getLogger(MaiWayApplication.class);
		SpringApplication.run(MaiWayApplication.class, args);
		System.out.println("Hello Traveler!");
		logger.debug("Started app");
	}
}
