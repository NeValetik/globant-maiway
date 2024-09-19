package md.utm.travelbuddy.controllers;

import md.utm.travelbuddy.dto.OfferResponseDTO;
import md.utm.travelbuddy.models.Offer;
import md.utm.travelbuddy.models.User;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class OffersMapping {
    public static OfferResponseDTO mapOfferToDTO(Offer offer) {
        User user = offer.getUser();

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Map offer data to DTO
        OfferResponseDTO responseDTO = new OfferResponseDTO();
        responseDTO.setId(offer.getId());
        responseDTO.setTitle(offer.getTitle());
        responseDTO.setBody(offer.getDescription());
        responseDTO.setLocation(offer.getLocation());
        responseDTO.setRegion(offer.getRegion());
        //Format the date object into a string object
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime createdDateTime = offer.getCreatedAt();
        if (createdDateTime != null) {
            responseDTO.setCreationDate(createdDateTime.format(formatter1));
        }
        // Set Author details
        OfferResponseDTO.AuthorDTO authorDTO = new OfferResponseDTO.AuthorDTO();
        authorDTO.setUserId(user.getId());
        authorDTO.setUsername(user.getUsername());
        authorDTO.setUserAge(user.getAge());
        authorDTO.setUserPfp(user.getPhoto());
        authorDTO.setEmail(user.getEmail());
        authorDTO.setName(user.getName());
        // Set author info
        responseDTO.setAuthor(authorDTO);

        // Set offer photo
        responseDTO.setPhoto(offer.getPhoto());

        return responseDTO;
    }
}
