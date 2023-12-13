 
const fs = require('fs');
const path = require('path');


module.exports = async (file_name,location)=> {
    try {
        const imagePath = path.join(__dirname, `../public/${location}/${file_name}`);
        // console.log('Checking path:', imagePath);
        // console.log('Resolved Path:', path.resolve(__dirname, `../public/persons_image/${file_name}`));
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(path.resolve(__dirname, `../public/${location}/${file_name}`))
            return {status:true,msg:'ลบไฟล์สำเร็จ'}
        } else {
            console.log('File does not exist:', false);
            return {status:false,msg:'ไม่มีไฟล์'}
        }
    } catch (err) {
        console.error('Error checking file existence:', err);
        return false;
    }
 }

 