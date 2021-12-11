const db = require('../../database/models')

module.exports = {
    list: (req, res) => {
        db.Actor.findAll({ include: [{ association: "movies" }] })
            .then(actors => res.status(200).json(actors))
    },
    detail: (req, res) => {
        db.Actor.findByPk(req.params.id, { include: [{ association: "movies" }] })
            .then(actor => res.status(200).json(actor))
    },
    create: (req, res) => {
        const { first_name, last_name, rating, favorite_movie_id } = req.body
        db.Actor.create({first_name, last_name, rating, favorite_movie_id})
        .then(actor => res.status(201).json(actor))
    },
    
    delete: (req, res) => {
        db.actor_movie
        .destroy({
            where: {
                actor_id: req.params.id,
            },
        })
        .then(
            db.Actor.destroy({
                where:{
                    id:req.params.id,
                },
            })
            .then(() => {
                return res.status(201).json({
                    msg: "Actor eliminado",
                })
            })
            .catch((err) => res.status(400).send(err))
        )
    },
}