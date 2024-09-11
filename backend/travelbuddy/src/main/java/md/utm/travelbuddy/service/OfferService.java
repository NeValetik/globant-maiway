package md.utm.travelbuddy.service;

import md.utm.travelbuddy.models.Offer;
import md.utm.travelbuddy.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    @Autowired
    private OfferRepository offerRepository;

    public void saveOffer(Offer offer) {
        offerRepository.save(offer);
    }

    // Get an offer by ID
    public Optional<Offer> getOfferById(Long id) {
        return offerRepository.findById(id);}

    // Get a list of all offers
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();}
    
    // Post an offer by the user_id
    public Optional<Offer> generateOfferByUser(Long user_id){
        Offer newOffer = new Offer(893L, user_id, "-", "sample");
        newOffer.setUserId(user_id);
        System.out.println("hey this is the user id that generated the offer: " + user_id);
        Offer savedOffer = offerRepository.save(newOffer);
        return Optional.of(savedOffer);
    }
}