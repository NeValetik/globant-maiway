package md.utm.maiway.repository;

import md.utm.maiway.models.Offer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    @NonNull
    Page<Offer> findAll(@NonNull Pageable pageable);

    // Method using country and region names
    @Query("SELECT o FROM Offer o " +
            "JOIN o.region r " +
            "JOIN r.country c " +
            "WHERE (COALESCE(:titleQuery, '') = '' OR UPPER(o.title) LIKE CONCAT('%', UPPER(:titleQuery), '%') " +
            "OR UPPER(o.description) LIKE CONCAT('%', UPPER(:titleQuery), '%')) AND " +
            "(COALESCE(:countryFilter, '') = '' OR UPPER(c.name) = UPPER(:countryFilter)) AND " +
            "(COALESCE(:regionFilter, '') = '' OR UPPER(r.name) = UPPER(:regionFilter)) AND " +
            "(o.created_at BETWEEN :startDate AND :endDate)")
    List<Offer> findByQueryAndFilters(
            @Param("titleQuery") String titleQuery,
            @Param("countryFilter") String countryFilter,
            @Param("regionFilter") String regionFilter,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    // Overloaded method using countryId and regionId
    @Query("SELECT o FROM Offer o " +
            "JOIN o.region r " +
            "JOIN r.country c " +
            "WHERE (COALESCE(:titleQuery, '') = '' OR UPPER(o.title) LIKE CONCAT('%', UPPER(:titleQuery), '%') " +
            "OR UPPER(o.description) LIKE CONCAT('%', UPPER(:titleQuery), '%')) AND " +
            "(COALESCE(:countryId, null) IS NULL OR c.id = :countryId) AND " +
            "(COALESCE(:regionId, null) IS NULL OR r.id = :regionId) AND " +
            "(o.created_at BETWEEN :startDate AND :endDate)")
    List<Offer> findByQueryAndFilters(
            @Param("titleQuery") String titleQuery,
            @Param("countryId") Long countryId,
            @Param("regionId") Long regionId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    @Modifying
    @Query("DELETE FROM Offer WHERE id = :id")
    void deleteOfferByIdMQuery(@Param("id") Long id);
}
