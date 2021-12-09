const {BINARY,DIRECTORY,BUFFER,LOG_TEXT}  = require('./constant_types');
const { File_system_entity }  = require("./Entity");
const  {getRandomInt,getRandomString}  = require('./helper')
class LogTextFile extends File_system_entity{
    
    constructor(name,isRoot,type,parent,root,init_data){
       super(name,isRoot,type,parent,root);
       this._data = init_data;
      // console.log("Log text file is created!");
    }
   
    addLine(new_line) {
       this._data =`${this._data}\n${new_line}`  
       return this._data 
      }
     getAlldata()
    {
      return this._data;   
    }
    
 

    
   
}
function getRandomLogText(lenString,type,parent,root)
{
   let nameOfFile = getRandomString(7) 
   let init_data =  getRandomString(lenString)
   let log_text =  new LogTextFile(nameOfFile,false,type,parent,root,init_data)
   return log_text 
}
module.exports =  {LogTextFile,getRandomLogText}