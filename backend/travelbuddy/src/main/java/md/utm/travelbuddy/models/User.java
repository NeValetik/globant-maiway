package md.utm.travelbuddy.models;

import jakarta.persistence.*;
import java.util.Arrays;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private byte[] photo;

    private String username;

    private String password;

    private int age;

    private char sex;

    private String about;

    public User() {
    }

    public User(Long id, String username, String password, byte[] photo, int age, char sex, String about) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.photo = photo;
        this.age = age;
        this.sex = sex;
        this.about = about;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public char getSex() {
        return sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", photo=" + Arrays.toString(photo) +
                ", age=" + age +
                ", sex=" + sex +
                ", about='" + about + '\'' +
                '}';
    }
}
