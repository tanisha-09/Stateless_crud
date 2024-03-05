# Stateless CRUD API

This repository contains the backend API for a stateless CRUD (Create, Read, Update, Delete) application. It provides endpoints for managing resources in a stateless manner.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/stateless_crud.git

2. Navigate to the project directory and install dependencies:

   ```bash
   cd stateless_crud
   npm install

3. To start the server, run the following command:

   ```bash
   npm start

## API Endpoints
Policies
Create Policy

Endpoint: POST /policies
Request Body: { "id": "policy_id", "user_name": "user_name", "amount": "amount", "policytype": "policy_type" }
Get All Policies

Endpoint: GET /policies
Claims
Create Claim

Endpoint: POST /claims
Request Body: { "id": "claim_id", "policy_id": "policy_id", "amount": "amount", "claimantName": "claimant_name", "claimDescription": "claim_description", "user_name": "user_name" }
Get Claim by ID

Endpoint: GET /claims/:id
Update Claim

Endpoint: PUT /claims/:id
Request Body: { "amount": "new_amount" }
Delete Claim

Endpoint: DELETE /claims/:id

## Note
Ensure to replace your-username with your GitHub username in the clone command.
The API uses in-memory data structures for demonstration purposes. For production use, consider using a database for data persistence.

