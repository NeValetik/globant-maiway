package md.utm.maiway.repository;

import md.utm.maiway.models.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {

    @Query("SELECT r FROM Region r JOIN FETCH r.country WHERE r.id = :regionId")
    Region findRegionWithCountryById(@Param("regionId") Long regionId);

}
