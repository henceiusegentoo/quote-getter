package eu.lschreiber.quotebackend;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/localization")
public class LocalizationController {
    private final LocalizationService localizationService;

    public LocalizationController(LocalizationService localizationService) {
        this.localizationService = localizationService;
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public Map<String, Object> retrieveLocalization(@RequestBody Map<String, Object> request) {
        String countryCode = (String) request.get("country_code");
        return localizationService.getLocalizedStrings(countryCode);
    }
}
