DROP KEYSPACE IF EXISTS events;

CREATE KEYSPACE events WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE events;

CREATE TABLE views (
  id uuid,
  rate decimal,
  price decimal,
  zipOrigin int,
  zipDestination int,
  time_stamp text,
  PRIMARY KEY (zipOrigin, time_stamp, id)
); 

CREATE TABLE rides (
  id uuid,
  rate decimal,
  price decimal,
  zipOrigin int,
  zipDestination int,
  time_stamp text,
  PRIMARY KEY (zipOrigin, time_stamp, id)
);

COPY rides from '/usr/src/cassandra/fakeDataDocker.txt' with delimiter = ',';
