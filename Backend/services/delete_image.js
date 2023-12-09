 
const fs = require('fs');
const path = require('path');


module.exports = async (person_image_name,location)=> {
    if (location === 'persons_image') {
        try {
            const imagePath = path.join(__dirname, `../public/persons_image/${person_image_name}`);
            // console.log('Checking path:', imagePath);
            // console.log('Resolved Path:', path.resolve(__dirname, `../public/persons_image/${person_image_name}`));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(path.resolve(__dirname, `../public/persons_image/${person_image_name}`))
                return {status:true,msg:'ลบภาพสำเร็จ'}
            } else {
                console.log('File does not exist:', false);
                return {status:false,msg:'ไม่มีภาพให้ลบ'}
            }
        } catch (err) {
            console.error('Error checking file existence:', err);
            return false;
        }
    }
    return null;
}

 