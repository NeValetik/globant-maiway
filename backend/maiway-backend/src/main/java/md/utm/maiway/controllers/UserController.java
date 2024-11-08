package md.utm.maiway.controllers;

import md.utm.maiway.dto.UserResponseDTO;
import md.utm.maiway.models.User;
import md.utm.maiway.service.UserService;
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
/**
 * Controller for managing user-related operations.
 * Has endpoints for retrieving, updating, and managing user data, including
 * user profile details and photos.
 */
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

    /**
     * Retrieves a user by their ID.
     * @param id the ID of the user
     * @return ResponseEntity containing the user if found, otherwise 404 status
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Retrieves the photo of a user by their ID.
     * @param id the ID of the user
     * @return ResponseEntity containing the user's photo in JPEG format if available, otherwise 404 status
     */
    @GetMapping("/{id}/photo")
    public ResponseEntity<?> getUserPhoto(@PathVariable Long id) {
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

    /**
     * Retrieves the username of a user by their ID.
     * @param id the ID of the user
     * @return ResponseEntity containing the username if found, otherwise 404 status
     */
    @GetMapping("/{id}/username")
    public ResponseEntity<?> getUserName(@PathVariable Long id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("No such user", HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();

        if (user.getUsername() == null) {
            return ResponseEntity.status(404).body(null); // User or photo not found
        }

        return ResponseEntity.ok(user.getUsername());
    }

    /**
     * Retrieves a list of all users.
     * @return ResponseEntity containing the list of users
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * Updates a user's profile details including photo, name, age, sex, email, Instagram link, and about section.
     * @param photo user's profile photo as a MultipartFile
     * @param name user's name
     * @param age user's age
     * @param sex user's sex
     * @param email user's email
     * @param instagramLink link to user's Instagram profile
     * @param about additional information about the user
     * @param id the ID of the user to be updated
     * @return ResponseEntity indicating the update status
     */
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

    /**
     * Retrieves a user by their username.
     * @param username the username of the user
     * @return ResponseEntity containing the user if found, otherwise 404 status
     */
    @GetMapping("/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        Optional<User> user = userService.getUserByUsername(username);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Retrieves user details by their username, formatted for a user page.
     * @param username the username of the user
     * @return UserResponseDTO containing user details if found, otherwise null
     */
    @GetMapping("/userpage/username/{username}")
    public UserResponseDTO getUserByUsernameUserPage(@PathVariable String username) {
        Optional<User> user = userService.getUserByUsername(username);
        return user.map(UserResponseDTO::new).orElse(null);
    }
}
