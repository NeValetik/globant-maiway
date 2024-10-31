package md.utm.maiway.controllers;

import md.utm.maiway.dto.CountryRegionsDTO;
import md.utm.maiway.service.CountryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LocationController {

    private final CountryService countryService;

    public LocationController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping("/api/location/getCountriesJson")
    public ResponseEntity<CountryRegionsDTO> getCountriesJson() {
        CountryRegionsDTO countryRegionsDTO = countryService.getAllCountriesWithRegions();
        return new ResponseEntity<>(countryRegionsDTO, HttpStatus.OK);
    }
}
