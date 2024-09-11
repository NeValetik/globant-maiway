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
    @ManyToOne
    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;
    public Offer(){
    }
    public Offer(Long id, Long user_id, String title, String description) {
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
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
}
