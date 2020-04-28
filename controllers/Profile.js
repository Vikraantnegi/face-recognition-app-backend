const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '2f6f28013749434ea250dd7aab746198'
});

const handleApiCall = (req,res) => {
    app.models
    .predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input
    ).then(data => {
        res.json(data);
    }).catch(err => res.status(400).json('Unable to work with API'))
}

const handleProfile= (req, res, db) => {
    const {id} = req.params;
    db.select('*').from('users').where({id})
    .then(user =>{
        if(user.length){
            res.json(user[0]);
        }else{
            res.status(400).json('error getting user'); 
        }
    })
    .catch(err =>{
        res.status(400).json('no such user');
    })
}

module.exports = {
    handleProfile: handleProfile,
    handleApiCall : handleApiCall
}