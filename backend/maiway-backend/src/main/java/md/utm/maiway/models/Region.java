package md.utm.maiway.models;

import jakarta.persistence.*;

@Entity
@Table(name = "region")
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "region_name")
    private String name;

    @Column(name = "code")
    private String code;

    @ManyToOne
    @JoinColumn(name = "country_id") // This is the foreign key to the Country table
    private Country country;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String regionName) {
        this.name = regionName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}
