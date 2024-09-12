package md.utm.travelbuddy.dto;

public class OfferResponseDTO {
    private Long id;
    private AuthorDTO author;
    private String thumbnail; // base64 encoded string
    private String title;
    private String body;

    // Inner class for Author details
    public static class AuthorDTO {
        private Long userId;
        private String userName;
        private int userAge;
        private String userPfp; // base64 encoded string for user profile photo

        // Getters and Setters
        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public int getUserAge() {
            return userAge;
        }

        public void setUserAge(int userAge) {
            this.userAge = userAge;
        }

        public String getUserPfp() {
            return userPfp;
        }

        public void setUserPfp(String userPfp) {
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

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
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
}
