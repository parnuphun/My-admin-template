const sharp = require('sharp')
const path = require('path');
const fs = require('fs');

// Disable SIMD globally , dont know what is it but can fix err on linux.
sharp.simd(false);

module.exports = async (req)=> {
    let nname = `resize_${Math.round(Math.random()*100000)}_${Date.now()}.jpg`;
    try {
        await sharp(req.file.path)
          .resize(200,250)
          .jpeg({ quality: 70 })
          .toFile(path.join(__dirname,`../public/persons_image/${nname}`));
                  
          if(fs.existsSync(req.file.path)){
            fs.unlinkSync(req.file.path);
          } 
 
      } catch (error) {
        // handle error
        console.log('ERR : ',error);
      }

      return nname
}

 