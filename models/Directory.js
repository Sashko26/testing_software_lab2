const File_system_entityJS =  require('./Entity.js');
class Directory  extends File_system_entityJS.File_system_entity{
    
    constructor(name,isRoot,type,parent,root){
        
        super(name,isRoot,type,parent,root);
          
           this.listOfSubDirectories = []
           this.listOfLogFiles = []
           this.listOfBinaryFiles = []
           this.listOfBufferFiles = []    
    }
   
    Delete()
    {
        super.Delete()
        this.listOfSubDirectories.length = 0
        this.listOfLogFiles.length = 0
        this.listOfBinaryFiles.length = 0
        this.listOfBufferFiles.length = 0
    }
    getListOfChildElements()
    {
        let arr_directories = this.listOfSubDirectories
        let arr_BinaryFiles = this.listOfBinaryFiles
        let arr_LogFiles = this.listOfLogFiles
        let arr_BufferFiles = this.listOfBufferFiles
        let sum_arr = arr_directories.concat(arr_BinaryFiles)
        sum_arr = sum_arr.concat(arr_LogFiles);
        sum_arr =  sum_arr.concat(arr_BufferFiles);
        return sum_arr; 
    }
   

    //root.MoveСhildElement(name_of_moved_file.name,to_parent_obj);
    MoveСhildElement(childname,newParentName)
    {
        this.move(childname,newParentName)
    }
}

module.exports = {Directory}