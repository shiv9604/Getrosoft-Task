# GetrosoftTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Prevent Api Limit Exceed countries Api

Naviate to `app/shared/services/user/user.service.ts` file, Comment `url = null` line in `getCountries()` method.

Now our Countries will be loading from `src/data/countries.json` so we have another 50 request limit for beeceptor api.

### BeeCeptor Mock API's Setup If Current Server not working or api limit exceeded.

Please follow below mentioned steps for setting up another beeceptor free server if current one is not live or api limit exhasted.

1. Navigate to `https://beeceptor.com/mock-api/?ref=free-api`.
   
2. **`/api/countries` Setup :-**
   1. Copy `src/assets/data/countries.json` content and paste into `Add your JSON or XML API response payload here...` textarea mentioned on webpage.
   2. Add `/api/countries` to Request path endpoint & Click **Create Mock Server Button**.
   
3. **`/api/register` Setup :-**
   1. Click on `Mocking Rules` below Rules Enabled toggle button on `https://app.beeceptor.com/console/{Your Console Id}` page.
   2. Click on **Create New Rule**, `Method - POST`, `Match Value/expression - /api/register`,` Response delay - 0.5`, `Response body - Copy src/assets/data/countries.json content & paste into response body`, `Rule Description - Register User` & click on **Save Rule** button.
   
4. **`/api/check-username/` Setup :-**
   1. Click on `Mocking Rules` below Rules Enabled toggle button on `https://app.beeceptor.com/console/{Your Console Id}` page.
   2. Click on **Create New Rule**, `Method - GET`, `Request Condition - Request Path Match, Match Value/expression - /api/check-username/`, `Response delay - 0.5`, `Response body - Copy src/assets/data/username-availability.json content & paste into response body`, `Rule Description - Check Username Availability` & click on **Save Rule** button.
   
5. `Setup URL in App :-` Copy Beeceptor Base URL displayed on `https://app.beeceptor.com/console/{Your Console Id}` page & paste in `src/enviornments/enviornment.ts` file baseUrl in place of in hostedUrl if we consider format for url `{hostedUrl}/api` and save.

---
You are All set with API Setup for our User Registration Application.
---
