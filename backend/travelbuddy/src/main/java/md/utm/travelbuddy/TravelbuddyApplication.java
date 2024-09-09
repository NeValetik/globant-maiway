package md.utm.travelbuddy;

import md.utm.travelbuddy.tables.OfferData;  // Correct import statement

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class TravelbuddyApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelbuddyApplication.class, args);
		System.out.println("Hello Traveler");
		OfferData OfferNo1 = new OfferData();
		OfferNo1.setTitle("This Is offer number1");
		System.out.println(OfferNo1.getTitle());
	}

}
