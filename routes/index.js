module.exports = function(req, res) {
    let query = "SELECT * FROM `pet`";
    db.query(query, (err, result) => {
        res.render('index', {title: 'Royal PetShop', pet: result});
    })
}