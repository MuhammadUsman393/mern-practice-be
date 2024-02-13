const express = require("express");
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetch-user");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Fetch All Users detail using: Get "/api/notes/fetch-all-notes".
router.get("/fetch-all-notes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Internal Server Error." });
  }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/add-note". Login required
router.post(
  "/add-note",
  fetchuser,
  [
    body("title", "Title is required").exists(),
    body("description", "Description is required").exists(),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "Internal Server Error." });
    }
  }
);

// ROUTE 3: Update an existing Note using: PUT "/api/notes/update-note/id". Login required
router.put("/update-note/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};

    if (title) {
      newNote.title = title;
    }

    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ error: "Not Found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Not Allowed" });
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error." });
  }
});

// ROUTE 3: Delete a Note using: DELETE "/api/notes/delete-note/id". Login required
router.delete("/delete-note/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ error: "Not Found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Not Allowed" });
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error." });
  }
});

module.exports = router;
