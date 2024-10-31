package md.utm.maiway.dto;

import java.util.ArrayList;
import java.util.List;

public class CountryRegionsDTO {
    private List<CountryInner> countries;

    public static class CountryInner {

        public static class RegionsInner {
            private String name;
            private String code;

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }

            public String getCode() {
                return code;
            }

            public void setCode(String code) {
                this.code = code;
            }
        }

        private String name;
        private String code;
        private ArrayList<RegionsInner> regions;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public ArrayList<RegionsInner> getRegions() {
            return regions;
        }

        public void setRegions(ArrayList<RegionsInner> regions) {
            this.regions = regions;
        }
    }

    public List<CountryInner> getCountries() {
        return countries;
    }

    public void setCountries(List<CountryInner> countries) {
        this.countries = countries;
    }
}
