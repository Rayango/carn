DROP KEYSPACE IF EXISTS events;

CREATE KEYSPACE events WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE events;

-- // step 9 71 ms with 10M to select all entries for a given minute
CREATE TABLE views (
  id uuid,
  timeBucket text,
  rate decimal,
  price decimal,
  zipOrigin int,
  zipDestination int,
  time_stamp text,
  PRIMARY KEY (timeBucket, time_stamp, zipOrigin, rate, id)
); 


CREATE TABLE rides (
  id uuid,
  timeBucket text,
  rate decimal,
  price decimal,
  zipOrigin int,
  zipDestination int,
  time_stamp text,
  PRIMARY KEY (timeBucket, time_stamp, zipOrigin, rate, id)
);

-- -- // step 8 179ms ms with 10M to select all entries for a given minute
-- CREATE TABLE views (
--   id uuid,
--   timeBucket text,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY (timeBucket, zipOrigin, rate, id)
-- );


-- CREATE TABLE rides (
--   id uuid,
--   timeBucket text,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY (timeBucket, zipOrigin, rate, id)
-- );

-- -- // step 7 8 ms with 10M to query by a zipcode for a given minute
-- CREATE TABLE views (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY (zipOrigin, time_stamp, id)
-- );


-- CREATE TABLE rides (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY (zipOrigin, time_stamp, id)
-- );

-- -- // step 6 15 ms with 10M
-- CREATE TABLE views (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY (zipOrigin, time_stamp, rate)
-- );


-- CREATE TABLE rides (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY (zipOrigin, time_stamp, rate)
-- );

-- -- // step 5 1200 ms with 10M
-- CREATE TABLE views (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY (zipOrigin, rate, time_stamp)
-- );


-- CREATE TABLE rides (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY (zipOrigin, rate, time_stamp)
-- );

-- -- // step 4 2 ms with 1M
-- CREATE TABLE views (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY (zipOrigin, time_stamp, rate)
-- );


-- CREATE TABLE rides (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY (zipOrigin, time_stamp, rate)
-- );

-- -- // step 3 2206 ms with 1 M
-- CREATE TABLE views (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY ((time_stamp, zipOrigin), rate)
-- );

-- CREATE TABLE rides (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY ((time_stamp, zipOrigin), rate)
-- );

-- -- // step 2 957 ms with 1 M
-- CREATE TABLE views (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY (time_stamp, zipOrigin, rate)
-- );

-- CREATE TABLE rides (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   time_stamp text,
--   PRIMARY KEY (time_stamp, zipOrigin, rate)
-- );

-- // step 1 read error
-- CREATE TABLE views (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   timestamp text,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE rides (
--   id uuid,
--   rate decimal,
--   price decimal,
--   zipOrigin int,
--   zipDestination int,
--   timestamp text,
--   PRIMARY KEY (id)
-- );

COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData1.txt' with delimiter = ',';
COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData2.txt' with delimiter = ',';
COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData3.txt' with delimiter = ',';
COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData4.txt' with delimiter = ',';
COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData5.txt' with delimiter = ',';
-- COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData6.txt' with delimiter = ',';
-- COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData7.txt' with delimiter = ',';
-- COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData8.txt' with delimiter = ',';
-- COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData9.txt' with delimiter = ',';
-- COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData10.txt' with delimiter = ',';
