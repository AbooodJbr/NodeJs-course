  //const fs = require('fs')
//to write on a file, it removes everything in the file and rewrite it
  //fs.writeFileSync("notes.txt", "this file was created by abood!")
// this one appends (keeps the old stuff and write more) without new line
  //fs.appendFileSync("notes.txt", "2nd try by using append")

 //console.log("1st")

// to use variables from another file we use require to get them
// const name = require('./utils.js')
// console.log(name)

// console.log("2nd")


//we used functions from another file
//---------------------------------
// const add  = require('./utils')
// const sum = add(4,-2)
// console.log(sum)
//---------------------------------
// const notes = require('./notes')
// const msg = notes()
// console.log(msg)

// validator(the v is lowercase) : a module used for strings only
   //const validator = require('validator')

//a method used to check if the string is email or not
    //console.log(validator.isEmail('abood@gmail.com')) // true
   // console.log(validator.isEmail('abood.com')) //small

//a method to check if the string is URL 
    //console.log(validator.isURL('https://www.youtube.com/')) // true
   // console.log(validator.isURL('www.youtube.com/')) // true
   // console.log(validator.isURL('https:www.youtube.com/')) // false


//a module to color strings in console
    // const chalk = require("chalk")
    // console.log(chalk.blue.bold.inverse('success!'))

//how to get input from the user and print it in the console
    // console.log(process.argv[2])

    // const add = process.argv[2]
    // if(add==='add'){
    //   console.log('adding notes')
    // }
    // else if(add==='remove'){
    //   console.log('removing notes')
    // }

const yargs = require('yargs')
// console.log(process.argv)
// console.log(yargs.argv)

//to switch versions of yargs
//yargs.version("")

const notes = require('./notes')

//how to add commands to yargs
yargs.command({
  command : 'add', //command name
  describe : 'adding new note', //desc for the new command
  builder : {
        title : {
          describe : "note title",
          demandOption : 'true', //to make sure to write it, make it required
          type : 'string' //it only comes as a string
        },
        body : {
          describe : "note body",
          demandOption : 'true', // make it required
          type : 'string' //it only comes as a string
        }
  },
  handler : function(argv){ //the function it works
    notes.addNote(argv.title, argv.body)
  }
})

yargs.command({
  command : 'remove',
  describe : 'remove note',
  builder : {
    title : {
      describe : "note title",
      demandOption : 'true', //to make sure to write it, make it required
      type : 'string' //it only comes as a string
    }
},
  handler : function(argv){
    notes.removeNote(argv.title)
  }
})

yargs.command({
  command : 'read',
  describe : 'read note',
  builder : {
    title : {
      describe : "note title",
      demandOption : 'true', //to make sure to write it, make it required
      type : 'string' //it only comes as a string
    }
},
  handler : function(argv){
    notes.readNote(argv.title)
  }
})

yargs.command({
  command : 'list',
  describe : 'list notes',
  handler : function(){
    notes.listNotes()
  }
})


// console.log(yargs.argv)
//yargs wroks if we do console.log the only way to make it work is by typing 
yargs.parse()