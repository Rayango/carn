CREATE KEYSPACE events WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE events;

CREATE TABLE views (
  rate float,
  price float,
  zip text,
  time text,
  PRIMARY KEY (rate, zip, time)
);

CREATE TABLE rides (
  rate float,
  price float,
  zip text,
  time text,
  PRIMARY KEY (rate, zip, time)
);

COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData.txt' with delimiter = ',';
COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData2.txt' with delimiter = ',';
COPY rides from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData3.txt' with delimiter = ',';
COPY views from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData4.txt' with delimiter = ',';
COPY views from '/Users/rngo/Desktop/HackReactor/hrsf86-thesis/fakeData/fakeData5.txt' with delimiter = ',';
