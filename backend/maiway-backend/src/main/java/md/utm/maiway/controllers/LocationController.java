package md.utm.maiway.controllers;

import md.utm.maiway.dto.CountryRegionsDTO;
import md.utm.maiway.service.CountryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
/**
 * LocationController provides an endpoint for retrieving country and region data.
 * It interacts with CountryService to fetch structured country information with associated regions.
 */
@Controller
public class LocationController {

    private final CountryService countryService;

    public LocationController(CountryService countryService) {
        this.countryService = countryService;
    }
    /**
     * Retrieves all countries and their respective regions in a JSON format.
     * Calls CountryService to obtain country-region data and returns it with a 200 OK status.
     *
     * @return ResponseEntity containing CountryRegionsDTO, which includes countries with associated regions
     */
    @GetMapping("/api/location/getCountriesJson")
    public ResponseEntity<CountryRegionsDTO> getCountriesJson() {
        CountryRegionsDTO countryRegionsDTO = countryService.getAllCountriesWithRegions();
        return new ResponseEntity<>(countryRegionsDTO, HttpStatus.OK);
    }
}
