let db = require('../../database/models')

const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;
const getBaseUrl = (req) => req.protocol + '://' + req.get('host');

module.exports = {
    list : (req, res) => {
        db.Genre.findAll({
            include: [{association: "movies"}]
        })
        .then(genres => res.json({
          meta: {
              link: getUrl(req),
              status:200,
              total: genres.length
          },
          data: genres
        })
        )
    },
    detail : (req, res) => {
        db.Genre.findOne({
            where: {
                id: req.params.id
            },
            include: [{association: "movies"}]
        })
        .then(genre => {
            return res.status(200).json({
                meta: {
                    link: getUrl(req),
                    status:200,
                    name: genre.name
                },
                data: genre
            })
        })
    },
}