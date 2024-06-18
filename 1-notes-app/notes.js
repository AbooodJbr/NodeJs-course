const fs = require('fs')
const chalk = require('chalk')

const getNotes = function(){
    return loadNotes()
}

const addNote = function(title, body){
    //first we load all notes "array of notes"
    const notes = loadNotes()
    //we check if the title of the note  already exists
    const duplicateNotes = notes.filter(function(note){
        return note.title===title
    })

        //if it doesnt exist add it to the array, else dont add it
        if(duplicateNotes.length===0){
            notes.push({
                title : title,
                body : body
            })
            saveNotes(notes)
            console.log(chalk.bgBlue('new note added'))
        }
        else{
            console.log(chalk.bgGreen('note title taken'))
        }
}

const removeNote = function(title){
    const notes = loadNotes()
    if(notes.length!==0){
        const theNotes = notes.filter(function(note){
            return note.title!==title
        })
        saveNotes(theNotes)
        if(notes.length===theNotes.length) 
            console.log(chalk.bgGreen('theres no note with the same title to remove')) 
        else console.log(chalk.bgBlue('note removed'))
    }
    else {
        console.log(chalk.bgRed('there is no notes to remove'))
    }
    
}

const readNote = function(title){
    const notes = loadNotes()
    const note = notes.find((n)=> n.title===title)
    if(note===undefined) 
        console.log(chalk.bgRed('note is not available'))
    else console.log(chalk.bgGreen('title is ' + note.title + ' body is ' + note.body))
}

const listNotes = function(){
    const notes = loadNotes()
    notes.map(note => console.log(chalk.bgBlue(`title : ` + note.title + `body : ` + note.body)))
}

const saveNotes= function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function(){
    try{
        // if theres notes.json load notes and continue
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        //else return empty array
        return []
    }
}

module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    removeNote : removeNote,
    readNote : readNote,
    listNotes : listNotes
}