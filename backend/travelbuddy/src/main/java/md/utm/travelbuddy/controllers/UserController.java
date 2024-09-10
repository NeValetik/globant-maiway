package md.utm.travelbuddy.controllers;

import md.utm.travelbuddy.models.User;
import md.utm.travelbuddy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Autowired
    UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("adduser")
    private String addUser() {
        userService.saveUser(new User("john", "ksksdf", null, 55, 'm', "travela", "", "", "", ""));
        return "saved";
    }

}
