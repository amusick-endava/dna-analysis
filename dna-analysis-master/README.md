# DNA Analysis

## Description
This project is a Node.js-based DNA mutation detection service. It provides a RESTful API endpoint that accepts a DNA sequence and determines whether it contains genetic mutations. The service analyzes the DNA sequence for sequences of four identical letters in diagonal, horizontal, or vertical directions. 

The API allows users to submit a DNA sequence via an HTTP POST request and receive a response indicating the presence or absence of a mutation. The project implements efficient algorithms to handle large-scale DNA analysis and can handle high traffic fluctuations.

This project also includes features such as storing verified DNA sequences in a database, providing statistics on mutation verifications, and unit tests with code coverage exceeding 80%.

## Features
- DNA mutation detection based on sequences of four identical letters
- RESTful API endpoint for mutation detection
- Database integration for storing verified DNA sequences
- Statistics endpoint for retrieving mutation verification statistics
- Unit tests with code coverage exceeding 80%

## Technologies Used
- Node.js v18.16.0
- Express.js
- Mocha
- Mongoose
- AWS Lambda (for serverless deployment)

See the `package.json` file for the full list of dependencies and their versions.

## Installation
To run this project, follow the steps below:

1. Install Node.js v18 using NVM or your preferred method.
2. Clone this repository to your local machine.
3. Navigate to the project directory.
4. Run the following command to install the dependencies:

   ```shell
   npm install
    ```
5. Once the dependencies are installed, you can start the project locally using the following command:

    ```shell
   npm run start
    ```
    This will start the project and make it accessible at http://localhost:3000.

    Alternatively, you can run the project using nodemon for automatic server restarts when changes are made in the source code. Run the following command:

   ```shell
   npm run dev
    ```
    This will start the project using nodemon and monitor the source code files for changes.

Now you have the project up and running locally!

## Usage
1. Ensure that the project is running locally as described in the [Installation](#installation) section.
2. Open your web browser and navigate to `http://localhost:3000` to access the application.
3. Now you can either POST a dna sequence to /mutation or GET stats from /stats
4. The dna sequences sent to the /mutation endpoint are saved indefinitely 

Here are a few examples to clarify what is and is not considered a mutation:
- mutation (contains 4 identical letters in the horizontal, vertical or diagonal direction): 
```json
[
    "ATGCGA",
    "CAGTGC",
    "TTATGT",
    "AGAAGG",
    "CCCCTA",
    "TCACTG"
]
```
- not a mutation (does NOT contain 4 identical letters in the horizontal, vertical or diagonal direction):
```json
[
    "ATGCGA",
    "CAGTGC",
    "TTATTT",
    "AGACGG",
    "GCGTCA",
    "TCACTG"
]
```

## API Endpoints
### `POST /mutation`

Description: Detects if a DNA sequence has a mutation based on the provided array of DNA strings. It will return a 200 success response when there is a mutation or a 403 forbidden response when there was no mutation.

Example cURL request:
```shell
curl -X POST -H "Content-Type: application/json" -d '{
"dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
}' http://localhost:3000/mutation
```

Example 200 success response:
```json
{
  "message": "DNA has a mutation"
}
```

Example 403 forbidden response:
```json
{
  "message": "DNA has no mutation"
}
```
### `GET /stats` 

Description: Retrieves statistics about the DNA verifications.

Example cURL request:
```shell
curl -X GET http://localhost:3000/stats
```

Example response:
```json
{
  "count_mutations": 6, // total mutations registered
  "count_no_mutation": 4, // total dna sequences without mutations that have been registered
  "ratio": 0.6 // ratio of mutations to dna sequences with no mutations
}
```
### Deployed Version
The endpoints described can also be accessed at https://7p0om6i4y2.execute-api.sa-east-1.amazonaws.com/latest

Example cURL GET stats request:
```shell
curl -X GET https://7p0om6i4y2.execute-api.sa-east-1.amazonaws.com/latest/stats
```

Example cURL POST mutation request:
```shell
curl -X POST -H "Content-Type: application/json" -d '{
"dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
}' https://7p0om6i4y2.execute-api.sa-east-1.amazonaws.com/latest/mutation
```

## Database Schema

The "dnas" collection in the MongoDB database follows the following schema:

### Attributes

- `dna_id` (ObjectId): The unique identifier for each DNA record.
- `has_mutation` (Boolean): Indicates whether the DNA has a mutation or not.
- `dna_matrix` (Array of Arrays of Strings): Represents the DNA sequence matrix.

### Example Document

Here's an example document in the "dnas" collection:

```json
{
  "_id": ObjectId("60927e661234567890abcdef"),
  "has_mutation": true,
  "dna_matrix": [
    ["A", "T", "G", "C", "G", "A"],
    ["C", "A", "G", "T", "G", "C"],
    ["T", "T", "A", "T", "G", "T"],
    ["A", "G", "A", "A", "G", "G"],
    ["C", "C", "C", "C", "T", "A"],
    ["T", "C", "A", "C", "T", "G"]
  ]
}
```

## Unit Tests

The application includes comprehensive unit tests written using Mocha, a popular JavaScript testing framework, and Sinon, a library for creating mock objects. The tests follow best practices for unit testing by focusing on testing individual functions and blocks of code in isolation.

### Running the Tests

To run the unit tests, follow these steps:

1. Make sure you have installed all the project dependencies by running `npm install`.
2. Open a terminal or command prompt.
3. Execute the following command:

   ```shell
   npm run test

## Code Coverage

Code coverage is an important aspect of the testing process. The project uses the Istanbul NYC tool to measure code coverage. Istanbul NYC is configured to measure the coverage of all files in the project, even those that do not have specific tests written for them yet. This helps identify areas of the codebase that require additional testing.

After running the tests, a code coverage report will be generated and visible in the console.

## Deployment

The application can be deployed to AWS Lambda using Claudia.js, a deployment tool for Node.js applications. Follow the steps below to deploy the application to your own AWS environment:

### Prerequisites

Before deploying the application, ensure that you have the following:

- AWS IAM credentials with the necessary permissions to create and manage AWS Lambda functions and API Gateway.
- Node.js installed on your machine.

### Deployment Process

1. Install the Claudia.js command-line tools globally by running the following command:

   ```shell
   npm install -g claudia
   ```

    Configure your AWS IAM credentials by either setting the appropriate environment variables or using the AWS CLI's aws configure command. Ensure that the configured credentials have the required permissions.

2. Open a terminal or command prompt and navigate to the root directory of the project.

    Run the following command to create the initial deployment:

    ```shell
    npm run create
    ```
    This command will create the necessary AWS resources, such as the Lambda function and API Gateway.

3. After the initial deployment, subsequent updates can be deployed using the following command:

    ```shell
    npm run deploy
    ```
    This command will update the existing deployment with any changes made to the codebase.

4. Once the deployment is successful, you will receive a URL that represents the deployed API.

    Use this URL to access the deployed API.

Please note that the deployment process requires AWS IAM credentials with the necessary permissions. Make sure to configure your credentials properly to avoid any authorization issues during deployment.

For more information on Claudia.js and its capabilities, refer to the [official documentation](https://claudiajs.com/).

## License
This project is licensed under the [MIT License](LICENSE).