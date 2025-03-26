package eu.lschreiber.quotebackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class LocalizationService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> getLocalizedStrings(String countryCode) {
        String query = "SELECT * FROM langs WHERE country_code = ?";

        return jdbcTemplate.queryForMap(query, countryCode);

    }
}
