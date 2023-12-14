const fs = require('fs')
const path = require('path')

module.exports = async (new_path, old_path) => {
    try{
        // console.log(old_path);
        // console.log(new_path);
        if(fs.existsSync(old_path)){
            fs.rename(old_path,new_path,()=>{
                console.log('RENAME FILE SUCCESS ');
                return true
            })
        }else{
            console.log('ERR : NO FILE IN DIRECTORY PLS CHECK YOUR PATH !');
            return false
        }
    }catch(err){
        console.log('caNT RENAME FILE , PLS CHECK ERR !!');
        console.log('ERR =>',err);
        return false 
    }
    
}