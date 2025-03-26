package eu.lschreiber.quotebackend;

import eu.lschreiber.quotebackend.models.Quote;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quote")
public class QuoteController {
    private final QuoteService quoteService;

    public QuoteController(QuoteService quoteService) {
        this.quoteService = quoteService;
    }

    @GetMapping
    public Quote retrieveRandomQuote() {
        return quoteService.getRandomQuote();
    }

}
