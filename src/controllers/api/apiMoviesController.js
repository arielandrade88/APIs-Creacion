const { promiseImpl } = require('ejs');
let db = require('../../database/models')

const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;
const getBaseUrl = (req) => req.protocol + '://' + req.get('host');

module.exports = {
    
    create: (req,res) => {
        const { title, rating, awards, release_date, length, genre_id } = req.body
        db.Movie.create({
            title,
            rating,
            awards,
            release_date,
            length,
            genre_id,
        })
        .then(movie => {
            res.status(201).json({
                meta: {
                    endPoint: getUrl(req),
                    msg: "Movie added successfully",
                },
                data: movie,
            })
        })
        .catch(error => {
            switch (error.name) {
                case "SequelizeValidationError":
                    let errorsMsg = []
                    let notNullErrors = []
                    let validationsErrors = []
                    error.errors.forEach(error => {
                        errorsMsg.push(error.message)
                        if (error.type == "notNull Violation") {
                            notNullErrors.push(error.message)
                        }
                        if (error.type == "Validation error") {
                            validationsErrors.push(error.message)
                        }
                    });
                    let response = {
                        status: 400,
                        message: "missing or wrong data",
                        errors: {
                            quantity: errorsMsg.length,
                            msg: errorsMsg,
                            notNull: notNullErrors,
                            validations: validationsErrors
                        }
                    }
                    return res.status(400).json(response)
                    
                default:
                    return res.status(500).json({
                        error,
                    })
            }
        })
    },
    
    delete: (req,res) => {
        let actorUpdate = dbActor.update({
            favorite_movie_id: null
        },{
            where: {
                favorite_movie_id: req.params.id,
            },
        })
        let actorMovieUpdate = db.actor_movie.destroy({
            where: {
                movie_id: req.params.id
            }
        })
        promise.all([actorUpdate, actorMovieUpdate])
        .then(
            db.Movie.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                if (result) {
                    return res.status(200).json({
                        msg: "movie deleted sccessfully"
                    })
                } else {
                    return res.status(400).json({
                        msg: "no changes"
                    })
                }
            })
            .catch(error => res.status(500).json(error))
        )
    },
}