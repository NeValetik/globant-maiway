package md.utm.travelbuddy.dto;

import md.utm.travelbuddy.controllers.OffersMapping;
import md.utm.travelbuddy.models.User;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class UserResponseDTO {


    private String name;
    private int age;
    private String username;
    private byte[] photo;
    private List<OfferResponseDTO> offers;
    private String about;
    private String instagramLink;
    private String phoneNumber;
    private String telegramLink;
    private String facebookLink;
    private String email;
    private char sex;


    public UserResponseDTO(User user) {
        this.username = user.getUsername();
        this.photo = user.getPhoto();
        this.age = user.getAge();
        this.sex = user.getSex();
        this.about = user.getAbout();
        this.phoneNumber = user.getPhoneNumber();
        this.instagramLink = user.getInstagramLink();
        this.telegramLink = user.getTelegramLink();
        this.facebookLink = user.getFacebookLink();
        this.email = user.getEmail();
        this.offers = user.getOfferList().stream()
                .map(OffersMapping::mapOfferToDTO)
                .collect(Collectors.toList());
        this.name = user.getName();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public byte[] getPhoto() {
        return photo;

    }
    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }
    public List<OfferResponseDTO> getOffers() {
        return offers;
    }
    public void setOffers(List<OfferResponseDTO> offers) {
        this.offers = offers;
    }
    public String getAbout() {
        return about;

    }
    public void setAbout(String about) {
        this.about = about;
    }
    public String getInstagramLink() {
        return instagramLink;
    }
    public void setInstagramLink(String instagramLink) {
        this.instagramLink = instagramLink;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getTelegramLink() {
        return telegramLink;
    }
    public void setTelegramLink(String telegramLink) {
        this.telegramLink = telegramLink;
    }
    public String getFacebookLink() {
        return facebookLink;
    }
    public void setFacebookLink(String facebookLink) {
        this.facebookLink = facebookLink;

    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

}
