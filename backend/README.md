# Backend API 

Startup: *yarn server*


## Users

Returns:
```json
  {
    "user_id": 3,
    "auth_id": "cdef345",
    "email": "user3@none.com",
    "type": "0",
    "billing_date": null
  }
```

##Routes:

**/api/user**       -- Get list of all users

**/api/user/:id**   -- Get one user
