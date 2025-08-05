/*
    Get: read data
    Post: insert data
    Put: update data
    Delete: delete data
*/
const express = require("express");
const router = express.Router();
const { getPeople, addPerson, addPersonPostman, updatePerson, deletePerson } 
= require("../controllers/people.js");

router.route('/').get(getPeople).post(addPerson);
// postman route is now: api/v1/people/postman
router.route('/postman').post(addPersonPostman);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;