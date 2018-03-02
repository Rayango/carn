# Car'N
## Images
<img width="1069" alt="screen shot 2018-02-08 at 7 31 55 pm" src="https://user-images.githubusercontent.com/26193071/36925595-7388239c-1e28-11e8-89a7-815499db0aef.png">

## Information
This is information about the Events microservice for Car'N.

### Service's Inputs and Outputs
The Events service is responsible for collecting data about all views and rides that occur.   After a user makes a ride request and receives a fare estimate, the user has the option of accepting or declining the ride.  Upon the user making a decision, that data is sent to the Events service, into an Amazon SQS queue instance, as JSON data in the following format:
```
{
  "id": "cbfa0b50-11d8-11e8-8355-d962b72a7d1f",
  “rate”: 5,
  “price”: 10.00,
  “zipOrigin” : 94122,
  “zipDestination”: 94105,
  “time”: "2018-02-08T22:28:34-0800",
  “ride”: true / false
}
```
With the data received from the Passengers Service, the Events service will have an offline process to aggregate information about surge pricing.  Also, at minute intervals, Events will send request and cancellation data to the Fares service; this data will be based on the past minute for each zip code.  Utilizing this data, Fares can adjust the surge price as needed, based on current user demand and driver supply.

The Events service’s ultimate job is to aggregate data on views / rides, that is to be used to answer our business question of whether there is a correlation between surge pricing and conversion from user views to ride booking.  This will be determined by finding the Pearson’s Correlation Coefficient of those two variables to determine the strength and nature (i.e. positive, negative) of the relationship.

### Constraints or Edge Cases

The Events service has no operations that need to happen in real-time, as it mainly handles offline processes.  The request data that it gets from Passengers is not time-sensitive, and is simply added to a queue that will eventually be processed by a worker.  The data is aggregated on a schedule, and the Events service will send request and cancellation data to Fares at regular intervals, for it to use as a prediction in calculating surge rate.

### Data Schema
```
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
```
Data will be stored using Cassandra because it is an available, partition-tolerant system that supports eventual consistency.  Cassandra is suited for writing large amounts of data quickly, which there will be a lot of because Events is responsible for logging all requests (ride acceptances and declinations) in the system.  Quick reads are not of utmost importance because Cassandra aggregates and reports data at set intervals of 1 minute.

### Conversion of Inputs to Outputs

After a passenger responds to the fare estimate, that response is sent to the Events service and placed in a message queue because the Events service does not need to send a response to the Passengers service.  The message is then processed when the Events service has available resources to do so.  Eventually, the Events service will dequeue that message and write it to the database. 

On a set schedule, historical cancellations and requests data for all zip codes will be sent to Fares for it to use in its adjustment of surge rates.

### Tools and Technologies

Server: Koa
Database: Cassandra
Queue: Amazon SQS
Testing: Mocha + Chai
Analysis: New Relic
Deployment: Docker, Amazon EC2



