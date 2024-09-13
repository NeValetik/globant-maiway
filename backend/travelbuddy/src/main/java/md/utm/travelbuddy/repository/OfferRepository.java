package md.utm.travelbuddy.repository;

import md.utm.travelbuddy.models.Offer;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;


@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    @NonNull
    Page<Offer> findAll(@NonNull Pageable pageable);
    List<Offer> findByTitle(String titleQuery);
}