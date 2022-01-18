# MNTN Challenge
- Tools selection: I used JS and JS testing tools simply because they were on top of my head :) (Currently working with Express for one of my side projects, and using Mocha / Chai combination for unit testing)

- API selection: Reqres was on top of my Google search list for the 'pubic api for test' input, nothing specific about choosing this endpoint

- Test scenario:
    - Verify you can succesfully (=== 200) fetch the data from the https://reqres.in/users/1 endpoint
    - Verify response contains expected attributes
    - Verify response has expected JSON Schema
    - Verify response contains expected data

- Approach explanation: following the test logic: status code => attributes => schema => data, I would say this is my experience based approach, verifying the basics (succesfull response status code) and moving to the data validation towards the end. There is not much sense to waste the test execution resources on data validation before expected status code was verified

- Pros: 
    - time, took me under 1.5 hours to complete with the selected tools
    - behaviour driven development style support from chai improves test code readibility
    - ease of use / setup, you really need 2 commands (provided below) to start running your tests

- Cons (areas for improvements):
    - logging can be improved
    - test data can be separated from a test execution to a different file
    - if there was an authentication aspect, creating authenticated request could be separated into a utility function

Thanks for reading up to this point. May the force be with you! Instructions on how to run below: 

## Technologies
- JavaScript
- Node
- Chai 
- Chai-http
- Chai-Json-Schema
- Mocha 

## Usage
To run on local ->
open directory in terminal
- before running, install dependencies
```bash
npm i
```
- to run (this will run mocha)
```bash
npm test
```

## Test results
Mocha will output test results in CLI