1️⃣ Generate Authentication Token
curl -X POST http://localhost:6000/auth/token \
     -H "Content-Type: application/x-www-form-urlencoded"

📌 Response:
{
  "access_token": "your_jwt_token",
  "token_type": "Bearer",
  "expires_in": 3600
}
2️⃣ Get Limits
curl -X GET http://localhost:6000/limits/123456789/sandbox \
     -H "Authorization: Bearer your_jwt_token" \
     -H "Content-Type: application/json"
📌 Response:
{
  "limitScope": "User",
  "identifier": "user@example.com",
  "inboundLimits": null,
  "outboundLimits": [
    {
      "limitId": "181001",
      "type": "FundingCap",
      "range": "Daily",
      "limitValue": 500,
      "createdDateTimeUTC": "2024-02-14T10:00:00Z",
      "modDateTimeUTC": "2024-02-15T10:00:00Z"
    }
  ]
}

3️⃣ Add New Limit
curl -X POST http://localhost:6000/limits/123456789/sandbox \
     -H "Authorization: Bearer your_jwt_token" \
     -H "Content-Type: application/json" \
     -d '{
          "limitScope": "User",
          "identifier": "user@example.com",
          "direction": "Outbound",
          "limits": [
            {
              "type": "FundingCap",
              "range": "Daily",
              "limitValue": 500
            }
          ]
        }'
📌 Response:
{
  "limitScope": "User",
  "identifier": "user@example.com",
  "inboundLimits": null,
  "outboundLimits": [
    {
      "limitId": "181002",
      "type": "FundingCap",
      "range": "Daily",
      "limitValue": 500,
      "createdDateTimeUTC": "2024-02-14T10:00:00Z",
      "modDateTimeUTC": "2024-02-15T10:00:00Z"
    }
  ]
}
4️⃣ Update Existing Limit
curl -X PUT http://localhost:6000/limits/123456789/sandbox \
     -H "Authorization: Bearer your_jwt_token" \
     -H "Content-Type: application/json" \
     -d '{
          "limitScope": "User",
          "identifier": "user@example.com",
          "direction": "Outbound",
          "limits": [
            {
              "type": "FundingCap",
              "range": "Daily",
              "limitValue": 1000
            }
          ]
        }'
📌 Response:
{
  "limitScope": "User",
  "identifier": "user@example.com",
  "inboundLimits": null,
  "outboundLimits": [
    {
      "limitId": "181002",
      "type": "FundingCap",
      "range": "Daily",
      "limitValue": 1000,
      "createdDateTimeUTC": "2024-02-14T10:00:00Z",
      "modDateTimeUTC": "2024-02-16T10:00:00Z"
    }
  ]
}
5️⃣ Delete Limit
curl -X DELETE http://localhost:6000/limits/123456789/sandbox \
     -H "Authorization: Bearer your_jwt_token" \
     -H "Content-Type: application/json" \
     -d '{
          "limitScope": "User",
          "identifier": "user@example.com",
          "direction": "Outbound",
          "limits": [
            {
              "type": "FundingCap",
              "range": "Daily"
            }
          ]
        }'
📌 Response:
HTTP/1.1 204 No Content

📌 1. Authentication API (Token Generation)
🔹 Test: Invalid Credentials
curl -X POST http://localhost:6000/auth/token
📌 Response:
{
  "responseCode": 401,
  "description": "Authentication Error",
  "messageSource": "PayCenter API",
  "details": [
    {
      "code": "AUTH-001",
      "description": "Invalid Consumer Key or Secret"
    }
  ]
}
📌 2. Get Limits API
🔹 Test: Invalid Token
curl -X GET http://localhost:6000/limits/123456789/sandbox \
     -H "Authorization: Bearer invalid_token"
📌 Response:
{
  "responseCode": 401,
  "description": "Unauthorized",
  "messageSource": "PayCenter API",
  "details": [
    {
      "code": "AUTH-002",
      "description": "Invalid or expired access token"
    }
  ]
}
🔹 Test: Missing Required Headers
curl -X GET http://localhost:6000/limits/123456789/sandbox
📌 Response:
{
  "responseCode": 400,
  "description": "BadRequest",
  "messageSource": "PayCenter API",
  "details": [
    {
      "code": "PA-1015",
      "description": "PaymentNetwork is required"
    }
  ]
}

📌 3. Post Limits API (Add Limits)
🔹 Test: Missing identifier Field
curl -X POST http://localhost:6000/limits/123456789/sandbox \
     -H "Authorization: Bearer valid_token" \
     -H "Content-Type: application/json" \
     -d '{
          "limitScope": "User",
          "direction": "Outbound",
          "limits": [
            {
              "type": "FundingCap",
              "range": "Daily",
              "limitValue": 500
            }
          ]
        }'
📌 Response:
{
  "responseCode": 400,
  "description": "BadRequest",
  "messageSource": "PayCenter API",
  "details": [
    {
      "code": "PA-1003",
      "description": "Identifier is required"
    }
  ]
}
🔹 Test: Invalid limitValue Type
curl -X POST http://localhost:6000/limits/123456789/sandbox \
     -H "Authorization: Bearer valid_token" \
     -H "Content-Type: application/json" \
     -d '{
          "limitScope": "User",
          "identifier": "user@example.com",
          "direction": "Outbound",
          "limits": [
            {
              "type": "FundingCap",
              "range": "Daily",
              "limitValue": "invalid_number"
            }
          ]
        }'
📌 Response:
{
  "responseCode": 400,
  "description": "BadRequest",
  "messageSource": "PayCenter API",
  "details": [
    {
      "code": "PA-1012",
      "description": "Limit value must be a number"
    }
  ]
}
📌 4. Put Limits API (Update Limits)
🔹 Test: Invalid range Value
curl -X PUT http://localhost:6000/limits/123456789/sandbox \
     -H "Authorization: Bearer valid_token" \
     -H "Content-Type: application/json" \
     -d '{
          "limitScope": "User",
          "identifier": "user@example.com",
          "direction": "Outbound",
          "limits": [
            {
              "type": "FundingCap",
              "range": "Yearly",
              "limitValue": 1000
            }
          ]
        }'
📌 Response:
{
  "responseCode": 400,
  "description": "BadRequest",
  "messageSource": "PayCenter API",
  "details": [
    {
      "code": "PA-1025",
      "description": "Invalid limit range"
    }
  ]
}
🔹 Test: Update Limit Without Required Fields
curl -X PUT http://localhost:6000/limits/123456789/sandbox \
     -H "Authorization: Bearer valid_token" \
     -H "Content-Type: application/json" \
     -d '{}'
📌 Response:
{
  "responseCode": 400,
  "description": "BadRequest",
  "messageSource": "PayCenter API",
  "details": [
    {
      "code": "PA-1009",
      "description": "Limits field is required"
    }
  ]
}
📌 5. Delete Limits API
🔹 Test: Invalid type Value
curl -X DELETE http://localhost:6000/limits/123456789/sandbox \
     -H "Authorization: Bearer valid_token" \
     -H "Content-Type: application/json" \
     -d '{
          "limitScope": "User",
          "identifier": "user@example.com",
          "direction": "Outbound",
          "limits": [
            {
              "type": "InvalidType",
              "range": "Daily"
            }
          ]
        }'
📌 Response:
{
  "responseCode": 400,
  "description": "BadRequest",
  "messageSource": "PayCenter API",
  "details": [
    {
      "code": "PA-1024",
      "description": "Invalid limit type"
    }
  ]
}
🔹 Test: Delete Limit Without limits Field
curl -X DELETE http://localhost:6000/limits/123456789/sandbox \
     -H "Authorization: Bearer valid_token" \
     -H "Content-Type: application/json" \
     -d '{
          "limitScope": "User",
          "identifier": "user@example.com",
          "direction": "Outbound"
        }'
📌 Response:
{
  "responseCode": 400,
  "description": "BadRequest",
  "messageSource": "PayCenter API",
  "details": [
    {
      "code": "PA-1009",
      "description": "Limits field is required"
    }
  ]
}


