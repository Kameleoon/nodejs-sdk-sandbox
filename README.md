# nodejs-sdk-sandbox

A sandbox for our Node.JS SDK. Please check our [SDK documentation](https://developers.kameleoon.com/nodejs-sdk.html).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone https://github.com/Kameleoon/nodejs-sdk-sandbox.git
$ cd nodejs-sdk-sandbox
$ npm install

Add your SDK credentials in client-nodejs.json
Add your domain and siteCode in index.js

$ npm start
```

In this code example, we are fetching all the experiments and featureflags from your backoffice. In a real environment, you will trigger your experiment one by one using a hardcoded ID.

Your app should now be running on [localhost:5000](http://localhost:5000/).