const { dbQuery } = require('../services/query');
const date_convert = require('../services/date_convert')
const return_err = require('../services/return_err')

// get data to main page 
module.exports.mainPage =  async(req,res) => {
    try {
        const qr_school_banner = `SELECT banner_img , banner_slogan , anno_limit FROM school_setting WHERE id = 1`
        const qr_anno_image = `SELECT * FROM announment WHERE anno_pin = 1 ORDER BY anno_date DESC LIMIT ?`
        const qr_news = `SELECT * FROM news ORDER BY news_date DESC LIMIT 4`
        const qr_activity_image = `SELECT * FROM activity_image ORDER BY activity_image_date DESC LIMIT 8`
    
        const result_banner = await dbQuery(qr_school_banner)
        const limit = result_banner[0].anno_limit

        
        const result_anno_image = await dbQuery(qr_anno_image,[limit])
        const result_news = await dbQuery(qr_news)
        const result_activity_img = await dbQuery(qr_activity_image)
       
        // format date
        if(result_news.length >= 1){
            for (let i = 0; i < result_news.length; i++) {
                result_news[i].news_date = await date_convert(result_news[i].news_date,false,true)
            }
        }

        res.status(200).json({
            status: true,
            status_code: 200 ,
            base_image_path : {
                base_banner_img : process.env.BANNER_PATH,
                base_anno_img : process.env.ANNO_IMAGE,
                base_activity_img : process.env.ACTIVITY_IMAGE ,
                base_news_img : process.env.NEWS_COVER_IMAGE
            },
            main_data : {
                banner : result_banner ,
                anno : result_anno_image ,
                news : result_news,
                activity_img : result_activity_img
            }
        })

    } catch (err) {
        return_err(res,'TRY CATCH','GET DATA CLIENT MAIN ',err,500)
    }
}

// get activity image length
module.exports.getActivityImageLengthClient = async(req,res) =>{ 
    try {
        const qr_length = `SELECT COUNT(*) AS length FROM activity_image `
        const result_length = await dbQuery(qr_length)
        const length = result_length[0].length

        res.status(200).json({
            status: true,
            status_code: 200 ,
            data_length:length
        })
    } catch (err) {
        return_err(res,'TRY CATCH','GET ACTIVITY IMAGE LENGTH FOR CLIENT',err,500)
    }
}

// get activity image list
module.exports.getActivityImageListClient = async(req,res) =>{
    try {
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_activity_image = `SELECT * FROM activity_image ORDER BY activity_image_date DESC LIMIT ? OFFSET ?`
        const result = await dbQuery(qr_activity_image,[limit,start_item])

        res.status(200).json({
            status: true,
            status_code: 200 ,
            base_image_path: process.env.ACTIVITY_IMAGE,
            data_list:result
        })


    } catch (err) {
        return_err(res,'TRY CATCH','GET ACTIVITY IMAGE FOR CLIENT',err,500)
    }
}

// get news length
module.exports.getNewsLengthClient = async (req,res) => {
    try {
        const qr_length = `SELECT COUNT(*) AS length FROM news `
        const result_length = await dbQuery(qr_length)
        const length = result_length[0].length

        res.status(200).json({
            status: true,
            status_code: 200 ,
            data_length:length
        })
    } catch (err) {
        return_err(res,'TRY CATCH','GET NEWS LENGTH FOR CLIENT',err,500)
    }
}

// get news list 
module.exports.getNewsListClient = async(req,res) =>{
    try {
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_news = `SELECT * FROM news ORDER BY news_date DESC LIMIT ? OFFSET ?`
        const result_news = await dbQuery(qr_news,[limit,start_item])

        // format date
        if(result_news.length >= 1){
            for (let i = 0; i < result_news.length; i++) {
                result_news[i].news_date = await date_convert(result_news[i].news_date,false,true)
            }
        }

        res.status(200).json({
            status: true,
            status_code: 200 ,
            base_image_path: process.env.NEWS_COVER_IMAGE,
            news_data_list:result_news
        })


    } catch (err) {
        return_err(res,'TRY CATCH','GET NEWS LIST FOR CLIENT',err,500)
    }
}

// get news contents 
module.exports.getNewsContent = async(req,res) => {
    try {
        const id = req.body.news_id
        const qr_get_content = `SELECT * FROM news WHERE news_id = ?`
        const qr_get_category_name = `SELECT * FROM news_category WHERE news_category_id = ?`
        const result_data = await dbQuery(qr_get_content,[id])
        const result_category_name = await dbQuery(qr_get_category_name,[result_data[0].news_category])
        result_data[0].news_date = await date_convert(result_data[0].news_date,false,true)
        result_data[0].news_category_name = result_category_name[0].news_category_name

        res.status(200).json({
            status_code : 200 ,
            status:true ,
            contents: result_data[0]
        })
    } catch (err) {
        return_err(res,'TRY CATCH','GET DATA CLIENT MAIN ',err,500)
    }
}