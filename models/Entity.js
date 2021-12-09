const constants =  require('./constant_types');
const {BINARY,DIRECTORY,BUFFER,LOG_TEXT,MAX_NUMBER_OF_ELEMENTS} =  require('./constant_types');
class File_system_entity 
{
    constructor(name,isRoot,type,parent,root){ }
    searched(name,object_of_searcing) {}
    Delete(){}
    traversalAndSearchDirectory(name,object_of_searching){}
    move(move_object_name,name_of_new_parent){}
}
module.exports = {File_system_entity};