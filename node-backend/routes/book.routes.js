const express = require("express");
const app = express();

const bookRoute = express.Router();
let Book = require("../model/Book");

//Create
bookRoute.route("/add").post((req, res, next) => {
  Book.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      return next(err);
    });
});

//Read
bookRoute.route("/").get((req, res, next) => {
  Book.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      return next(err);
    });
});

// //Read[id]
bookRoute.route("/book/:id").get(async (req, res, next) => {
  try {
    const data = await Book.findById(req.params.id);
    if (!data) {
      // Handle case where no document is found with the given id
      return res.status(404).json({ message: "No document found with the given id" });
    }
    res.json(data);
  } catch (err) {
    // Handle errors
    return next(err);
  }
});


//Update
bookRoute.route("/update/:id").put(async (req, res, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
});



//Delete
// bookRoute.route("/delete/:id").delete((req, res, next) => {
//   Book.findByIdAndRemove(req.params.id, (err, data) => {
//     if (err) {
//       return next(err);
//     } else {
//       res.status(200).json({
//         msg: data,
//       });
//     }
//   });
// });
bookRoute.route("/delete/:id").delete(async (req, res, next) => {
  try {
    const deletedBook = await Book.findOneAndDelete({ _id: req.params.id });
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully", data: deletedBook });
  } catch (err) {
    next(err);
  }
});


module.exports = bookRoute;
