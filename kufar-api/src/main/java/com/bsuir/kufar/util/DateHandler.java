package com.bsuir.kufar.util;

import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

public class DateHandler {

    public String formatToDayMonthYear(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        return formatter.format(date);
    }
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

        long elapsedms = new Date().getTime() - date.getTime();
        long diff = TimeUnit.DAYS.convert(elapsedms, TimeUnit.MILLISECONDS);
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
        Period period = Period.between(convertDateToLocalDate(registrationDate.getTime()),
                convertDateToLocalDate(new Date().getTime()));

        StringBuilder sb = new StringBuilder("На форуме уже ");

        int years = period.getYears();
        if (years > 0) {
            sb.append(years + " " + getYearAddition(years));
        }
        int months = period.getMonths();
        if (months > 0) {
            sb.append(months + " " + getMonthAddition(months));
        }
        int days = period.getDays();
        if (days > 0) {
            sb.append(days + " " + getDayAddition(days));
        } else {
            sb.append("пару мгновений");
        }
        return sb.toString();
    }

    private LocalDate convertToLocalDateViaMillisecond(Date dateToConvert) {
        return Instant.ofEpochMilli(dateToConvert.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    public String getDayAddition(int num) {

        int preLastDigit = num % 100 / 10;
        if (preLastDigit == 1) {
            return "дней ";
        }
        return switch (num % 10) {
            case 1 -> "день ";
            case 2, 3, 4 -> "дня ";
            default -> "дней ";
        };
    }

    public String getMonthAddition(int num) {
        return switch (num) {
            case 1 -> "месяц ";
            case 2, 3, 4 -> "месяца ";
            default -> "месяцов ";
        };
    }

    public String getYearAddition(int num) {
        return switch (num) {
            case 1 -> "год";
            case 2, 3, 4 -> "года";
            default -> "лет";
        };
    }

    public LocalDate convertDateToLocalDate(Long mls) {
        return new Date(mls).toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }
}
