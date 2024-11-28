//define variables
var button = document.getElementById("addButton");
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var tableBody = document.getElementById("myTable");
var search = document.getElementById("search");
var modal = document.getElementById("modal");
var validmodal = document.getElementById("validmodal");
var closeElement = document.getElementById("closeElement");
var validcloseElement =document.getElementById("validcloseElement");
var UpdatedsName = document.getElementById("UpdatedsiteName");
var UpdatedsUrl = document.getElementById("UpdatedsiteUrl");
var updateButton = document.getElementById("updateButton");
var siteList = [];
//load data saved in localStorage and put it in my sitelist
if (localStorage.getItem("data") !== null) {
    siteList = JSON.parse(localStorage.getItem("data"))
    display();
}

//close modal function 
function closeModa(){
    modal.classList.replace("d-flex", "d-none");
    console.log("close")
}
function closeValidModal(){
    validmodal.classList.replace("d-flex", "d-none");
    console.log("close")
}
//validurl function
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }
//data display function

function display() {

    var temp = "";
    for (var i = 0; i < siteList.length; i++) {
        temp += `<tr>
    <td>`+ i + `</td>
    <td>`+ siteList[i].sName + `</td>
    <td><a href="`+ siteList[i].sUrl + `" target="_blank" class="btn btn-outline-danger " >Primary link</a></td>
    <td> <button type="button" onclick="updateUrl(`+ i + `)"class="btn btn-outline-dark" id="update">update</button></td>
    <td><button type="button" class="btn btn-outline-dark"  onclick="deleteUrl(`+ i + `)" id="delete">delete</button></td>
</tr>`

    }
    tableBody.innerHTML = temp;
}
//delete function
function deleteUrl(x) {
    siteList.splice(x, 1);
    localStorage.setItem("data", JSON.stringify(siteList));
    display();
}

//update site
function updateUrl(x) {
   
    UpdatedsName.value =siteList[x].sName
    UpdatedsUrl.value =siteList[x].sUrl
    modal.classList.replace("d-none", "d-flex")
   
    updateButton.setAttribute("onclick","update("+x+")");

    

}

//eventsListener
 function update (x) {
    if(UpdatedsName.value!="" &UpdatedsUrl.value!==""&validURL(UpdatedsUrl.value)&UpdatedsName.value.length>2){
        var siteData = {
            sName: UpdatedsName.value,
            sUrl: UpdatedsUrl.value,
        }
        siteList[x] = siteData;
        
        localStorage.setItem("data", JSON.stringify(siteList));
        UpdatedsName.value="";
        UpdatedsUrl.value="";

        closeModa();
        display();
       
    }
    else{
        validmodal.classList.replace("d-none", "d-flex")
    }
   
}

closeElement.addEventListener("click", closeModa);
validcloseElement.addEventListener("click",closeValidModal)
modal.addEventListener("click",function(e){
    if(e.target.getAttribute("id")=="modal"){
        closeModa();
    }
})
validmodal.addEventListener("click",function(e){
    if (e.target.getAttribute("id")=="validmodal"){
        closeValidModal();
    }
})
search.addEventListener("input", function () {
    var temp = "";
    for (var i = 0; i < siteList.length; i++) {
        var searchInput = search.value.toLowerCase();

        if (siteList[i].sName.toLowerCase().includes(searchInput)) {
            temp += `<tr>
            <td>`+ i + `</td>
            <td>`+ siteList[i].sName + `</td>
            <td><a href="`+ siteList[i].sUrl + `" target="_blank" class="btn btn-outline-danger " >Primary link</a></td>
            <td> <button type="button" onclick="updateUrl(`+ i + `)"class="btn btn-outline-dark" id="update">update</button></td>
            <td><button type="button" class="btn btn-outline-dark"  onclick="deleteUrl(`+ i + `)" id="delete">delete</button></td>
        </tr>`
        }


    }
    tableBody.innerHTML = temp;
})

button.addEventListener("click", function () {
    console.log(siteName.value);
    console.log(siteUrl.value);
    var siteData = {
        sName: siteName.value,
        sUrl: siteUrl.value,
    }
    if(siteName.value!="" &siteUrl.value!==""&validURL(siteUrl.value)&siteName.value.length>2){
        siteList.push(siteData);
        localStorage.setItem("data", JSON.stringify(siteList));
        siteName.value="";
        siteUrl.value="";
        siteName.classList.remove("is-valid");
        siteUrl.classList.remove("is-valid");

        display();
    
    }
else{
    validmodal.classList.replace("d-none", "d-flex")
}

   
});

UpdatedsName.addEventListener("input",function(){
    console.log("valid");
   if(UpdatedsName.value.length>2&UpdatedsName.value!="" ){
    UpdatedsName.classList.add("is-valid");
    UpdatedsName.classList.remove("is-invalid");
    
   }
   else{
    UpdatedsName.classList.add("is-invalid");
    UpdatedsName.classList.remove("is-valid");
   }
})
UpdatedsUrl.addEventListener("input",function(){
    console.log("valid");
   if(validURL(UpdatedsUrl.value)&UpdatedsUrl.value!="" ){
    UpdatedsUrl.classList.add("is-valid");
    UpdatedsUrl.classList.remove("is-invalid");
    
   }
   else{
    UpdatedsUrl.classList.add("is-invalid");
    UpdatedsUrl.classList.remove("is-valid");
   }
})
siteName.addEventListener("input",function(){
    console.log("valid");
   if(siteName.value.length>2&siteName.value!="" ){
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    
   }
   else{
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
   }
})
siteUrl.addEventListener("input",function(){
    console.log("valid");
   if(validURL(siteUrl.value)&siteUrl.value!="" ){
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    
   }
   else{
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
   }
})



