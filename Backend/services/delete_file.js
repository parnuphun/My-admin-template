 
const fs = require('fs');
const path = require('path');


module.exports = async (file_name,location)=> {
    try {
        const imagePath = path.join(__dirname, `../public/${location}/${file_name}`);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(path.resolve(__dirname, `../public/${location}/${file_name}`))
            return {status:true,msg:'DELETE FILE SUCCESS !'}
        } else {
            console.log('CAN`T DELETE FILE , FILE DOSE NOT EXIST');
            return {status:false,msg:'FILE DOSE NOT EXIST'}
        }
    } catch (err) {
        console.error('ERR CHECKING FILES EXISTENCE : ', err);
        return false;
    }
 }

 