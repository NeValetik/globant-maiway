package md.utm.travelbuddy.repository;

import md.utm.travelbuddy.models.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    @Query(value = "SELECT * FROM offers o ORDER BY o.id OFFSET ?1 LIMIT ?2", nativeQuery = true)
    List<Offer> getPageLimitedOffers(int offset, int limit);
}
