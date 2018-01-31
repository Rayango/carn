CREATE KEYSPACE events WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE events;

CREATE TABLE views (
  id uuid,
  rate decimal,
  price decimal,
  zip int,
  time timestamp,
  PRIMARY KEY (rate, zip, time)
);

CREATE TABLE rides (
  id uuid,
  rate decimal,
  price decimal,
  zip int,
  time timestamp,
  PRIMARY KEY (rate, zip, time)
);

-- COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData.txt' with delimiter = ',';
-- COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData2.txt' with delimiter = ',';
-- COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData3.txt' with delimiter = ',';
-- COPY views from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData4.txt' with delimiter = ',';
-- COPY views from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData5.txt' with delimiter = ',';
