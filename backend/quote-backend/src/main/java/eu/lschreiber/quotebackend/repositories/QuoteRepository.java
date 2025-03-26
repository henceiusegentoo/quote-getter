package eu.lschreiber.quotebackend.repositories;

import eu.lschreiber.quotebackend.models.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Integer> {}
