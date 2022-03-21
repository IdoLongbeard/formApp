const User = require('../../database/models/userModel');
const dbConnect = require('../../database/connection/dbconnect');
const passwordUtil = require('../../utils/passwordUtil');



const registerUser = async (req, res, next) => {

    passwordUtil(req.body.password).then((hashedPassword) => {
        User.create({
            email: req.body.email,
            password: hashedPassword
        }, function (err, user) {
            if (!err) {
                res.redirect('../../public/views/pages/home.ejs');
            } else {
                const error = {
                    msg: "User couldn't be created. Contact the system admin"
                };
                const alert = [error]

                res.render('../public/views/pages/register.ejs', {
                    alert
                });
            }

        })
    })
};

module.exports = registerUser;