package md.utm.travelbuddy.controllers;

import md.utm.travelbuddy.models.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/offers")
public class OffersController {

    @GetMapping
    public User getOffers() {
        return new User(20L, "john", "meee", null, 20, 'm', "My name is patric batrman");
    }

}
