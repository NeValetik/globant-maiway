package md.utm.travelbuddy.controllers;

import md.utm.travelbuddy.dto.UpdateUserRequest;
import md.utm.travelbuddy.dto.UserResponseDTO;
import md.utm.travelbuddy.dto.auth.LoginRequest;
import md.utm.travelbuddy.models.User;
import md.utm.travelbuddy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    private UserService service;



    @Autowired
    UserController(UserService userService) {
        this.userService = userService;
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/{id}/photo")
    public ResponseEntity<?> getUserPhoto(@PathVariable Long id) {
        System.out.println("In id photo");
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("No such user", HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();

        if (user.getPhoto() == null) {
            return ResponseEntity.status(404).body(null); // User or photo not found
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)  // Adjust MIME type if photo isn't JPEG
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"user-photo.jpg\"")
                .body(user.getPhoto());
    }


    // Get a list of all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/{id}/update")
    public ResponseEntity<?> updateUser(
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam("name") String name,
            @RequestParam("age") int age,
            @RequestParam("sex") String sex,
            @RequestParam("email") String email,
            @RequestParam("instagramLink") String instagramLink,
            @RequestParam("about") String about,
            @PathVariable Long id) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return new ResponseEntity<>("User is not authenticated", HttpStatus.UNAUTHORIZED);
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        if (!Objects.equals(((User) userDetails).getId(), id)) {
            return new ResponseEntity<>("User's id is not the same as requested for update", HttpStatus.UNAUTHORIZED);
        }

        User existedUser = (User) userDetails;

        if (photo != null) {
            try {
                byte[] photoBytes = photo.getBytes();
                existedUser.setPhoto(photoBytes);
            } catch (IOException e) {
                return new ResponseEntity<>("Error reading photo file", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        existedUser.setName(name);
        existedUser.setAge(age);
        existedUser.setSex(sex);
        existedUser.setEmail(email);
        existedUser.setInstagramLink(instagramLink);
        existedUser.setAbout(about);

        userService.saveUser(existedUser);

        return ResponseEntity.ok().build();
    }




    // Get user by username
    @GetMapping("/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        Optional<User> user = userService.getUserByUsername(username);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/userpage/username/{username}")
    public UserResponseDTO getUserByUsernameUserPage(@PathVariable String username) {
        Optional<User> user = userService.getUserByUsername(username);
        return user.map(UserResponseDTO::new).orElse(null);
    }
}