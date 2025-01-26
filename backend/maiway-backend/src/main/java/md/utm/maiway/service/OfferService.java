package md.utm.maiway.service;

import md.utm.maiway.models.Offer;
import md.utm.maiway.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    private final OfferRepository offerRepository;

    @Autowired
    public OfferService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    public void saveOffer(Offer offer) {
        offerRepository.save(offer);
    }

    public Optional<Offer> getOfferById(Long id) {
        return offerRepository.findById(id);
    }

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    @Transactional
    public void deleteOfferById(Long id) {
        offerRepository.deleteOfferByIdMQuery(id);
        System.out.println("Offer with ID " + id + " deleted successfully."); // Consider using a logger here
    }

    public List<Offer> getOffersPerPage(int page, int offerPerPageLimit) {
        Pageable pageable = PageRequest.of(page, offerPerPageLimit, Sort.by(Sort.Direction.DESC, "id"));
        Page<Offer> offerPage = offerRepository.findAll(pageable);
        return offerPage.getContent();
    }

    /**
     * Search offers using filters with country and region names.
     */
    public List<Offer> searchByFilters(String title, String location, String region, String before, String after) {
        LocalDateTime beforeTime = parseDate(before, "00:00:01");
        LocalDateTime afterTime = parseDate(after, "23:59:59");

        LocalDateTime minimumDate = LocalDateTime.of(1900, 1, 1, 0, 0, 1);
        if (beforeTime != null && afterTime != null) {
            return offerRepository.findByQueryAndFilters(title, location, region, afterTime, beforeTime);
        } else if (beforeTime != null) {
            return offerRepository.findByQueryAndFilters(title, location, region, minimumDate, beforeTime);
        } else if (afterTime != null) {
            return offerRepository.findByQueryAndFilters(title, location, region, afterTime, LocalDateTime.now());
        }
        return offerRepository.findByQueryAndFilters(title, location, region, minimumDate, LocalDateTime.now());
    }

    /**
     * Search offers using filters with country and region IDs.
     */
    public List<Offer> searchByFilters(String title, Long countryId, Long regionId, String before, String after) {
        LocalDateTime beforeTime = parseDate(before, "00:00:01");
        LocalDateTime afterTime = parseDate(after, "23:59:59");

        LocalDateTime minimumDate = LocalDateTime.of(1900, 1, 1, 0, 0, 1);
        if (beforeTime != null && afterTime != null) {
            return offerRepository.findByQueryAndFilters(title, countryId, regionId, afterTime, beforeTime);
        } else if (beforeTime != null) {
            return offerRepository.findByQueryAndFilters(title, countryId, regionId, minimumDate, beforeTime);
        } else if (afterTime != null) {
            return offerRepository.findByQueryAndFilters(title, countryId, regionId, afterTime, LocalDateTime.now());
        }
        return offerRepository.findByQueryAndFilters(title, countryId, regionId, minimumDate, LocalDateTime.now());
    }

    /**
     * Utility method to parse date strings into LocalDateTime.
     */
    private LocalDateTime parseDate(String date, String timeSuffix) {
        if (date == null || date.isBlank()) {
            return null;
        }
        String dateTime = date + " " + timeSuffix;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(dateTime, formatter);
    }
}