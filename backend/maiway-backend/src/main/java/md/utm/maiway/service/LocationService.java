package md.utm.maiway.service;

import md.utm.maiway.models.Region;
import md.utm.maiway.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class LocationService {

    private final RegionRepository regionRepository;

    @Autowired
    public LocationService(RegionRepository regionRepository) {
        this.regionRepository = regionRepository;
    }

    /**
     * Retrieves a region along with its country by region ID.
     *
     * @param regionId the ID of the region to retrieve.
     * @return an Optional containing the region with country, or empty if not found.
     */
    public Optional<Region> getRegionWithCountry(Long regionId) {
        return Optional.ofNullable(regionRepository.findRegionWithCountryById(regionId));
    }

    public Optional<Region> getRegionWithCountryByCode(String countryCode, String regionCode) {
        return Optional.ofNullable(regionRepository.findRegionWithCountryByName(countryCode, regionCode));
    }
}
