package md.utm.travelbuddy;

import java.time.format.DateTimeFormatter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import md.utm.travelbuddy.models.Offer;
@SpringBootApplication
public class TravelbuddyApplication {
	public static void main(String[] args) {
		SpringApplication.run(TravelbuddyApplication.class, args);
		System.out.println("Hello Traveler");
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		Offer test_offer = new Offer();
		System.out.println(test_offer.getCreatedAt().format(formatter));
	}
}
