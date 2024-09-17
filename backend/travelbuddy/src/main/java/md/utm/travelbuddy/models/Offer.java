package md.utm.travelbuddy.models;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name= "offers")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Lob
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "title", length = 800)
    private String title;

    @Column(name = "description", length = 999)
    private String description;

    @Column(name = "photo", columnDefinition = "BYTEA")
    private byte[] photo;

    @Column(name = "created_at")
    private LocalDateTime created_at = LocalDateTime.now();

    public Offer(){
    }
    public Offer(Long user_id, String title, String description) {
        this.userId = user_id;
        this.title = title;
        this.description = description;
    }

    public Offer(Long userId, String title, String body, byte[] photo) {
        this.userId = userId;
        this.description = body;
        this.title = title;
        this.photo = photo;
    }

    @Override
    public String toString() {
        return "Offer{" +
                "id=" + id +
                ", user_id=" + userId +
                ", title=" + title +
                ", description='" + description + '\'' +
                '}';
    }
    // Getters/Setters:
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public byte[] getPhoto() {
        return this.photo;
    }
    // No setter for this offer
    public LocalDateTime getCreatedAt() {
        return this.created_at;
    }
    // Getter and Setter
   
}
