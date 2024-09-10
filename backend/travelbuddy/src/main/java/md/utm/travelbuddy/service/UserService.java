package md.utm.travelbuddy.service;

import md.utm.travelbuddy.models.User;
import md.utm.travelbuddy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void saveUser(User user) {
        userRepository.save(user);
    }

    // Get a user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);}

    // Get a list of all users
    public List<User> getAllUsers() {
        return userRepository.findAll();}
}