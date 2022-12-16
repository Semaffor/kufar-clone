--liquibase formatted sql
--changeset Dima:create-tables

create sequence category_seq start with 1 increment by 5;
create sequence favourite_product_seq start with 1 increment by 5;
create sequence filter_seq start with 1 increment by 5;
create sequence message_seq start with 1 increment by 5;
create sequence product_seq start with 1 increment by 5;
create sequence subscription_search_seq start with 1 increment by 5;
create sequence user_code_seq start with 1 increment by 5;
create sequence usr_seq start with 1 increment by 5;

create table category
(
    id         bigint not null,
    is_deleted boolean default false,
    icon_name  varchar(255),
    name       varchar(255),
    primary key (id)
);
create table favourite_product
(
    id         bigint not null,
    is_deleted boolean default false,
    added_date date,
    product_id bigint,
    user_id    bigint,
    primary key (id)
);
create table filter
(
    id                bigint    not null,
    is_deleted        boolean default false,
    price_range_begin float(53) not null,
    price_range_end   float(53) not null,
    searching_string  varchar(255),
    primary key (id)
);
create table message
(
    id          bigint not null,
    is_deleted  boolean default false,
    message     varchar(255),
    product_id  bigint,
    receiver_id bigint,
    sender_id   bigint,
    primary key (id)
);
create table product
(
    id           bigint not null,
    is_deleted   boolean default false,
    created      timestamp(6),
    description  varchar(255),
    is_exchanged boolean default false,
    last_updated timestamp(6),
    name         varchar(255),
    price        float(53),
    status       smallint,
    category_id  bigint,
    creator_id   bigint,
    primary key (id)
);
create table product_photo
(
    product_id bigint not null,
    photo_name varchar(255)
);
create table subscription_search
(
    id               bigint not null,
    is_deleted       boolean default false,
    added_date       date,
    last_search_date date,
    filter_id        bigint,
    primary key (id)
);
create table user_role
(
    user_id bigint not null,
    roles   smallint
);
create table user_code
(
    id      bigint not null,
    code    varchar(255),
    user_id bigint,
    primary key (id)
);
create table usr
(
    id                bigint not null,
    is_deleted        boolean default false,
    email             varchar(255),
    is_activated      boolean default false,
    is_blocked        boolean default false,
    last_visit        date,
    login             varchar(255),
    password          varchar(255),
    registration_date date,
    primary key (id)
);
alter table if exists favourite_product add constraint FKph1g4qy7bjgqxacclx52clhrm foreign key (product_id) references product;
alter table if exists favourite_product add constraint FKt5n5m726ohagps5xpqw3x48o0 foreign key (user_id) references usr;
alter table if exists message add constraint FKg7eur9b0bprkuuds9ukkl7kjr foreign key (product_id) references product;
alter table if exists message add constraint FKh9thn2itwhtxx0v3eiwcmlua8 foreign key (receiver_id) references usr;
alter table if exists message add constraint FKk9hn6ad2oljcsy8pwqcu8e4ob foreign key (sender_id) references usr;
alter table if exists product add constraint FK1mtsbur82frn64de7balymq9s foreign key (category_id) references category;
alter table if exists product add constraint FK78j2s8l92qjhrrdaak9156hvo foreign key (creator_id) references usr;
alter table if exists product_photo add constraint FKsgi4krgb65fktq55a5xw6seqq foreign key (product_id) references product;
alter table if exists subscription_search add constraint FKqrtublcvfr5acey392pjiv37p foreign key (filter_id) references filter;
alter table if exists user_role add constraint FKfpm8swft53ulq2hl11yplpr5 foreign key (user_id) references usr;
alter table if exists user_code add constraint FKn7ithrbi2bt0xywoxxkc9wmw foreign key (user_id) references usr;
