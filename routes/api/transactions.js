const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const {check, validationResult} = require('express-validator');

// use asynchronous routes

// transactions index
router.get("/", passport.authenticate('jwt', { session: false }), 
    async (req, res) => {

    res.status(200).json({
      transactions: req.user.transactions
    });
});

// create a transaction
router.post("/", [
  check('transaction.date').not().isEmpty().withMessage("Date cannot be empty"),
  check('transaction.description').not().isEmpty().withMessage("Description cannot be empty"),
  check('transaction.amount').isNumeric().withMessage("Amount should be a number"),
  check('transaction.amount').not().isEmpty().withMessage("Amount cannot be empty"),
  check('transaction.category').not().isEmpty().withMessage("Category cannot be empty"),
],
  passport.authenticate("jwt", { session: false }), 
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() })
        }

        const { date, amount, description, category } = req.body.transaction;

        // adds new transaction to start of array and combines with rest of transactions
        await req.user
          .set({
            transactions: [
              {
                date,
                amount,
                description,
                category,
              },
              ...req.user.transactions,
            ],
          })
          .save();

        res.status(200).json({
            transactions: req.user.transactions
        });
});


// update a transaction 
router.patch("/update", [
  check('date').not().isEmpty().withMessage("Date cannot be empty"),
  check('description').not().isEmpty().withMessage("Description cannot be empty"),
  check('amount').isNumeric().withMessage("Amount should be a number"),
  check('amount').not().isEmpty().withMessage("Amount cannot be empty"),
  check('category').not().isEmpty().withMessage("Category cannot be empty"),
  ],
  passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {

      const { date, amount, description, category } = req.body;

      req.user.transactions.forEach(originalT => {
        if (originalT._id.toString() === req.body._id) {
          originalT.date = date;
          originalT.amount = amount;
          originalT.description = description;
          originalT.category = category;
        }
      })

      await req.user.save();

      // return the information from backend
      res.status(200).json({
        transactions: req.user.transactions,
      });
    } catch (errors) {
      
      return res.status(422).json({
        ...errors,
      });
    }
    
});


// delete a transaction

router.delete("/delete/:transactionId", passport.authenticate('jwt', { session: false }), 
    async (req, res) => {

    // select only the transactions that have object ids !== object id from body 
    // need to ensure types are same 

    const updatedTransactions = req.user.transactions.filter((t) => {
      return t._id.toString() !== req.params.transactionId
    });
    
    req.user.set({
      transactions: updatedTransactions,
    });

    await req.user.save();  // update user sans transaction in DB

    // return remaining transactions, or omit if needed 
    res.json({
        transactions: req.user.transactions
    });
});

// filter transactions by category type
router.get("/:category", passport.authenticate('jwt', { session: false }), 
    async (req, res) => {    

       const filteredTransactions = req.user.transactions.filter(t => {
        if (req.params.category === t.category) {
          return t
        }
      })

      const errors = {};
      
      if (filteredTransactions.length !== 0) {
        res.status(200).json({
          transactions: filteredTransactions
        });
      } else {
        errors.transactions = "There are no transactions in this category"
        return res.json(errors)
      }

});


module.exports = router;