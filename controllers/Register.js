const handleRegister= (req, res, db, bcrypt)=>{
    const{email, name, password} = req.body;
    if(!name || !password ||!email){
        res.status(400).json('Incorrect form submission')
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trans =>{
        trans.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            return trans('users')
                .returning('*')
                .insert({
                    email : loginEmail[0],
                    name : name,
                    joined : new Date()
                }).then(user =>{
                    res.json(user[0]);
                })
        })
        .then(trans.commit)
        .catch(trans.rollback)
    })
    .catch(err => res.status(400).json(err))
}

module.exports ={
    handleRegister : handleRegister
}