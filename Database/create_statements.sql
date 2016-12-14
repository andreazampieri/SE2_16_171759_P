
CREATE SCHEMA IF NOT EXISTS myschema;

SET search_path TO myschema;

CREATE TABLE IF NOT EXISTS "user"(
	id SERIAL,
	username VARCHAR(25) NOT NULL,
	password VARCHAR(25) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE(username)
);

CREATE TABLE IF NOT EXISTS "testassociation"(
	userid INTEGER REFERENCES "user"(id),
	testid INTEGER REFERENCES "test"(id),
	locations VARCHAR(25) ARRAY,
	year DATE,
	PRIMARY KEY(userid,testid,year)
);

CREATE TABLE IF NOT EXISTS "test"(
	id SERIAL,
	name VARCHAR(50),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "university"(
	id SERIAL,
	name VARCHAR(50),
	initials VARCHAR(10),
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS "analytics"(
	testname VARCHAR(50),
	mean REAL,
	lastadmitted REAL
);