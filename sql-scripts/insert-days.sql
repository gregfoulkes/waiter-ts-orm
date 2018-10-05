drop table day cascade;
create table day (
	id serial not null primary key,
    dayname varchar(20)
);

insert into day (dayname) values('Monday');
insert into day (dayname) values('Tuesday');
insert into day (dayname) values('Wednesday');
insert into day (dayname) values('Thursday');
insert into day (dayname) values('Friday');
insert into day (dayname) values('Saturday');
insert into day (dayname) values('Sunday');

