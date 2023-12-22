const db = require('../config/database');
require('dotenv').config();
const return_err = require('../services/return_err')
const date_convert = require('../services/date_convert')

// get all history list length 
module.exports.getHistoryLength = (req,res) =>{
    try{
        db.query(`SELECT COUNT(*) AS history_length FROM history_logs`, async(err,result)=>{
            if(err){
                return return_err(res,'QUERY BLOCK','GET HISTORY',err,500,'ไม่สามารถดึงข้อมูลได่')
            }
            res.status(200).json({
                status:true,
                staus_code:200,
                msg:'ดึงข้อมูลสำเร็จ',
                history_length : result[0].history_length
            })

        })
    }catch(err){
        return_err(res,'TRY CATCH','GET HISTORY',err,500,'ไม่สามารถดึงข้อมูลได่')
    }
}

// get all history list 
module.exports.getHistory = (req,res) =>{
    const start_item = req.body.start_item 
    const limit = req.body.limit 

    try{
        db.query(`SELECT * FROM history_logs ORDER BY history_logs_id DESC LIMIT ? OFFSET ? `,
        [limit,start_item], async(err,result)=>{
            if(err){
                return return_err(res,'QUERY BLOCK','GET HISTORY',err,500,'ไม่สามารถดึงข้อมูลได่')
            }

            for(let i = 0 ; i<result.length ; i++){
                result[i].history_logs_date = await date_convert(result[i].history_logs_date)
            }

            res.status(200).json({
                status:true,
                staus_code:200,
                msg:'ดึงข้อมูลสำเร็จ',
                history_data : result
            })
        })
    }catch(err){
        return_err(res,'TRY CATCH','GET HISTORY',err,500,'ไม่สามารถดึงข้อมูลได่')
    }
}

// search all history file 
module.exports.searchHistory = (req,res) => {
    const search_keyword = req.body.search_keyword
    const limit = req.body.limit
    const start_item = req.body.start_item

    let query_select = `SELECT * FROM history_logs WHERE history_logs_text LIKE ? ORDER BY history_logs_id DESC LIMIT ${limit} OFFSET ${start_item}` 

    try{
        db.query(query_select , ['%'+search_keyword+'%'] , async(err ,result) => {
            if(err) {
                return return_err(res,'QUERY BLOCK','SEARCH HISTORY',err,500,'ไม่สามารถดึงข้อมูลได่')
            }
            for(let i = 0 ; i<result.length ; i++){
                result[i].history_logs_date = await date_convert(result[i].history_logs_date)
            }
            let history_data_search = result
            try{
                db.query(`SELECT * FROM history_logs WHERE history_logs_text LIKE ?`,['%'+search_keyword+'%'] ,async(err,result)=>{
                    if(err) {
                        return return_err(res,'QUERY BLOCK(2)','SEARCH HISTORY GET LENGTH BLOCK',err,500,'ไม่สามารถดึงข้อมูลได่')
                    }
                    res.status(200).json({
                        status:true,
                        staus_code:200,
                        msg:'ดึงข้อมูลสำเร็จ',
                        history_data_search:history_data_search,
                        history_data_search_length:result.length
                    })
                })
            }catch(err){
                return_err(res,'TRY CATCH(2)','SEARCH HISTORY',err,500,'ไม่สามารถดึงข้อมูลได่')
            }
        })
    }catch(err){
        return_err(res,'TRY CATCH','SEARCH HISTORY',err,500,'ไม่สามารถดึงข้อมูลได่')
    }


}