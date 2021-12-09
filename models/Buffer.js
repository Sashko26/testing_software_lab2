const {BINARY,DIRECTORY,BUFFER,LOG_TEXT,MAX_NUMBER_OF_ELEMENTS} =  require('./constant_types');
const { File_system_entity } =  require("./Entity");
const  {getRandomInt,getRandomString}  = require('./helper')
class BufferFile extends File_system_entity{
    
    constructor(name,isRoot,type,parent,root){
        super(name,isRoot,type,parent,root);
        this.queue = []
        
     //  console.log("Buffer file is created!");
    }
   
    push(data_elem)
    {
        if(this.queue.length>=MAX_NUMBER_OF_ELEMENTS)
        {
            return "buffer is overflowed!"
        }
        return this.queue.push(data_elem);
    }
    consume()
    {
        return this.queue.shift();
    }
}






function getRandomBufferFile(lenString,type,parent,root) 
{
  let nameOfFile = getRandomString(7) 
  let buf_file = new BufferFile(nameOfFile,false,type,parent,root)
  for(let i=0;i<15;i++)
  {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz0123456789!@#$%^&*()_+= ";  
    let randomstring = '';  
    for (let k=0; k<lenString; k++) {  
        let rnum = Math.floor(Math.random() * characters.length);  
        randomstring += characters.substring(rnum, rnum+1);  
    }
    buf_file.push(randomstring);
  }
  return buf_file;  
}

module.exports =  {BufferFile,getRandomBufferFile}