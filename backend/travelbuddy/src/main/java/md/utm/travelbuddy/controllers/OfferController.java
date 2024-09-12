package md.utm.travelbuddy.controllers;

import md.utm.travelbuddy.models.Offer;
import md.utm.travelbuddy.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/offer")
public class OfferController {
    
    private final OfferService offerService;

    public final int PAGE_OFFERS_LIMIT = 9;

    @Autowired
    OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    // Get offer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable Long id) {


        Optional<Offer> offer = offerService.getOfferById(id);
        return offer.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get a list of all offers
    @GetMapping
    public ResponseEntity<List<Offer>> getAllOffers() {
        List<Offer> offers = offerService.getAllOffers();
        return ResponseEntity.ok(offers);
    }

    @GetMapping("/page/{number}")
    public List<Offer> getOffersPerPage(@PathVariable int number) {
        return offerService.getOffersPerPage(number-1, PAGE_OFFERS_LIMIT);
    }

    @PostMapping("/generate/{userId}")
    public ResponseEntity<Offer> generateOfferByUserId(@PathVariable Long userId) {
        Optional<Offer> generatedOffer = offerService.generateOfferByUser(userId);
        return generatedOffer.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(500).build());  // 500 if offer generation fails
    }
}
