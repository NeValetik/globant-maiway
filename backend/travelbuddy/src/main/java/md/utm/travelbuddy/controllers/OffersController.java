package md.utm.travelbuddy.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/offers")
public class OffersController {

    @GetMapping
    public String getOffers() {
        return "Vote nate";
    }

}
