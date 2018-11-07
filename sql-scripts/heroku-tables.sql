drop table if exists waiter, shift, day cascade;

create table waiter (

    id primary key int not null,
    username text not null,
    firstname text not null,
    lastname text not null,
    email text not null,
    password text not null

)

