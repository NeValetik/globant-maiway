package md.utm.travelbuddy.controllers;

import jakarta.annotation.security.RolesAllowed;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/offer")
public class OfferController {

    private static final Logger logger = LoggerFactory.getLogger(OfferController.class);
    private final OfferService offerService;
    private final UserService userService;

    public final int PAGE_OFFERS_LIMIT = 9;

    @Autowired
    public OfferController(OfferService offerService, UserService userService) {
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
        logger.info("Received request to get offers for page {}", number);
        List<Offer> offers = offerService.getOffersPerPage(number - 1, PAGE_OFFERS_LIMIT);
        return offers.stream()
                .map(OffersMapping::mapOfferToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Post Controller for creating the offer.
     * Uses Request params listed below.
     * Available at endpoint {@code /api/offer/new-offer}
     *
     * @param photo - The photo file.
     * @param title - Title of the offer (80 chars max)
     * @param body - Body of the offer (600 chars max)
     * @return Response Entity with status either OK or INTERNAL_SERVER_ERROR
     */
    @PostMapping("/new-offer")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<String> createOffer(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("title") String title,
            @RequestParam("body") String body) {

        try {
            // Convert MultipartFile to byte array
            byte[] photoBytes = photo.getBytes();

            // Retrieve the current authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return new ResponseEntity<>("User is not authenticated", HttpStatus.UNAUTHORIZED);
            }

            // Get user details to retrieve user ID
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Long userId = ((User) userDetails).getId(); // Assume this method exists in your UserDetails implementation

            Optional<User> userOptional = userService.getUserById(userId);
            if (userOptional.isEmpty()) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
            User user = userOptional.get();

            // Create and save the new offer
            Offer newOffer = new Offer(user, title, body, photoBytes);
            offerService.saveOffer(newOffer);

            logger.info("New offer created with title: {}", title);
            return new ResponseEntity<>("Offer created successfully", HttpStatus.OK);

        } catch (IOException e) {
            logger.error("Error saving offer: {}", e.getMessage());
            return new ResponseEntity<>("Error saving offer", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public List<OfferResponseDTO> getSearch(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String before,
            @RequestParam(required = false) String after) {

        logger.info("Searching offers with query: {}, location: {}, region: {}, before: {}, after: {}",
                query, location, region, before, after);
        List<Offer> filteredOffers = offerService.searchByFilters(query, location, region, before, after);
        return filteredOffers.stream()
                .map(OffersMapping::mapOfferToDTO)
                .collect(Collectors.toList());
    }
}
