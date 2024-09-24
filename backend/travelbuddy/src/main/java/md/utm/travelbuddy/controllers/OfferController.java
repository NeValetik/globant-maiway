package md.utm.travelbuddy.controllers;

import md.utm.travelbuddy.dto.OfferResponseDTO;
import md.utm.travelbuddy.models.Offer;
import md.utm.travelbuddy.models.User;
import md.utm.travelbuddy.service.OfferService;
import md.utm.travelbuddy.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/offer")
public class OfferController {

    private static final Logger logger = LoggerFactory.getLogger(OfferController.class);
    private final OfferService offerService;
    private final UserService userService;

    public final int PAGE_OFFERS_LIMIT = 9;

    @Autowired
    OfferController(OfferService offerService, UserService userService) {
        this.offerService = offerService;
        this.userService = userService;
    }

    // Get offer by ID
    @GetMapping("/{id}")
    public ResponseEntity<OfferResponseDTO> getOfferById(@PathVariable Long id) {
        Optional<Offer> offer = offerService.getOfferById(id);
        if (offer.isPresent()) {
            OfferResponseDTO responseDTO = OffersMapping.mapOfferToDTO(offer.get());
            return ResponseEntity.ok(responseDTO);
        }
        return ResponseEntity.notFound().build();
    }

    // Get all offers
    @GetMapping
    public ResponseEntity<List<OfferResponseDTO>> getAllOffers() {
        List<Offer> offers = offerService.getAllOffers();
        List<OfferResponseDTO> responseDTOs = offers.stream()
                .map(OffersMapping::mapOfferToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    // Get offers by page
    @GetMapping("/page/{number}")
    public List<OfferResponseDTO> getOffersPerPage(@PathVariable int number) {
        List<Offer> offers = offerService.getOffersPerPage(number - 1, PAGE_OFFERS_LIMIT);
        return offers.stream()
                .map(OffersMapping::mapOfferToDTO)
                .collect(Collectors.toList());
    }
    /**
     * Post Controller for creating the offer. Uses Request params listed below. Available at endpoint {@code /api/offer/new-offer}
     * @param userId - the ID of the User. A temporary placeholder until auth is done.
     * @param photo - The photo file.
     * @param title - Title of the offer (80 chars max)
     * @param body - Body of the offer (600 chars max)
     * @return Response Entity with status either OK or INTERNAL_SERVER_ERROR
     */
    @PostMapping("/new-offer")
    public ResponseEntity<String> createOffer(
            @RequestParam("userId") Long userId,
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("title") String title,
            @RequestParam("location") String location,
            @RequestParam("region") String region,
            @RequestParam("body") String body)  {

        try {
            // Convert MultipartFile to byte array
            byte[] photoBytes = photo.getBytes();

            // Fetch the user by userId
            Optional<User> userOptional = userService.getUserById(userId);
            if (userOptional.isEmpty()) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
            User user = userOptional.get();

            // Create a new offer and save it to the database
            Offer newOffer = new Offer(user, title, body, photoBytes, location, region);
            offerService.saveOffer(newOffer);

            logger.info("New offer created with title " + title);
            return new ResponseEntity<>("Offer created successfully", HttpStatus.OK);

        } catch (IOException e) {
            logger.error("Error saving offer: " + e.getMessage());
            return new ResponseEntity<>("Error saving offer", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Post Controller for editing an existing offer. Available at endpoint {@code /api/offer/edit-offer}
     * @param offerId - The ID of the offer to be edited
     * @param userId - The ID of the User. A temporary placeholder until auth is done.
     * @param photo - The updated photo file (optional, can be null if not being updated).
     * @param title - Updated title of the offer (80 chars max)
     * @param body - Updated body of the offer (600 chars max)
     * @return ResponseEntity with status either OK or NOT_FOUND or INTERNAL_SERVER_ERROR
     */
    @PostMapping("/edit-offer")
    public ResponseEntity<String> editOffer(
            @RequestParam("id") Long id,
            @RequestParam("userId") Long userId,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "body", required = false) String body) {

        try {
            // Fetch the offer by offer id
            Optional<Offer> offerOptional = offerService.getOfferById(id);
            if (offerOptional.isEmpty()) {
                return new ResponseEntity<>("Offer not found", HttpStatus.NOT_FOUND);
            }

            // Fetch the user by userId
            Optional<User> userOptional = userService.getUserById(userId);
            if (userOptional.isEmpty()) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
            User user = userOptional.get();

            Offer existingOffer = offerOptional.get();

            // Ensure the offer belongs to the user
            if (!existingOffer.getUser().getId().equals(user.getId())) {
                return new ResponseEntity<>("Unauthorized to edit this offer", HttpStatus.UNAUTHORIZED);
            }

            // Update the title and body
            existingOffer.setTitle(title);
            existingOffer.setDescription(body);

            // Update the photo if it's provided
            if (photo != null && !photo.isEmpty()) {
                byte[] photoBytes = photo.getBytes();
                existingOffer.setPhoto(photoBytes);
            }

            // Save the updated offer to the database
            offerService.saveOffer(existingOffer);

            logger.info("Offer with ID " + id + " updated successfully.");
            return new ResponseEntity<>("Offer updated successfully", HttpStatus.OK);

        } catch (IOException e) {
            logger.error("Error updating offer: " + e.getMessage());
            return new ResponseEntity<>("Error updating offer", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // Request to delete an offer
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteOffer(
        @RequestParam("id") Long id, 
        @RequestParam("userId") Long userId){
        try {
            // Fetch the offer by offer id
            Optional<Offer> offerOptional = offerService.getOfferById(id);
            if (offerOptional.isEmpty()) {
                return new ResponseEntity<>("Offer not found", HttpStatus.NOT_FOUND);
            }

            // Fetch the user by userId
            Optional<User> userOptional = userService.getUserById(userId);
            if (userOptional.isEmpty()) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
            User user = userOptional.get();

            Offer existingOffer = offerOptional.get();

            // Ensure the offer belongs to the user
            if (!existingOffer.getUser().getId().equals(user.getId())) {
                return new ResponseEntity<>("Unauthorized to delete this offer", HttpStatus.UNAUTHORIZED);
            }
            // Delete the offer
            offerService.deleteOfferById(id);

            logger.info("Offer with ID " + id + " deleted successfully.");
            return new ResponseEntity<>("Offer deleted successfully", HttpStatus.OK);

        } catch (Exception e) {
            logger.error("Error updating offer: " + e.getMessage());
            return new ResponseEntity<>("Error deleting the offer", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/search")
    public List<OfferResponseDTO> getSearch(
    @RequestParam(required = false) String query, 
    @RequestParam(required = false) String location, 
    @RequestParam(required = false) String region, 
    @RequestParam(required = false) String before, 
    @RequestParam(required = false) String after) {
        System.out.println(query+":    :" + before + ":" + after);
        List<Offer> filteredOffers = offerService.searchByFilters(query, location, region, before, after);
        return filteredOffers.stream()
                .map(OffersMapping::mapOfferToDTO)
                .collect(Collectors.toList());
    }
    // @PostMapping("/sendData")
    // public ResponseEntity<List<OfferResponseDTO>> receiveData(
    //     @RequestBody OfferResponseDTO search) {
    //     // Process the received data
    //     System.out.println("Received data: " + search.getSearch());
    //     List<Offer> filteredOffers = offerService.searchOffers(search.getSearch());

    //     return new ResponseEntity<>(filteredOffers.stream()
    //             .map(this::mapOfferToDTO)
    //             .collect(Collectors.toList()), HttpStatus.OK);
    // }


}
