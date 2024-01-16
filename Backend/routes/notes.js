const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
// const { default: NoteState } = require('../../src/context/notes/NoteState');


// Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

  try {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('internal server error');
  }
})


// Route 2: Add a new note using: POST "/api/notes/addnote". login required

router.post('/addnote', fetchuser, [
  body('title', ('enter a valid title.')).isLength({ min: 3 }),
  body('description', 'enter a valid description').isLength({ min: 5 })], async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title, description, tag, user: req.user.id
      })
      const savednote = await note.save()
      res.json(savednote)

    } catch (error) {
      console.error(error.message);
      res.status(500).send('internal server error');
    }
  })


// Route 3: UPDATE an existing note using: PUT "/api/notes/updatenote". login required

router.put('/updatenote/:id', fetchuser, [body('title', ('enter a valid title.')).isLength({ min: 3 }),
body('description', 'enter a valid description').isLength({ min: 5 })],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const noteID = req.params.id
      const exitingNote = await Notes.findById(noteID);

      if (!exitingNote) {
        return res.status(404).send({ errors: 'note not found' });
      }

      // Ensure that the authenticated user owns the note before updating
      if (exitingNote.user.toString() !== req.user.id) {
        return res.status(401).send({ error: 'You are not authorized to update this note' })
      }

      // update the note

      exitingNote.title = title;
      exitingNote.description = description;
      exitingNote.tag = tag;

      const updatenote = await exitingNote.save()
      res.json(updatenote)

    } catch (error) {
      console.error(error.message);
      res.status(500).send('internal server error');
    }
  })

// Route 4: DELETE an existing note using: DELETE "/api/notes/deletenote". login required

router.delete('/deletenote/:id', fetchuser,
  async (req, res) => {
    try {
      const noteID = req.params.id
      const exitingNote = await Notes.findByIdAndDelete(noteID);

      if (!exitingNote) {
        return res.status(404).send({ errors: 'note not found' });
      }

      // Ensure that the authenticated user owns the note before updating
      if (exitingNote.user.toString() !== req.user.id) {
        return res.status(401).send({ error: 'You are not authorized to update this note' })
      }

      // delete note
      const deletenote = await exitingNote.deleteOne()
      // res.json(deletenote)
      if (deletenote) {
        return res.json({ message: 'Note deleted successfully'});
      }

    } catch (error) {
      console.error(error.message);
      res.status(500).send('internal server error')
    }
  })

module.exports = router;