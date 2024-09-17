package md.utm.travelbuddy.models;

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
    private Long user_id;

    @Column(name = "title", length = 800)
    private String title;

    @Column(name = "description", length = 999)
    private String description;

    @Column(name = "photo", columnDefinition = "BYTEA")
    private byte[] photo;

    public Offer(){
    }
    public Offer(Long user_id, String title, String description) {
        this.user_id = user_id;
        this.title = title;
        this.description = description;
    }

    public Offer(Long userId, String title, String body, byte[] photo) {
        this.user_id = userId;
        this.description = body;
        this.title = title;
        this.photo = photo;
    }

    @Override
    public String toString() {
        return "Offer{" +
                "id=" + id +
                ", user_id=" + user_id +
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
        return user_id;
    }

    public void setUserId(Long user_id) {
        this.user_id = user_id;
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

    // Getter and Setter
   
}
