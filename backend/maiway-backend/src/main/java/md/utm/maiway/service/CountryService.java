package md.utm.maiway.service;

import md.utm.maiway.dto.CountryRegionsDTO;
import md.utm.maiway.models.Country;
import md.utm.maiway.models.Region;
import md.utm.maiway.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CountryService {
    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public CountryRegionsDTO getAllCountriesWithRegions() {
        List<Country> countries = countryRepository.findAll(); // Fetch countries
        CountryRegionsDTO dto = new CountryRegionsDTO();

        List<CountryRegionsDTO.CountryInner> countryInnerList = new ArrayList<>();
        for (Country country : countries) {
            CountryRegionsDTO.CountryInner countryInner = new CountryRegionsDTO.CountryInner();
            countryInner.setName(country.getName());
            countryInner.setCode(country.getCode());

            ArrayList<CountryRegionsDTO.CountryInner.RegionsInner> regionsInnerList = new ArrayList<>();
            for (Region region : country.getRegionList()) {
                CountryRegionsDTO.CountryInner.RegionsInner regionsInner = new CountryRegionsDTO.CountryInner.RegionsInner();
                regionsInner.setName(region.getName());
                regionsInner.setCode(region.getCode());
                regionsInnerList.add(regionsInner);
            }

            countryInner.setRegions(regionsInnerList);
            countryInnerList.add(countryInner);
        }

        dto.setCountries(countryInnerList);
        return dto;
    }
}
