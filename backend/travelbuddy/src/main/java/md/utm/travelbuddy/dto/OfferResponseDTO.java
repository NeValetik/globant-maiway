package md.utm.travelbuddy.dto;

public class OfferResponseDTO {
    private Long id;
    private AuthorDTO author;
    private byte[] photo; // Still in byte[] format
    private String title;
    private String body;
    private String creationDate;

    public static class AuthorDTO {
        private Long userId;
        private String username;
        private int userAge;
        private byte[] userPfp; // Still in byte[] format
        private String name;
        private String email;

        public void setEmail(String email) {
            this.email = email;
        }

        public String getEmail() {
            return this.email;
        }
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        // Getters and Setters
        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public int getUserAge() {
            return userAge;
        }

        public void setUserAge(int userAge) {
            this.userAge = userAge;
        }

        public byte[] getUserPfp() {
            return userPfp;
        }

        public void setUserPfp(byte[] userPfp) {
            this.userPfp = userPfp;
        }
    }

    // Getters and Setters for OfferResponseDTO
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AuthorDTO getAuthor() {
        return author;
    }

    public void setAuthor(AuthorDTO author) {
        this.author = author;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public void setCreationDate(String creationDate){
        this.creationDate = creationDate;
    }
    public String getCreationDate(){
        return this.creationDate;
    }
}
