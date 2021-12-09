

window.onload = function ()
{
  function create_form(link, isRoot)
  {
    let form =  document.createElement("form");   
    form.setAttribute('action',`${link}`);
    let button =  document.createElement("button");
    button.setAttribute("class","btn btn-primary")
    form.setAttribute("style","display:inline;")    
   // button.setAttribute('type','submit')
    form.appendChild(button)
    if(isRoot)
    {
      button.innerHTML = "ROOT"
    }
    else{
      button.innerHTML = "PREV"
    }
    let main = document.getElementsByClassName("main")[0]
    main.appendChild(form);     
  }



    fetch('/data',{
        method: "GET",
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
      )
      .then(response => {
        return response.json(); 
      })
      .then(data =>{
        if(Array.isArray(data))
        {
          let main_data = document.getElementsByClassName('flex-container')[0];
          main_data.setAttribute('class',"flex-container-grid container-fluid")
          for(let i = 0;i<data.length;i++)
          {
             let  figure  = document.createElement("figure");
             figure.setAttribute('class','sign');
             let a =  document.createElement("a");   
             a.setAttribute('href',`${data[i].name}`);    
             let img =  document.createElement("img");
             img.setAttribute('class','gallery__img');
             if(data[i].isDirectory == true)
             {
                img.setAttribute('src', 'folder.jpg');
             }
             if(data[i].isBinary == true)
             {
                img.setAttribute('src', 'bin.png');
             }
             if(data[i].isBuffer == true)
             {
                img.setAttribute('src', 'buffer.jpg');
             }
              if(data[i].isLogText == true)
             {
                img.setAttribute('src', 'log.jpg');
             } 
             let figcaption =  document.createElement("figcaption");
             figcaption.innerText =data[i].name;
             a.appendChild(img)
             figure.appendChild(a)
             figure.appendChild(figcaption)
             
              main_data.appendChild(figure)
          }
          
          create_form(data[0].parent_name,false)
          create_form(data[0].root_name,true)
          
        } 
        else if(data.isBuffer)
        {

          let main_data = document.getElementsByClassName('flex-container')[0];

           main_data.setAttribute('class',"flex-container-other container-fluid")
           main_data.setAttribute('display','block')
           let file_name = document.createElement('h1')
           file_name.setAttribute('id','file_name_buffer')
           file_name.innerText = `${data.name}`
           main_data.appendChild(file_name)

           let form_for_getting =document.createElement("form")
           form_for_getting.setAttribute('class','container') 

           let input_for_getting = document.createElement("input")
           input_for_getting.setAttribute('class','form-control-lg')
           input_for_getting.setAttribute('id','get_input_buffer')
           input_for_getting.setAttribute('id','get_input_buffer') 

           let button_for_getting =document.createElement("button")
           button_for_getting.setAttribute("class","btn btn-primary-lg")
           //button_for_getting.setAttribute('onclick','getBuffer()')
           button_for_getting.setAttribute('id','get_button_buffer')

           
           form_for_getting.appendChild(input_for_getting)
           form_for_getting.appendChild(button_for_getting)


           let form_for_pushing =document.createElement("form")
           form_for_pushing.setAttribute('class','container')

           let input_for_pushing =document.createElement("input")
           input_for_pushing.setAttribute('class','form-control-lg')
           input_for_pushing.setAttribute('name','input_for_pushing')
           input_for_pushing.setAttribute('id','push_input_buffer')
           

      
           


           let button_for_pushing =document.createElement("button")
           
           button_for_pushing.innerHTML = "PUSH" 
           button_for_pushing.setAttribute("class","btn btn-primary-lg")
          //button_for_pushing.setAttribute('onclick','pushBuffer()')
           button_for_pushing.setAttribute('id','push_button_buffer')

           

           form_for_pushing.setAttribute('class','container')
           form_for_pushing.appendChild(input_for_pushing)
           form_for_pushing.appendChild(button_for_pushing)

             
           
          
          
           button_for_getting.innerHTML = "GET"


           main_data.appendChild(form_for_getting)
           main_data.appendChild(form_for_pushing)


          
         
         
         
           if(button_for_pushing)
           {
             button_for_pushing.addEventListener('click',
             function(event){                          
             event.preventDefault()
             let file_name = document.getElementById("file_name_buffer").textContent
             let new_buffer = document.getElementById("push_input_buffer") 
             let value_new_buffer =  new_buffer.value
             
            
             fetch(`/pushBufferMessage/${file_name}`,{
               method: "POST",
               headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               'Cache-Control': 'no-cache, no-store, must-revalidate'
               },
               body:JSON.stringify({
                value : value_new_buffer
            })
             }
             )
             .then(response => {
              return response.json() 
            })
             .then(data => {
               console.log(data) 
             })
             
             }) 
           }
         
         
           if(button_for_getting)
           {
            button_for_getting.addEventListener('click',
             function(event){                          
             event.preventDefault()
             let file_name = document.getElementById("file_name_buffer").textContent
           
             
             fetch(`/getBufferMessage/${file_name}`,{
               method: "GET",
               headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               'Cache-Control': 'no-cache, no-store, must-revalidate'
               }
             }
             )
             .then(response => {
               return response.json(); 
             })
             .then(data =>{
               let get_input_buffer = document.getElementById('get_input_buffer')
               get_input_buffer.value = data.buffer_message 
             })    
             }) 
           }
        }






        else if(data.isBinary)
        { let main_data = document.getElementsByClassName('flex-container')[0];
           let text_area = document.createElement("textarea")
           text_area.value =  data.binary_content



           let file_name = document.createElement('h1')
           file_name.setAttribute('id','file_name_binary')
           file_name.innerText = `${data.name}`
           main_data.appendChild(file_name)

           
           main_data.appendChild(text_area)
        }
        else if(data.isLogText)
        {
          let main_data = document.getElementsByClassName('flex-container')[0];
             let text_area = document.createElement("textarea")
             text_area.setAttribute('id','text_area_id_add_line')
             text_area.value =  data.log_text_content
             



             let file_name = document.createElement('h1')
             file_name.setAttribute('id','file_name_logText')
             file_name.innerText = `${data.name}`
             main_data.appendChild(file_name)

             main_data.appendChild(text_area)



             


             let form = document.createElement('form')
             let button_addline  = document.createElement('button')
             
             let input_add_line  = document.createElement('input') 


            
             input_add_line.setAttribute('class','form-control-lg')
             input_add_line.setAttribute('name','input_for_add_line')
             input_add_line.setAttribute('id','input_for_add_line')


             button_addline.innerText = "ADD LINE"





             button_addline.addEventListener('click',
             function(event){                          
             event.preventDefault()
              
             let  input_add_line = document.getElementById('input_for_add_line')
             let add_line_value =  input_add_line.value

             let text_area =  document.getElementById('text_area_id_add_line') 
             text_area.value = text_area.value+'\n'+add_line_value; 

             let  file_name = document.getElementById('file_name_logText').textContent
             
             fetch(`/addLineLogText/${file_name}`,{
              method: "POST",
              headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate'
              },
              body:JSON.stringify({
               value : add_line_value,
               name :  file_name
           })
            }
            )
            .then(response => {
             return response.json() 
           })
            .then(data => {
              console.log(data) 
            })
             
             
            
            
             }) 

             form.appendChild(input_add_line)
             form.appendChild(button_addline)
            
             main_data.appendChild(form)




        }
        
       
        
      })
      



      
}





