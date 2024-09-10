package md.utm.travelbuddy.controllers;

import md.utm.travelbuddy.models.User;
import md.utm.travelbuddy.repository.UserRepository;
import md.utm.travelbuddy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/createuser")
public class OffersController {

    private final UserService userService;

    @Autowired
    public OffersController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping
    public String getOffers() {
        userService.saveUser();
        return "Created probably";
    }
}
