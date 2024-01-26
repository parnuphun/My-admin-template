const db = require('../config/database');
require('dotenv').config();
const return_err = require('../services/return_err')
const date_convert = require('../services/date_convert');
const { dbQuery } = require('../services/query');

// get all history list length 
module.exports.getHistoryLength = async (req,res) =>{
    try{
        const qr_get_length = `SELECT COUNT(*) AS length FROM history_logs`
        const result_length = await dbQuery(qr_get_length)
        const length = result_length[0].length
        
        res.status(200).json({
            status_code:200,
            status:true,
            history_length : length
        })

    }catch(err){
        return_err(res,'TRY CATCH','GET HISTORY LENGTH ',err,500)
    }
}

// get all history list 
module.exports.getHistory = async (req,res) =>{
    try {
        const start_item = req.body.start_item 
        const limit = req.body.limit 

        const qr_get_data = `SELECT * FROM history_logs ORDER BY history_logs_id DESC LIMIT ? OFFSET ?`
        const result_data = await dbQuery(qr_get_data,[limit,start_item])

        // format data
        for(let i = 0 ; i<result_data.length ; i++){
            result_data[i].history_logs_date = await date_convert(result_data[i].history_logs_date)
        }

        res.status(200).json({
            status_code:200,
            status:true,
            history_data : result_data
        })

    } catch (err) {
        return_err(res,'TRY CATCH','GET HISTORY',err,500)
    }
}

// search all history file 
module.exports.searchHistory = async (req,res) => {

    try {
        const search_keyword = req.body.search_keyword
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_search_length = `SELECT COUNT(*) AS length FROM history_logs WHERE history_logs_text LIKE ?`
        const qr_search = `SELECT * FROM history_logs WHERE history_logs_text LIKE ? ORDER BY history_logs_id DESC LIMIT ? OFFSET ?`
        
        const result_search_length = await dbQuery(qr_search_length,['%'+search_keyword+'%'])
        const length = result_search_length[0].length
        const result_search = await dbQuery(qr_search,['%'+search_keyword+'%' , limit , start_item])
        res.status(200).json({
            status:true,
            status_code:200,
            history_data_search:result_search,
            history_data_search_length:length
        })

        // format data
        for(let i = 0 ; i<result_search.length ; i++){
            result_search[i].history_logs_date = await date_convert(result_search[i].history_logs_date)
        }

    } catch (err) {
        return_err(res,'TRY CATCH','SEARCH HISTORY',err,500)
    }
}