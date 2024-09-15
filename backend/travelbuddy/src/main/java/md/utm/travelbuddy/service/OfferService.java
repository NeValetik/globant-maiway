package md.utm.travelbuddy.service;

import md.utm.travelbuddy.models.Offer;
import md.utm.travelbuddy.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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



    public List<Offer> getOffersPerPage(int page, int offerPerPageLimit) {
        Pageable pageable = PageRequest.of(page, offerPerPageLimit, Sort.by(Sort.Direction.DESC, "id"));
        Page<Offer> offerPage = offerRepository.findAll(pageable);
        System.out.println(offerPage);
        return offerPage.getContent(); // Converts Page to List
    }
    
    // Post an offer by the user_id
    public Optional<Offer> generateOfferByUser(Long user_id, String title){
        Offer newOffer = new Offer(user_id, title, "sample");
        Offer savedOffer = offerRepository.save(newOffer);
        return Optional.of(savedOffer);
    }
    public List<Offer> searchOffers(String query){
        System.out.println("Here might be bug: " + query);
        return offerRepository.findByTitle(query);
    }

}