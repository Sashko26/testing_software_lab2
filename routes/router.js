const { Router, response }  = require('express') 
const  {Directory}  = require('../models/Directory')
const  {BufferFile,getRandomBufferFile}  = require('../models/Buffer')
const  {LogTextFile, getRandomLogText}  = require('../models/LogTextFile')
const  {BinaryFile, getRandomBinaryFile}  = require('../models/Binary')
const  {getRandomInt,getRandomString}  = require('../models/helper')

const  {BINARY,DIRECTORY,BUFFER,LOG_TEXT,MAX_NUMBER_OF_ELEMENTS} = require('../models/constant_types')


const router = Router()

let root;
let current; 
function create()
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
    return root;
}
router.get('/data', async(req, res) =>{
  if(current.isDirectory)
  {
    let full_list = current.getListOfChildElements()
    let list_for_present = []
    for(let i=0;i<full_list.length;i++)
    { 
      let obj = {
        parent_name: full_list[i].parent.name,
        root_name: full_list[i].root.name, 
        name :  full_list[i].name,
        location : full_list[i].location,
        isDirectory : full_list[i].isDirectory,
        isBinary :  full_list[i].isBinary,
        isBuffer : full_list[i].isBuffer,
        isLogText : full_list[i].isLogText
      }
      list_for_present.push(obj);
    }
    res.send(list_for_present)
  }
  if(current.isBuffer)
  {
    //let buffer_message = current.consume()  
    let obj = {
      //buffer_message : buffer_message,
      isBuffer: true,
      name : current.name,
      parent :current.parent.name
    }
    res.send(obj)
  }
  if(current.isBinary)
  {
    let binary_content = current.ReadFile()  
    let obj = {
      binary_content : binary_content,
      isBinary: true,
      name : current.name,
      parent :current.parent.name,
      root : current.root.name
    }
    res.send(obj)
  }

  if(current.isLogText)
  {
    let log_text_content = current.getAlldata()  
    let obj = {
      log_text_content : log_text_content,
      isLogText: true,
      name : current.name,
      parent :current.parent.name,
      root : current.root.name
    }
    res.send(obj)
  }

  
 

})
router.post('/addLineLogText/:file_name',async(req,res)=>{
  if(req.body.name == current.name)
  {
    let data =  current.addLine(req.body.value)
    res.send({
      stasus:"ok",
      data:data
    })
  }
})
router.post('/pushBuffer', async(req, res)=>{
  
  if(current.type == 'buffer')
  {
    current.push(req.body.input_for_pushing)
  }
  
})
router.get('/getBufferMessage/:file_name', async(req, res)=>{

  if(current.isBuffer)
  {
    let value =  current.consume()
    res.send(
      {buffer_message: value}
      )
  }
  else
  {
    res.send('error')
  }
  
})









router.post('/pushBufferMessage/:file_name', async(req, res)=>{


  if(current.isBuffer)
  {

    let value =  current.push(req.body.value)
    res.send(
      {status: 'ok',
      value : value}
      )
  }
  else
  {
    res.send('error')
  }
  
})








router.get('/', async (req, res) => {
 
    if(root == undefined)
    {
        root = create();
    }    
    current = root; 
  res.render('index')
})
router.get('/:path', async (req, res) => {
  if(req.params.path != 'favicon.ico')
  {
    let el = root.searched(req.params.path,root)
    current =  el;
    res.render('index')
  }
 


  
})
module.exports = router