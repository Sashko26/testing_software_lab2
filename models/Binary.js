const constants =  require('./constant_types');
const { File_system_entity } =  require("./Entity");
const  {getRandomInt,getRandomString}  = require('./helper')
class BinaryFile extends File_system_entity{
    static  MAX_BUF_FILE_SIZE = 100; 
    constructor(name,isRoot,type,parent,root, data){
        super(name,isRoot,type,parent,root);
         this._data = data;
      // console.log("Binary file is created!");
    }
     ReadFile()
    {
        return this._data;
    }
}
function getRandomBinaryFile(lenString,type,parent,root) 
{
  var characters = "01";   
  let randomstring = '';  
  for (let k=0; k<lenString; k++) {  
    if(k%50 == 0)
    {
      randomstring += '\n'; 
    }
    else
    {
      let rnum = Math.floor(Math.random() * characters.length);  
      randomstring += characters.substring(rnum, rnum+1);
    }  
  }  
  let binary_file =  new BinaryFile(getRandomString(7),false,type,parent,root,randomstring)
  return binary_file;  
}
module.exports =  {BinaryFile,getRandomBinaryFile}