package md.utm.travelbuddy.repository;

import md.utm.travelbuddy.models.Offer;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;


@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    @NonNull
    Page<Offer> findAll(@NonNull Pageable pageable);
    @Query("SELECT o FROM Offer o WHERE " + 
    "(COALESCE(:titleQuery, '') = '' OR UPPER(o.title) LIKE CONCAT('%', UPPER(:titleQuery), '%') " +
            "OR UPPER(o.description) LIKE CONCAT('%', UPPER(:titleQuery), '%')) AND " +

            "(COALESCE(:locationFilter, '') = '' OR o.location = :locationFilter) AND "+
    "(COALESCE(:regionFilter, '') = '' OR o.region = :regionFilter) AND " +
    "(o.created_at BETWEEN :startDate AND :endDate)")
    List<Offer> findByQueryAndFilters(
        @Param("titleQuery") String titleQuery,
        @Param("locationFilter") String locationFilter,
        @Param("regionFilter") String regionFilter,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );
    @Modifying
    @Query("DELETE FROM Offer WHERE id = :id")
    void deleteOfferByIdMQuery(@Param("id") Long id);
}