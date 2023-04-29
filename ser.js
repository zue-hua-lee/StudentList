#!/usr/bin/env node

import fs from 'fs'
import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 9595

app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})
app.use(express.static(`${__dirname}/dist`))

import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/list', (req, res) => {
  fs.readFile('./students.json', function (err, data) {
    if(err){return console.error(err)}
    var string = ""
    data = JSON.parse(data)
    for(var key in data)
      string += key + " : " + data[key] + "<br>"  
    if(string == "")
      string += "No student's data."
    res.send(string)
  })
})

app.post('/search', (req, res) => {
  if(`${req.body.search_id}` == ""){
    res.send("Please enter student ID.")
    return 0
  }
  fs.readFile('./students.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    for(var key in data){
      if(key == `${req.body.search_id}`){
        res.send("Hello, " + data[key] + ".")
        return 0
      }
    }
    res.send("Student not found.")
  })
})

app.post('/add', (req, res) => {
  if(`${req.body.add_id}` == "" || `${req.body.add_name}` == ""){
    res.send("Please enter student's information.")
    return 0
  }
  fs.readFile('./students.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    var string = "Adding success."
    for(var key in data){
      if(key == `${req.body.add_id}`)
        string = "Modify student name."
    }
    data[`${req.body.add_id}`] = `${req.body.add_name}` 
    fs.writeFile('./students.json', JSON.stringify(data), function (err) {
      if(err){return console.error(err)}
    })
    res.send(string + "<br>" +
             "new student ID : " + `${req.body.add_id}` + "<br>" +
             "new student name: " + `${req.body.add_name}`)
  })
})

app.post('/delete', (req, res) => {
  if(`${req.body.delete_id}` == ""){
    res.send("Please enter student ID.")
    return 0
  }
  fs.readFile('./students.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    for(var key in data){
      if(key == `${req.body.delete_id}`){
          res.send("Deleting success.<br>" +
                   "delete student ID : " + key + "<br>" +
                   "delete student name: " + data[key])
        delete data[key]
        fs.writeFile('./students.json', JSON.stringify(data), function (err) {
          if(err){return console.error(err)}
        })
        return 0
      }
    }
    res.send("Student not found.")
  })
})
