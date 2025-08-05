const express = require("express");
const { people } = require("../data");

const getPeople = (req, res) => {
   res.status(200).json({ success: true, data: people });
};

const addPerson = (req, res) => {
    const { name } = req.body;
    if (name) { 
        people.push({ id: people.length + 1, name: req.body.name });
        return res.status(200).json({ success: true, name: req.body.name});
    }
    res.status(400).json({ success: false, message: "Please provide a name" });
};

const addPersonPostman = (req, res) => {
    const { name } = req.body;
    if (name) {
        people.push({ id: people.length + 1, name: req.body.name });
        return res.status(200).json({ success: true, name: req.body.name });
    }
    res.status(400).json({ success: false, message: "Please provide a name" });
};

const updatePerson = (req,res) => {
      const { id } = req.params;
      const { name } = req.body;
    //   compare ids - Number converts from string to number
      const person = people.find((person) => person.id === Number(id));
      if (!person) {
        return res.status(404).json({ success: false, message: `${id} doesn't match ${name}` }); 
      }

      const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name;
        }
         return person
      });
      res.status(200).json({ success: true, data: newPeople });
}

const deletePerson = (req, res) => {
    //   compare ids - Number converts from string to number
    const person = people.find((person) => person.id === Number(req.params.id));
    if (!person) {
    return res
        .status(404)
        .json({ success: false, message: `No person with id: ${req.params.id}` });
    }
    // don't include person if id matches
    const newPeople = people.filter((person) => person.id !== Number(req.params.id));
    return res.status(200).json({success: true, data: newPeople });
}

module.exports = { getPeople, addPerson, addPersonPostman, updatePerson, deletePerson };