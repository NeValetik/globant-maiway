package md.utm.maiway.mappers;

import md.utm.maiway.dto.OfferResponseDTO;
import md.utm.maiway.models.Offer;
import md.utm.maiway.models.User;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class OffersMapping {
    public static OfferResponseDTO mapOfferToDTO(Offer offer) {
        User user = offer.getUser();

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        OfferResponseDTO responseDTO = new OfferResponseDTO();
        responseDTO.setId(offer.getId());
        responseDTO.setTitle(offer.getTitle());
        responseDTO.setBody(offer.getDescription());
        responseDTO.setCountry(offer.getRegion().getCountry().getName());

        responseDTO.setRegion(offer.getRegion().getName());

        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime createdDateTime = offer.getCreatedAt();
        if (createdDateTime != null) {
            responseDTO.setCreationDate(createdDateTime.format(formatter1));
        }

        OfferResponseDTO.AuthorDTO authorDTO = new OfferResponseDTO.AuthorDTO();
        authorDTO.setUserId(user.getId());
        authorDTO.setUsername(user.getUsername());
        authorDTO.setUserAge(user.getAge());
        authorDTO.setUserPfp(user.getPhoto());
        authorDTO.setEmail(user.getEmail());
        authorDTO.setName(user.getName());

        responseDTO.setAuthor(authorDTO);

        responseDTO.setPhoto(offer.getPhoto());

        return responseDTO;
    }
}
