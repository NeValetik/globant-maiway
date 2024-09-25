package md.utm.travelbuddy.controllers;

import md.utm.travelbuddy.dto.auth.LoginRequest;
import md.utm.travelbuddy.dto.auth.SignUpRequest;
import md.utm.travelbuddy.enums.Roles;
import md.utm.travelbuddy.models.User;
import md.utm.travelbuddy.service.JwtService;
import md.utm.travelbuddy.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Controller
@RequestMapping("/api/auth")
public class AuthController {

    final UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> signup(@RequestBody SignUpRequest signUpRequest) {
        Logger logger = LoggerFactory.getLogger(AuthController.class);
        logger.info("Into register endpoint");

        String username = signUpRequest.getUsername();
        String password = signUpRequest.getPassword();

        // Username validation regex: at least 6 chars, can include lowercase letters, digits, and optional underscore
        String usernamePattern = "^[a-z0-9](_?[a-z0-9]){5,}$";

        // Check if username is valid
        if (!username.matches(usernamePattern)) {
            return ResponseEntity.badRequest().body("Invalid username. Must be at least 6 characters and can contain lowercase letters, digits, and an optional underscore.");
        }

        // Check if password is at least 6 characters long
        if (password.length() < 6) {
            return ResponseEntity.badRequest().body("Password must be at least 6 characters long.");
        }

        // Check if username already exists
        if (userService.userExists(username)) {
            return ResponseEntity.badRequest().body("This username is already taken");
        }

        // Creating the user
        User user = new User();
        user.setPassword(passwordEncoder.encode(password));
        user.setUsername(username);
        user.setPhoto(null);
        user.setRole(Roles.ROLE_USER);

        // Save user and generate JWT
        User savedUser = userService.saveUser(user);
        String jwt = jwtService.generateToken(savedUser.getUsername(), savedUser.getId(), savedUser.getRole().name());

        return ResponseEntity.status(HttpStatus.CREATED).body(jwt);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        Logger logger = LoggerFactory.getLogger(AuthController.class);
        logger.info("Login attempt for user: {}", loginRequest.getUsername());

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // Fetch the user from the database
        User user = userService.getUserByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        // Validate the password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        // Generate a JWT token
        String token = jwtService.generateToken(user.getUsername(), user.getId(), user.getRole().name());

        // Return the token
        return ResponseEntity.ok(token);
    }

}

