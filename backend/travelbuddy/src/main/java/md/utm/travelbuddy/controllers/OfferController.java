package md.utm.travelbuddy.controllers;

import md.utm.travelbuddy.dto.OfferResponseDTO;
import md.utm.travelbuddy.models.Offer;
import md.utm.travelbuddy.models.User;
import md.utm.travelbuddy.service.OfferService;
import md.utm.travelbuddy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.MergedAnnotations.Search;
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

    private final OfferService offerService;
    private final UserService userService; // Assuming you have a UserService to fetch user data

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
            OfferResponseDTO responseDTO = mapOfferToDTO(offer.get());
            return ResponseEntity.ok(responseDTO);
        }
        return ResponseEntity.notFound().build();
    }

    // Get a list of all offers
    @GetMapping
    public ResponseEntity<List<OfferResponseDTO>> getAllOffers() {
        List<Offer> offers = offerService.getAllOffers();
        List<OfferResponseDTO> responseDTOs = offers.stream()
                .map(this::mapOfferToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    // Get offers by page
    @GetMapping("/page/{number}")
    public List<OfferResponseDTO> getOffersPerPage(@PathVariable int number) {
        List<Offer> offers = offerService.getOffersPerPage(number - 1, PAGE_OFFERS_LIMIT);
        return offers.stream()
                .map(this::mapOfferToDTO)
                .collect(Collectors.toList());
    }

    // Generate offer by user ID
    @PostMapping("/generate/{userId}/{title}")
    public ResponseEntity<OfferResponseDTO> generateOfferByUserId(@PathVariable Long userId, @PathVariable String title) {
        Optional<Offer> generatedOffer = offerService.generateOfferByUser(userId, title);
        if (generatedOffer.isPresent()) {
            OfferResponseDTO responseDTO = mapOfferToDTO(generatedOffer.get());
            return ResponseEntity.ok(responseDTO);
        }
        return ResponseEntity.status(500).build(); // 500 if offer generation fails
    }

    @PostMapping("/new-offer")
    public ResponseEntity<String> createOffer(
            @RequestParam("userId") Long userId,
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("title") String title,
            @RequestParam("body") String body)  {

        try {
            // Convert MultipartFile to byte array
            byte[] photoBytes = photo.getBytes();

            // Create a new offer and save it to the database
            Offer newOffer = new Offer(userId, title, body, photoBytes);

            offerService.saveOffer(newOffer);

            return new ResponseEntity<>("Fine", HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error saving offer", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public List<OfferResponseDTO> getSearch(@RequestParam String query) {
        List<Offer> filteredOffers = offerService.searchOffers(query);
        return filteredOffers.stream()
                .map(this::mapOfferToDTO)
                .collect(Collectors.toList());
    }

    @PostMapping("/sendData")
    public ResponseEntity<String> receiveData(
        @RequestBody OfferResponseDTO search) {
        // Process the received data
        System.out.println("Received data: " + search.getSearch());

        // Respond to the client
        return ResponseEntity.ok("Data received successfully!");
    }

    // Helper method to map Offer to OfferResponseDTO
    private OfferResponseDTO mapOfferToDTO(Offer offer) {
        // Fetch the user associated with the offer
        Optional<User> userOptional = userService.getUserById(offer.getUserId()); // Fetch user by user_id
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = userOptional.get();

        // Map data to DTO
        OfferResponseDTO responseDTO = new OfferResponseDTO();
        responseDTO.setId(offer.getId());
        responseDTO.setTitle(offer.getTitle());
        responseDTO.setBody(offer.getDescription());

        // Set Author details
        OfferResponseDTO.AuthorDTO authorDTO = new OfferResponseDTO.AuthorDTO();
        authorDTO.setUserId(user.getId());
        authorDTO.setUserName(user.getUsername());
        authorDTO.setUserAge(user.getAge());
        authorDTO.setUserPfp(user.getPhoto());
        responseDTO.setAuthor(authorDTO);

        // Set Thumbnail
        responseDTO.setPhoto(offer.getPhoto() == null ? null: offer.getPhoto());

        return responseDTO;
    }
}
