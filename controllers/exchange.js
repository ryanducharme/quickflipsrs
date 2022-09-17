
module.exports = {
  getItem: (req, res) => {
    console.log(req.body);

    res.render("item.ejs");
  },
};
