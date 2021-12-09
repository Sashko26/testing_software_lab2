const { Router, response }  = require('express') 
const  {Directory}  = require('../models/Directory')
const  {BufferFile,getRandomBufferFile}  = require('../models/Buffer')
const  {LogTextFile, getRandomLogText}  = require('../models/LogTextFile')
const  {BinaryFile, getRandomBinaryFile}  = require('../models/Binary')
const  {getRandomInt,getRandomString}  = require('../models/helper')



const  {BINARY,DIRECTORY,BUFFER,LOG_TEXT,MAX_NUMBER_OF_ELEMENTS} = require('../models/constant_types')

describe('tests',()=>{
    
    test('testing directory module',()=>
    {
        // 1.root entity 
        let model_root =  {
            name : "test_directory",
            isRoot: true,
            type : 'directory',
        }
        let root = new  Directory('test_directory',true,'directory')

        expect(root.name).toBe(model_root.name)
        expect(root.isRoot).toBe(model_root.isRoot)
        expect(root.isDirectory).toBe(true)

        // 2.not root entity
    
        
            let model_not_root =  {
                name : "not_root_test_directory",
                isRoot: false,
                type : 'binary',
            }
            let not_root_entity =  new  BinaryFile('not_root_test_directory',false,'binary',root,root) 
            expect(not_root_entity.name).toBe(model_not_root.name)
            expect(not_root_entity.isRoot).toBe(model_not_root.isRoot)
            expect(not_root_entity.isBinary).toBe(true)
        

        // 3. creating bad entity
        {  
            try
            {
                new  Directory('not_root_test_directory',undefined,'binary') 
            }
            catch(err)
            {
                expect(err).toBe(`Not root value can't be without root or parent!`)
            }
        }
        // 4. delete directiry of parent
        expect(root.listOfSubDirectories.length).toBe(0)
        expect(root.listOfBinaryFiles.length).toBe(1)
        not_root_entity.Delete()
        expect(root.listOfBinaryFiles.length).toBe(0)
        expect(root.listOfSubDirectories.length).toBe(0)
        {
            let root = new Directory('.',true,'directory')
            for(let i=0;i<5;i++)
            {
                let randomstring = getRandomString(7) 
                 let sub_dic = new Directory(randomstring,false,'directory',root,root)  
                for(let j=0;j<3;j++)
                {
                    let new_randomstring = getRandomString(7)
                    let sub_dic_dic = new Directory(new_randomstring,false,'directory',sub_dic,root)
                    for(let k=0;k<2;k++)
                    {
                      let new_randomstring = getRandomString(7)
                       let sub_dic_dic_dic = new Directory(new_randomstring,false,'directory',sub_dic_dic,root)
                      for(let m=0;m<6;m++)
                      {
                          if(m == 0)
                           {
                              getRandomBinaryFile(250,BINARY,sub_dic_dic_dic,root)
                           }
                          else if(m == 1)
                          {
                            getRandomBufferFile(50,BUFFER,sub_dic_dic_dic,root)   
                          }
                          else if(m == 2)
                          {
                            getRandomLogText(250,LOG_TEXT,sub_dic_dic_dic,root)
                          }
                          else if(m == 3)
                          {
                             getRandomBinaryFile(250,BINARY,sub_dic_dic_dic,root)
                          }
                         else if(m == 4)
                         {
                          getRandomBufferFile(50,BUFFER,sub_dic_dic_dic,root)      
                         }
                         else if(m == 5)
                         {
                           getRandomLogText(250,LOG_TEXT,sub_dic_dic_dic,root)
                         }
                      }
                    }
                }
            }
            
            
            let name_of_moved_file = root.listOfSubDirectories[1].listOfSubDirectories[1].listOfSubDirectories[1].listOfBinaryFiles[0]
            let to_parent_obj =  root.listOfSubDirectories[1].name

            root.MoveСhildElement(name_of_moved_file.name,to_parent_obj);
            expect(name_of_moved_file.parent.name).toBe(root.listOfSubDirectories[1].name)
            {
                    let root = new Directory('root',true,'directory')
                    for(let i=0;i<128;i++)
                    {
                        new Directory(getRandomString(7),false,'directory',root,root)
                    }
                    expect(root.listOfSubDirectories.length).toBe(MAX_NUMBER_OF_ELEMENTS)
            }

            
        }
    })
    test('test Binary module',()=>{
        let root = new  Directory('test_directory',true,'directory')
        let data = getRandomString(250)
        let not_root_entity =  new  BinaryFile('not_root_test_directory',false,'binary',root,root,data)
        expect(not_root_entity.ReadFile()).toBe(data)    
    })
    test('test Buffer module',()=>{
        let root = new  Directory('test_directory',true,'directory')
        
        let not_root_entity =  new  BufferFile('not_root_test_directory',false,'buffer',root,root)
        let str='kasjhddlaskd;akjsfiuihasofjpaowjfoiawjf;lasmlkvcnas'
        let str1='kasjhddlaskd;akjslasijfalsifjaswe7e77e77e77e7e777e77e;lasmlkvcnas'
        not_root_entity.push(str)
        not_root_entity.push(str1)
        expect(not_root_entity.consume()).toBe(str)
        expect(not_root_entity.consume()).toBe(str1)


        for(let i=0;i<100;i++)
        {
            let data = getRandomString(250)
            not_root_entity.push(data)

        }
        expect(not_root_entity.queue.length).toBe(MAX_NUMBER_OF_ELEMENTS)
       
    })
    test('test LogText module',()=>{

        let root = new  Directory('test_directory',true,'directory')
        let init_data = "alsdjalskasd\nalskdjalskdj\nasdasf\nsfasgasfdas\nasfasfasgaawsdfsdsdgsdssdg"
        let not_root_entity =  new  LogTextFile('not_root_test_directory',false,'logText',root,root,init_data)
        not_root_entity.addLine('asdasvasvasfasf')
        expect(not_root_entity.getAlldata()).toBe(init_data+"\nasdasvasvasfasf")
    })
    


})


