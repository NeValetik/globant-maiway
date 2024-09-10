package md.utm.travelbuddy.service;

import md.utm.travelbuddy.models.User;
import md.utm.travelbuddy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void saveUser() {
        User user = new User(1L, "Patrick", "Bateman", null, 20, 'm', "I live somewhere");
        userRepository.save(user);
    }

}
