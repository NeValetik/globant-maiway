package md.utm.maiway.service;

import org.springframework.stereotype.Service;

@Service
public class SecurityValidation {
    public static Boolean isInvalidUsername(String username){
        // Username validation regex: at least 6 chars, can include lowercase letters, digits, and optional underscore
        String usernamePattern = "^[a-z0-9](_?[a-z0-9]){5,}$";
        return !username.matches(usernamePattern);
    }
    public static Boolean isInvalidPasswordLen(String password){
        
        return password.length() < 6;
    }
}
