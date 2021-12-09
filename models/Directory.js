const File_system_entityJS =  require('./Entity.js');
class Directory  extends File_system_entityJS.File_system_entity{
    
    constructor(name,isRoot,type,parent,root){   
        super(name,isRoot,type,parent,root);
    }
    Delete()
    {
        super.Delete()
    }
    getListOfChildElements(){}
    //root.MoveСhildElement(name_of_moved_file.name,to_parent_obj);
    MoveСhildElement(childname,newParentName)
    {
        this.move(childname,newParentName)
    }
}

module.exports = {Directory}