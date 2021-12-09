const constants =  require('./constant_types');
const {BINARY,DIRECTORY,BUFFER,LOG_TEXT,MAX_NUMBER_OF_ELEMENTS} =  require('./constant_types');
class File_system_entity 
{
    constructor(name,isRoot,type,parent,root)
    {
        if(parent == undefined && isRoot == false || isRoot == false && root==undefined || parent == undefined && isRoot == undefined || isRoot == undefined && root==undefined)
        {
            throw `Not root value can't be without root or parent!`
        }

        if(root!=undefined)
        {
           let el 
           el  =  root.searched(name,root);
           
           if(el!=undefined)
           {
               return  "Please, change your name. It isn't unique!"
           }
        }
        if(parent!=undefined)
        {
            let list =  parent.getListOfChildElements()
            for(let i=0;i<list.length;i++)
            {
                if(list[i].name == name)
                {
                        console.log( ` Name ${name} is not unique in folder ${parent.name} folder!!!
                        Try to think about other:)`)
                }
            }
        }
       
            if(isRoot==true || parent.number_of_elements<MAX_NUMBER_OF_ELEMENTS)
            {       
                    this.__searched_element = undefined
                    this.name =name
                    this.isRoot=isRoot
                   
                    this.isBinary = false; 
                    this.isDirectory = false;
                    this.isBuffer = false;  
                    this.isLogText = false; 
                    
                    if (type == constants.BINARY)
                    {
                        this.isBinary = true; 
                    }
                    else if (type == constants.DIRECTORY)
                    {
                        this.isDirectory = true; 
                        this.number_of_elements = 0;
                    }
                    else if (type == constants.BUFFER)
                    {
                        this.isBuffer = true; 
                    }
                    else if (type == constants.LOG_TEXT)
                    {
                        this.isLogText = true; 
                    }
                    
                if(parent!=undefined && isRoot!=true && root!=undefined)
                {   
    
                    this.parent  = parent
                    this.parent.number_of_elements +=1; 
                    this.root = root
                    let slesh = '/'
                    if(parent.isRoot == false)
                    {
                        this.location = parent.location+slesh+parent.name
                    }
                    else{
                        this.location = parent.name+slesh
                    }
                    if(this.isDirectory)
                    {
                        parent.listOfSubDirectories.push(this)
                    }
                    if(this.isBinary)
                    {
                        parent.listOfBinaryFiles.push(this)
                    }
                    if(this.isBuffer)
                    {
                        parent.listOfBufferFiles.push(this)
                    }
                    if(this.isLogText)
                    {
                        parent.listOfLogFiles.push(this)
                    }
                   
                }
                else if(parent == undefined && isRoot == true && root == undefined)
                {
                    this.location = '.'
                    this.isRoot =true
                    this.root = this
                }
                else 
                {
                    console.log(`Error of creating ${type}!`)
                    return;
                }
            }
        
       
        else{
            return `${type} is not created! because parent is overflowed!` 
        }  
    }

     searched(name,object_of_searcing) 
     {
        object_of_searcing.__searched_element = undefined;
         this.traversalAndSearchDirectory(name,object_of_searcing);
        return object_of_searcing.__searched_element;
     }

    Delete()
    {
        let list_of_entities;
        if(this.isDirectory)
        {
            if(this.isRoot == true)
            {
               this.isRoot = 'deleted' 
            }
            else
            {
               list_of_entities = this.parent.listOfSubDirectories   
               this.parent=null;
            }
        }
        else if(this.isBinary)
        {
            list_of_entities = this.parent.listOfBinaryFiles;
        }
        else if(this.isLogText)
        {
            list_of_entities = this.parent.listOfLogFiles;
        }
        else if(this.isBuffer)
        {
            list_of_entities = this.parent.listOfBufferFiles;
        }
   
        if(list_of_entities!=undefined)
        {
            for(let i = 0;i< list_of_entities.length;i++)
            {
                if(list_of_entities[i].name == this.name)
                {

                    list_of_entities.splice(i, 1);  
                }
            }
        }
        
    }
    traversalAndSearchDirectory(name,object_of_searching) 
    {           
                    if(this.name == name)
                    {
                        object_of_searching.__searched_element = this
                    }
                    if(this.listOfBinaryFiles)
                    {
                        for(let i = 0; i < this.listOfBinaryFiles.length; i += 1)
                        {
                            if(this.listOfBinaryFiles[i].name == name )  
                            {
                                object_of_searching.__searched_element = this.listOfBinaryFiles[i]
                            }     
                        }
                    }
                    if(this.listOfBufferFiles)
                    {
                        for(let i = 0; i < this.listOfBufferFiles.length; i += 1)
                        {
                            if(this.listOfBufferFiles[i].name == name)  
                            {
                                object_of_searching.__searched_element =this.listOfBufferFiles[i]
                            }     
                        }
                    }
                    if(this.listOfLogFiles)
                    {
                        for(let i = 0; i < this.listOfLogFiles.length; i += 1)
                        {
                            if(this.listOfLogFiles[i].name == name )  
                            {
                                object_of_searching.__searched_element = this.listOfLogFiles[i]
                            
                            }     
                        }
                    }
                    if(this.listOfSubDirectories)
                    {
                        for(let i = 0; i < this.listOfSubDirectories.length; i++)
                        { 
                            if(this.listOfSubDirectories[i].name == name )  
                            {
                                object_of_searching.__searched_element = this.listOfSubDirectories[i]
                            }    
                        }
                        for(let i = 0; i < this.listOfSubDirectories.length; i++)
                        { 
                             this.listOfSubDirectories[i].traversalAndSearchDirectory(name,object_of_searching) 
                        }     
                    }
    }
    move(move_object_name,name_of_new_parent)
    {
        if(this.isDirectory)
        {
                if(this.root.name == move_object_name)
                {
                    console.log("we can't move root!")
                }
                let from,to,newParent,move_object,oldParent
    
                newParent   = this.searched(name_of_new_parent,this.root)
                move_object = this.searched(move_object_name,this.root) 
                oldParent = move_object.parent
             
                
                if(!newParent)
                {
                    console.log('this path doesn\'t exist!');
                }
                else
                {
                        for(let i=0;i<3;i++)
                        {
                                if(i==0)
                                {
                                    from = oldParent.listOfSubDirectories
                                    to = newParent.listOfSubDirectories 
                                }
                                else if(i==1)
                                {
                                    from = oldParent.listOfLogFiles
                                    to = newParent.listOfLogFiles 
                                }
                                else if(i==2)
                                {
                                    from = oldParent.listOfBinaryFiles
                                    to = newParent.listOfBinaryFiles 
                                }
                                else if(i==3)
                                {
                                    from = oldParent.listOfBufferFiles
                                    to = newParent.listOfBufferFiles 
                                }
                                for(let i=0;i<from.length;i++)
                                {
                                    if(from[i].name == move_object_name)
                                        {
                                            from[i].parent = newParent 
                                            oldParent.number_of_elements-=1;
                                            newParent.number_of_elements+=1;
                                            to.push(from[i])
                                            from.splice(i, 1) // начиная с позиции 1, удалить 1 элемент
                                            return;
                                        }
                                }
                        }
                }

        }
        
    }
   
}
module.exports = {File_system_entity};