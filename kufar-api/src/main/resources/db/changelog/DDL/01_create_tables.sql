--liquibase formatted sql
--changeset Dima:create-tables

create table usr (
    id int,
    name varchar(20)
)