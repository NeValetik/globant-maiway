package md.utm.travelbuddy.repository;

import md.utm.travelbuddy.models.Offer;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
//import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;


@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    @NonNull
    Page<Offer> findAll(@NonNull Pageable pageable);
    @Query("SELECT o FROM Offer o WHERE LOWER(o.title) LIKE LOWER(CONCAT('%', :titleQuery, '%')) AND (o.created_at BETWEEN :startDate AND :endDate)")
    List<Offer> findByTitleContainingAndOptionalDateRange(
        @Param("titleQuery") String titleQuery,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );
}