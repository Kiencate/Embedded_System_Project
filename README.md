**Creating database and table**

```
create database test;

use test;

CREATE TABLE users (
id int() NOT NULL auto_increment,
name varchar(50) NOT NULL,
phone varchar(10) NOT NULL,
email varchar(50) NOT NULL,
cardId varchar(50) NOT NULL UNIQUE,
balance int,
PRIMARY KEY (id)
);


