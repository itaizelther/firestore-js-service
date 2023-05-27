# firestore-js-service
A sample JavaScript server, which provides generic access to fetch & update firestore collections.
I've developed and used this project as a backend server to my [Lender Tracker App](https://github.com/itaizelther/LenderTracker-client) project.

This repository can give you an easy access to your firestore collections via REST API, eliminating the hassle of accessing your managing and accessing your data.

Sub-collections are currently not supported.

## Demo
In my firestore project, I've got a collection named `items`.

<img src="https://github.com/itaizelther/firestore-js-service/assets/10050676/8902cd51-42c6-4142-b1eb-9c388dcbba12">


One may query this collection using the following paths:
| Path | Description |
| --- | --- |
| `/api/items` | Fetch all items in the `items` collection |
| `/api/items/BOLI2758` | Fetch the item with the ID `BOLI2758` from the `items` collection |
| `/api/items?name=Book` | Fetch all items with the field `name: Book` from the `items` collection |

And can also update the data using regular JSON body in an HTTP POST request:
```js
axios({
  method: 'post',
  url: '/api/items',
  data: {
    name: 'Pencil',
    ownerName: 'Williams'
  }
});
```

## How to run
Make sure to fill your own firebase config in [connector.js](db/connector.js).
Go to the root directory and run the following command:
```
npm start
```
