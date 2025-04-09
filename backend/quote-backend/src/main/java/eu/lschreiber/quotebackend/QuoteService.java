package eu.lschreiber.quotebackend;

import eu.lschreiber.quotebackend.models.Quote;
import eu.lschreiber.quotebackend.repositories.QuoteRepository;
import org.springframework.stereotype.Service;

@Service
public class QuoteService {
    private final QuoteRepository quoteRepository;

    public QuoteService(QuoteRepository quoteRepository) {
        this.quoteRepository = quoteRepository;
    }

    public Quote getRandomQuote() {
        int minId = 1;
        int maxId = (int) quoteRepository.count();

        Integer randId = (int) (Math.random() * (maxId - minId + 1) + minId);

        return quoteRepository.findById(randId).orElse(null);
    }
}
