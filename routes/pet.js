module.exports = {
    showPet: function (req, res) {
        let query = "SELECT * FROM `pet` WHERE name ='" + req.params.name + "'";
        let query2= "select * from `event` where name='"+req.params.name+"'";
        db.query (query, (err, result) => {
            //console.log(result);

            db.query(query2,(err,result1)=>{
                //console.log(result1);
                res.render('pet', {title: 'Royal PetShop',  pet: result[0], events:result1});
            })
            
        });
     },
     addPetEvent: function(req, res) {
         let query = "SELECT * FROM `event` WHERE event.name = '" + req.params.name + "'";
         //console.log(query)
         db.query(query, (err, result) => {
             //console.log(result);
             res.render('pet_form', {title: 'Royal PetShop',  event: result});
         })
     },

    //  dùng input mới dùng body còn k thì cứ params
     addPetEventSubmit: function(req, res) {
        let query = "INSERT INTO `event` VALUES('" + req.body.name + "','" + req.body.date +"','" + req.body.type + "','" + req.body.remark + "')";
        console.log(query);
        db.query(query, (err, result) => {
            console.log(result);
            res.redirect('/pet/' + req.body.name);
        })
    },
    editPetEvent: function(req, res) {
        let query = `SELECT * FROM \`event\` WHERE event.name = '` + req.params.name + `'`;
        db.query(query, (err, result) => {
            //console.log('result select',result);
            res.render('pet_form_edit',{title: 'Royal PetShop', event: result});
        })
    },
    editPetEventSubmit: function(req, res){
        let query = `UPDATE \`event\` SET date='` + req.body.date + `',type='` + req.body.type + `',remark='` + req.body.remark + `' WHERE name='` + req.params.name + `'`;
        db.query(query, (err, result) => {
            // console.log(result);
            res.redirect('/pet/' + req.params.name);
        }) 
    },
    deletePetEventSubmit: function(req, res) {
        let query = `DELETE FROM \`event\` WHERE name='` + req.params.name + `'`;
        db.query(query, (err, result) => {
            // console.log(result);
            res.redirect('/pet/'+ req.params.name)
        }) 
    }
}