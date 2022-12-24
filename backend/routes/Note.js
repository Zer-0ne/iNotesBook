import express from 'express'
import fetchuser from '../middleware/FetchUser.js'
import { body, validationResult } from "express-validator";
import Notes from '../models/Notes.js'
const router = express.Router()


// ROUTE 1: GET ALL THE NOTES GET: "/api/notes/fetchallnotes" login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {

        // fetching notes
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        // console.log(error.message);
        res.status(500).json("Internal Server Error");
    }
})


// ROUTE 2: ADD A NEW NOTES POST: "/api/notes/addnotes" login required
router.post('/addnotes', [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
        min: 5,
    })
], fetchuser, async (req, res) => {
    try {

        // if any error
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        // adding notes
        const { title, description, tag } = req.body
        const note = new Notes({
            user: req.user.id,
            title,
            description,
            tag,
        })
        const notedSaved = await note.save()
        // const notes = await Notes.find({ user: req.user.id })
        res.json(notedSaved)
    } catch (error) {
        // console.log(error.message);
        res.status(500).json("Internal Server Error");
    }

})


// ROUTE 3: UPDATE NOTES PUT: "/api/notes/updatenote" login required --->POST SE BHI HO JYGA... LEKIN SB PUT KRTE HIA TOH HMM HI KR DETE HAI or structure achi shi ho jati hia or hmm ek sath alg alg endpoint me ek sath 1 se jada kaam krwa skte hai
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {

        // if any error
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        // update notes
        const { title, description, tag } = req.body
        const newNotes = {}
        if(title ){
            newNotes.title = title
        }
        if(description){
            newNotes.description =description
        }
        if(tag){
            newNotes.tag=tag
        }

        // find notes 
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send('Not Found')
        }

        // checking user are authorized to update the notes 
        if(note.user.toString()!==req.user.id){
            return res.status(401).send('Not Allowed!!')
        }


        // find the note to be update
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true})
        res.json(note)
        

    } catch (error) {
        // console.log(error.message);
        res.status(500).json("Internal Server Error");
    }

})


// ROUTE 4: DELETE NOTES put: "/api/notes/delete" login required
router.put('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        // if any error
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        // find notes  is exist or not
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send('Not Found')
        }

        // checking user are authorized to delete the notes 
        if(note.user.toString()!==req.user.id){
            return res.status(401).send('Not Allowed!!')
        }


        // find the note to be update
        note = await Notes.findByIdAndDelete(req.params.id)
        res.send({'Secuss':'Note has been deleted!',note:note})
        
    } catch (error) {
        // console.log(error.message);
        res.status(500).json("Internal Server Error");
    }

})
export default router