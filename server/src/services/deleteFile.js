const fs = require('fs');
// to delete file
exports.deleteFile=(fileName)=>{
    fs.unlink(`public/uploads/${fileName}`,(err)=>{
        if(err){
            console.log("Error deleting file",err)
        }else{
            console.log("File deleted succesfully")
        }
    })
}
