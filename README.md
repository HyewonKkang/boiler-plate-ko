## boiler-plate-ko
#### _1. Project <boiler-plate-ko>_
  In information technology, a boilerplate is a unit of writing that can be reused over and over without change. By extension, the idea is sometimes applied to reusable programming, as in "boilerplate code."
#### _2. Project Info._
* part1. Node JS
  - Node JS : excutes JavaScript code outside of a browser
  - Express JS : a web application framework for Node.js
  - connected MongoDB
    + Mongoose : object modeling tool
  - MongoDB Model & Schema
    + A Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, validators, etc.. whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
  - Create register => client-server model
    + client->server : Request with Body -> Body-parser & PostMan
  - Used package Nodemon
  - Password encryption with Bcrypt for protect users' secret information
  - Login, Create token with Bcrypt
  - Create auth route (decode token with JWT)
  - Logout (delete user's token)
  
#### _3. References_
  * Inflearn URL : https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/
  * README.md => Diagram.html, Diagram.xml in lecture
