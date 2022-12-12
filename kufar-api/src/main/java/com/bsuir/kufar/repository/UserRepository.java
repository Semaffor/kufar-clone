package com.bsuir.kufar.repository;

import com.bsuir.kufar.entity.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepository extends BaseRepository<User> {

    User findByLogin(String login);

    User findByEmail(String email);
//    Mono<User> findMonoByLogin(String login);

    User findByLoginAndPassword(String login, char[] password);

    @Query("select count(u) from User u inner join Product p on p.creator = u where u.id=:userId"
    + " and p.isDeleted=false")
    int findTotalAdv(@Param("userId") Long userId);
}
