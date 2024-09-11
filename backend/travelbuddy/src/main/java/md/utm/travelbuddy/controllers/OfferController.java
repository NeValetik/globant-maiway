package md.utm.travelbuddy.controllers;

import md.utm.travelbuddy.models.Offer;
import md.utm.travelbuddy.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/offer")
public class OfferController {
    
    private final OfferService offerService;

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
}
