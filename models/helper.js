function getRandomString(lenString)
{
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";  
  let randomstring = '';  
  for (let k=0; k<lenString; k++) 
  {  
      let rnum = Math.floor(Math.random() * characters.length);  
      randomstring += characters.substring(rnum, rnum+1);  
  }
  return randomstring;  
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
module.exports = {getRandomInt,getRandomString}