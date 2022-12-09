package com.bsuir.kufar.util;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Date;
import java.util.Locale;

public class DateHandler {

    public String convertDateToMouthAndYear(Date date) {
        return DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG)
                        .withLocale(new Locale("ru"))
                        .format(convertToLocalDateViaMillisecond(date));
    }

    protected LocalDate convertToLocalDateViaMillisecond(Date dateToConvert) {
        return Instant.ofEpochMilli(dateToConvert.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }
}
