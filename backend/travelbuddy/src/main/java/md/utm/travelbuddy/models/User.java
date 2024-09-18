package md.utm.travelbuddy.models;

import jakarta.persistence.*;

import java.util.Arrays;
import java.util.List;

@Entity
@Table(name= "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "photo", columnDefinition = "BYTEA")
    private byte[] photo;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "name")
    private String name;


    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "city")
    private String city;

    @Column(name = "instagram_link")

    private String instagramLink;

    @Column(name = "telegram_link")
    private String telegramLink;

    @Column(name = "facebook_link")
    private String facebookLink;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "age")
    private int age;
    
    @Column(name = "sex")
    private char sex; // 'm' , 'f'

    @Column(name = "about", columnDefinition = "TEXT")
    private String about;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user",cascade = CascadeType.ALL)
    private List<Offer> offerList;

    public void seName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public List<Offer> getOfferList() {
        return this.offerList;
    }

    public User() {
    }

    public User(String username, String password) {

        this.username = username;
        this.password = password;

    }
    public User(String username, String password, byte[] photo, int age, char sex, String about, String phoneNumber, String instagramLink,
                String telegramLink, String facebookLink, String email) {
//        this.id = id;
        this.username = username;
        this.password = password;
        this.photo = photo;
        this.age = age;
        this.sex = sex;
        this.about = about;
        this.phoneNumber = phoneNumber;
        this.instagramLink = instagramLink;
        this.telegramLink = telegramLink;
        this.facebookLink = facebookLink;
        this.email = email;
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

    public String getPhoneNumber() { return phoneNumber; }

    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getCity() { return city; }

    public String getFacebookLink() { return facebookLink; }

    public void setFacebookLink(String facebookLink) { this.facebookLink = facebookLink; }

    public String getTelegramLink() { return telegramLink; }

    public void setTelegramLink(String telegramLink) { this.telegramLink = telegramLink; }

    public String getInstagramLink() { return instagramLink; }

    public void setInstagramLink(String instagramLink) { this.instagramLink = instagramLink; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public void setCity(String city) { this.city = city; }

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
