const sharp = require('sharp')
const path = require('path');
const fs = require('fs');

// Disable SIMD globally
sharp.simd(false);

module.exports = async (req,name)=> {
    let nname = `resize_${name}_${Math.round(Math.random()*100000)}_${Date.now()}.jpg`;
    try {
        await sharp(req.file.path)
          .resize(200)
          .jpeg({ quality: 70 })
          .toFile(path.join(__dirname,`../public/persons_image/${nname}`));
        
          console.log('After sharp processing . . . ');
          
          if(fs.existsSync(req.file.path)){
            fs.unlinkSync(req.file.path);
          } 
 
      } catch (error) {
        // handle error
        console.log('ERR ====>',error);
      }

      return nname
}

 