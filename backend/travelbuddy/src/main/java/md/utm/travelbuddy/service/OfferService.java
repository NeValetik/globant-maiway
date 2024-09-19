package md.utm.travelbuddy.service;

import md.utm.travelbuddy.models.Offer;
import md.utm.travelbuddy.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
//        System.out.println(offerPage);
        return offerPage.getContent(); // Converts Page to List
    }
    
    public List<Offer> searchByFilters(String title, String location, String region, String before, String after){
        LocalDateTime beforeTime = null;
        LocalDateTime afterTime = null;

        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        if (before != null){
            before = before + " 00:00:01";
            beforeTime = LocalDateTime.parse(before, formatter1);
        }
        if (after != null){
            after = after + " 23:59:59";
            afterTime = LocalDateTime.parse(after, formatter1);
        }
        System.out.println(beforeTime+" : "+afterTime);
        LocalDateTime MinimumDate = LocalDateTime.parse("1900-01-01 00:00:01", formatter1);
        // If both beforeTime and afterTime are not null, call the repository
        if (beforeTime != null && afterTime != null) {
            return offerRepository.findByQueryAndFilters(title, location, region, afterTime, beforeTime);
        } else if (beforeTime != null) {
            return offerRepository.findByQueryAndFilters(title, location, region, MinimumDate, beforeTime); // Until now
        } else if (afterTime != null) {
            return offerRepository.findByQueryAndFilters(title, location, region, afterTime, LocalDateTime.now()); // From start until afterTime
        }
        return offerRepository.findByQueryAndFilters(title, location, region, MinimumDate, LocalDateTime.now());
    }
}