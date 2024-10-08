package md.utm.maiway.models;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name= "offers")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(name = "title", length = 80)
    private String title;

    @Column(name = "description", length = 3000)
    private String description;

    @Column(name = "photo", columnDefinition = "BYTEA")
    private byte[] photo;
    
    @Column(name = "location")
    private String location;
    
    @Column(name = "region")
    private String region;

    @Column(name = "created_at")
    private LocalDateTime created_at = LocalDateTime.now();

    public Offer() {
    }

    // Constructor with user object
    public Offer(User user, String title, String description) {
        this.user = user;
        this.title = title;
        this.description = description;
    }

    // Constructor with user object and photo
    public Offer(User user, String title, String description, byte[] photo) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.photo = photo;
    }

    public Offer(User user, String title, String description, byte[] photo, String location, String region) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.photo = photo;
        this.location = location;
        this.region = region;
    }

    @Override
    public String toString() {
        return "Offer{" +
                "id=" + id +
                ", user_id=" + user.getId() +
                ", title=" + title +
                ", description='" + description + '\'' +
                '}';
    }

    // Getters/Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getLocation(){
        return location;
    }

    public void setLocation(String location){
        this.location = location;
    }

    public String getRegion(){
        return region;
    }

    public void setRegion(String region){
        this.region = region;
    }
    
    public LocalDateTime getCreatedAt() {
        return this.created_at;
    }
 
}
