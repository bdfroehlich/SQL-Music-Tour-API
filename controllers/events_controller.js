//DEPENDENCIES
const { Op } = require('sequelize');
const events = require('express').Router();
const db = require('../models');
const { Event } = db;

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

//DELETE A BAND
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
