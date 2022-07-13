const unLogin = (req, res) => {
    res.render('login');
}

const Login = (req, res) => {
    console.log(req.cookies);
    res.render('index2', { params : req.cookies });
}

module.exports = {
    unLogin,
    Login
}