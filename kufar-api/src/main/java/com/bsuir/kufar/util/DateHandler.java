package com.bsuir.kufar.util;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

public class DateHandler {

    public String convertDateToMouthAndYear(Date date) {
        return DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG)
                .withLocale(new Locale("ru"))
                .format(convertToLocalDateViaMillisecond(date));
    }


    public String getDataForProduct(Date date) {

        StringBuilder formatedDate = new StringBuilder();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        String month = calendar.getDisplayName(Calendar.MONTH,
                Calendar.SHORT, new Locale("ru"));
        int hours = calendar.get(Calendar.HOUR_OF_DAY);
        int min = calendar.get(Calendar.MINUTE);

        String year = calendar.getDisplayName(Calendar.YEAR,
                Calendar.SHORT, new Locale("ru"));
        System.out.println(year);

        long elapsedms = new Date().getTime() - date.getTime();
        long diff = TimeUnit.DAYS.convert(elapsedms, TimeUnit.MILLISECONDS);
        System.out.println(diff);
        if (diff == 0) {
            formatedDate.append("сегодня, ");
        } else if (diff == 1) {
            formatedDate.append("вчера, ");
        } else {
            int day = calendar.get(Calendar.DAY_OF_MONTH);
            formatedDate.append(String.format("%d %s, ", day, month));
        }
        formatedDate.append(hours).append(":").append(min);
        return formatedDate.toString();
    }

    public String calculateForumParticipation(Date registrationDate) {
//        long differenceMs = new Date().getTime() - registrationDate.getTime();
//        long differenceInYears = (differenceMs / (1000L * 60 * 60 * 24 * 365));
//        long differenceInMonth = (differenceMs / (1000L * 60 * 60 * 24 * 365));
//        long differenceInDays = (differenceMs / (1000 * 60 * 60 * 24)) % 365;
//        return String.format("%d ",differenceInYears  difference_In_Days + " days")
        return "";
    }

    private LocalDate convertToLocalDateViaMillisecond(Date dateToConvert) {
        return Instant.ofEpochMilli(dateToConvert.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    public String getDayAddition(int num) {

        int preLastDigit = num % 100 / 10;
        if (preLastDigit == 1) {
            return "дней";
        }
        return switch (num % 10) {
            case 1 -> "день";
            case 2, 3, 4 -> "дня";
            default -> "дней";
        };
    }

    public String getYearAddition(int num) {

        int preLastDigit = num % 100 / 10;
        if (preLastDigit == 1) {
            return "дней";
        }
        return switch (num % 10) {
            case 1 -> "день";
            case 2, 3, 4 -> "дня";
            default -> "дней";
        };
    }
}
