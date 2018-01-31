CREATE KEYSPACE events WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE events;

CREATE TABLE views (
  id uuid,
  rate decimal,
  price decimal,
  zipOrigin int,
  zipDestination int,
  time text,
  PRIMARY KEY (id)
);

CREATE TABLE rides (
  id uuid,
  rate decimal,
  price decimal,
  zipOrigin int,
  zipDestination int,
  time text,
  PRIMARY KEY (id)
);

-- COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData1.txt' with delimiter = ',';
-- COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData2.txt' with delimiter = ',';
-- COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData3.txt' with delimiter = ',';
-- COPY views from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData4.txt' with delimiter = ',';
-- COPY views from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData5.txt' with delimiter = ',';
