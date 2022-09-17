module.exports = {
  getItem: (req, res) => {
    console.log(req);
    res.render("item.ejs");
  },
};
