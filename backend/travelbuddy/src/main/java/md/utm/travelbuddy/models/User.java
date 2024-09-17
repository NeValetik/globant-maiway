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

    @Column(name = "username")
    private String username;

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

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user",cascade = CascadeType.ALL)
    private List<Offer> offerList;

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
