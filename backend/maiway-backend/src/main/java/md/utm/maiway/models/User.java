package md.utm.maiway.models;

import jakarta.persistence.*;
import md.utm.maiway.enums.Roles;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name= "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "photo", columnDefinition = "BYTEA", nullable = true)
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

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Roles role = Roles.ROLE_USER;

    @Column(name = "password")
    private String password;

    @Column(name = "age")
    private int age;

    @Column(name = "sex")
    private String sex; // 'm', 'f'

    @Column(name = "about", columnDefinition = "TEXT", length = 600)
    private String about;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Offer> offerList;


    public void setName(String name) {
        this.name = name;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    public Roles getRole() {
        return role;
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
        this.photo = null;
    }

    public User(String username, String password, byte[] photo, int age, String sex, String about, String phoneNumber, String instagramLink,
                String telegramLink, String facebookLink, String email) {
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getFacebookLink() {
        return facebookLink;
    }

    public void setFacebookLink(String facebookLink) {
        this.facebookLink = facebookLink;
    }

    public String getTelegramLink() {
        return telegramLink;
    }

    public void setTelegramLink(String telegramLink) {
        this.telegramLink = telegramLink;
    }

    public String getInstagramLink() {
        return instagramLink;
    }

    public void setInstagramLink(String instagramLink) {
        this.instagramLink = instagramLink;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
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
                ", age=" + age +
                ", sex=" + sex +
                ", about='" + about + '\'' +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(new String[]{role.name()})
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Customize based on business logic
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Customize based on business logic
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Customize based on business logic
    }

    @Override
    public boolean isEnabled() {
        return true; // Customize based on business logic
    }
}
