package eu.lschreiber.quotebackend;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/localization")
public class LocalizationController {
    private final LocalizationService localizationService;

    public LocalizationController(LocalizationService localizationService) {
        this.localizationService = localizationService;
    }

    @PostMapping
    public Map<String, Object> retrieveLocalizedStrings(String countryCode) {
        return localizationService.getLocalizedStrings(countryCode);
    }
}
