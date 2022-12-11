package com.bsuir.kufar.service;

import java.time.Duration;
import com.bsuir.kufar.entity.model.MoneyExchange;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class CurrencyService {

    private Double curOfficialRate = 0.0;
    private final WebClient webClient;

    @Value("${currency.api.usd}")
    private String url;

    public Double getCurrentUsdExchange() {
        if (curOfficialRate == 0.0) {
            System.out.println("Вызвался метод: " + this.getClass());
            Mono<MoneyExchange> moneyExchangeMono = webClient.get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(MoneyExchange.class);

            MoneyExchange block = moneyExchangeMono.block();
            curOfficialRate = block.getCurOfficialRate();
        }
        return curOfficialRate;
    }
}
