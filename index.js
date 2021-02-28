var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended:false})
app.use(express.static('public'));

// var students = [
//     {
//         id:0,
//         firstName: 'Popescu',
//         lastName : 'Ion',
//         grade : 9.00
//     }, 
//     {
//         id :1,
//         firstName: 'Ionescu',
//         lastName : 'George',
//         grade : 10.00
//     },
//     {
//         id:2,
//         firstName: 'Georgescu',
//         lastName : 'Florin',
//         grade : 9.00
//     },
//     {
//         id:3,
//         firstName: 'Vasilescu',
//         lastName : 'Marian',
//         grade : 10.00
//     },
//     {
//         id:4,
//         firstName: 'Iliescu',
//         lastName : 'Fane',
//         grade : 8.00
//     },]

class Student {
    constructor(id, firstName, lastName, grade){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.grade = grade;
    }
}
var students = [];

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students', urlencodedParser, (req ,res) => {
    var newStudent = new Student(parseInt(req.body.id), req.body.fname, req.body.lname,  req.body.grade )
    students.push(newStudent);
    console.log(students);
    res.sendStatus(200);
});

// app.post('/students', urlencodedParser, (req ,res) => {
//     const newStudent = {
//         id: parseInt(req.body.id),
//         firstName: req.body.fname,
//         lastName: req.body.lname,
//         grade: req.body.grade
//         }
//         students.push(newStudent);
//         console.log(students);
//         res.sendStatus(200);
// });



app.get('/students/:id', (req,res)=>{
    
    const  studentSearch = students.some(student => student.id === parseInt(req.params.id))
    if(studentSearch){
        res.json(students.filter(student => student.id === parseInt(req.params.id)))
    } else {
        console.log("no user")
        res.status({msg : "no students with that id"})
    }
})


app.put('/update/:id', urlencodedParser, (req,res)=>{
    console.log("update route", students)
    const  studentSearch = students.some(student => student.id === parseInt(req.params.id))
    let searched_key = null;
    if(studentSearch){
       students.forEach(function (key, value) {
           if (key.id === parseInt(req.params.id)) {
            searched_key = value;
           }
       }) 
       console.log(req.body);
       console.log(searched_key);
       
       if (searched_key != null) {
        students[searched_key].firstName = req.body.fname;
        students[searched_key].lastName = req.body.lname;
        students[searched_key].grade = req.body.grade;
      }
      console.log(students[searched_key]);
     
      return res.sendStatus(200);
    } else {
        console.log("no user2")
        res.status({msg : "no students with that id"})
    }
    
})



app.delete('/delete/:id', (req, res)=>{
    students.forEach((key, index) => {
        if(req.params.id == key.id){
            students.splice(index,1);
        }
    });
    res.status(200).send("test");
}, (req, res, next)=>{
    var id = req.params.id;
    next();
})


app.listen(80, () => {
    console.log("Listening on 80")
});