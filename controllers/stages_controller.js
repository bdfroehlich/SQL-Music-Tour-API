//DEPENDENCIES
const { Op, BaseError } = require('sequelize');
const stages = require('express').Router();
const db = require('../models');
const { Stage } = db;

//FIND ALL STAGES
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            order: [ [ 'stage_name', 'ASC' ] ],
            where: {
                stage_name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE STAGE
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//CREATE STAGE
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body);
        res.status(200).json({
            message: 'Successfully created new stage',
            data: newStage
        });
    } catch (error) {
        res.status(500).json(error);
    }
})

//DELETE A STAGE
stages.delete('/:id', async (req, res) => {
    try {
        const deleteStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deletd ${deleteStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//EXPORT
module.exports = stages;
