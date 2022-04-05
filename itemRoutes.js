const express = require("express");
const { captureStackTrace } = require("./expressError");
const expressError = require("./expressError");
const router = new express.Router();
const items = require("./fakeDb");

router.get("/", (req, res) => {
  res.json({ items });
});

router.get("/:item", (req, res) => {
  const foundItem = items.find(i => i.item === req.params.item);
  if (foundItem === undefined) {
    throw new expressError("Item not found", 404);
  }
  res.json({ item: foundItem });
});

router.post("/", (req, res, next) => {
  try {
    if (!req.body.item || !req.body.price) {
      throw new expressError("item name/price required", 400);
    }
    const newItem = { item: req.body.item, price: req.body.price };
    items.push(newItem);
    return res.status(201).json({ item: newItem });
  } catch (e) {
    return next(e);
  }
});

router.patch("/:item", (req, res, next) => {
  try {
    let foundItem = items.find(i => i.item === req.params.item);
    if (foundItem === undefined) {
      throw new expressError("Item not found", 404);
    }
    foundItem.item = req.body.item;
    foundItem.price = req.body.price;
    return res.json({ item: foundItem });
  } catch (e) {
    return next(e);
  }
});

router.delete("/:item", (req, res, next) => {
  let foundItem = items.findIndex(i => i.item === req.params.item);
  if (foundItem === -1) {
    throw new expressError("Item not found", 404);
  }
  items.splice(foundItem, 1);
  res.json({ message: "Item Deleted" });
});

module.exports = router;
