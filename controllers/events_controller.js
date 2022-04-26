//DEPENDENCIES
const { Op } = require('sequelize');
const events = require('express').Router();
const db = require('../models');
const { Event, Meet_Greet, Band, Set_Time, Stage } = db;

//FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ [ 'date', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (err) {
        res.status(500).json(err)
    }
})

// FIND A SPECIFIC EVENT
events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { name: req.params.name },
            include: [
                { 
                    model: Meet_Greet, 
                    as: "meet_greets", 
                    include: {
                         model: Band, 
                         as: "band", 
                    } 
                },
                { 
                    model: Set_Time, 
                    as: "set_times",
                    include: [
                        { model: Band, 
                            as: "band" },
                        { model: Stage, 
                            as: "stage" }
                    ]
                },
                { 
                    model: Stage, 
                    as: "stages",
                    through: { attributes: [] }
                }
            ]
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE EVENT
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//CREATE EVENT
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(200).json({
            message: 'Successfully created new event',
            data: newEvent
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

//DELETE AN EVENT
events.delete('/:id', async (req, res) => {
    try {
        const deleteEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deletd ${deleteEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//EXPORT
module.exports = events;
