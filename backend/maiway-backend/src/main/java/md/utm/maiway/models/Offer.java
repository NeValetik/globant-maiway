package md.utm.maiway.models;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "offers")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(name = "title", length = 80)
    private String title;

    @Column(name = "description", length = 3000)
    private String description;

    @Column(name = "photo", columnDefinition = "BYTEA")
    private byte[] photo;

    @ManyToOne
    @JoinColumn(name = "region_id", referencedColumnName = "id")
    private Region region;

    @Column(name = "created_at")
    private LocalDateTime created_at = LocalDateTime.now();

    public Offer() {
    }

    public Offer(User user, String title, String description) {
        this.user = user;
        this.title = title;
        this.description = description;
    }

    public Offer(User user, String title, String description, byte[] photo, Region region) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.photo = photo;
        this.region = region;
    }

    @Override
    public String toString() {
        return "Offer{" +
                "id=" + id +
                ", user_id=" + user.getId() +
                ", title=" + title +
                ", description='" + description + '\'' +
                ", region_id=" + (region != null ? region.getId() : null) +
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

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public LocalDateTime getCreatedAt() {
        return created_at;
    }
}
