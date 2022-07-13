const authDAO = require('../model/authDAO');

const login =  async (req, res) => {
    console.log(req.body);  
    const parameters = {
        "name" : req.body.name,
        "passwd" : req.body.passwd
    };

    const result = await authDAO.checkUserID(parameters);
    if(result[0].exist == 1){
        res.cookie('name', parameters.name);
        res.redirect('/main');
    } else {
        res.send(`<script type='text/javascript'>alert('회원가입 필요'); window.location="/auth/signup" </script>`);
    }
}

const signUp = async (req, res) => {
    const parameters = {
        "name" : req.body.name,
        'passwd' : req.body.passwd
    };

    const check = await authDAO.checkUserID(parameters);
    if(check[0].exist == 1){
        res.send(`<script type='text/javascript'>alert('이미 있는 회원입니다.'); history.go(-1); </script>`);
    } else {
        const result = await authDAO.insertUser(parameters);
        res.cookie('name', parameters.name);
        res.redirect('/main');
    }
}

const signUpPage = async (req, res) => {
    res.render('signup');
}

module.exports = {
    login,
    signUp,
    signUpPage
}