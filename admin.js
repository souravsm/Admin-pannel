$(function()
{
console.log("dom is ready")

$(".formaction").submit(function(e)
{
    e.preventDefault()
})
$("#search-box").on("input",function()
{
   let searchstring = this.value
  
   var gettr = $("tr")
   for(var i=1;i<gettr.length;i++)
   {
    var datastring =""
       for(j=0;j<5;j++)
       {
            datastring += gettr[i].childNodes[j].innerText+" ";
       }
      console.log(datastring,searchstring)
      var isPresent = (datastring.toLowerCase()).includes(searchstring.toLowerCase())
     
      console.log(isPresent)
      if(isPresent)
      {
          gettr[i].classList.remove('display-class')
      }
      else{
          gettr[i].classList.add('display-class')
      }
      
   }

//    if(isPresent)
//    {
//        var lenofstr = searchstring.length
//        for(var i = 1;i<gettr.length;i++)
//        {
//            for(var j=0;j<5;j++)
//            {
//                if((gettr[i].childNodes[j].innerText).includes(searchstring))
//                {
//                    var substr = gettr[i].childNodes[j].innerText
//                    var getpos = substr.indexOf(searchstring)
//                    var store = substr.substring(getpos,getpos+lenofstr)
                  
              
//                }
//                else{
//                    gettr[i].childNodes[j].classList.remove('add-color')
//                }
//            }
//        }
//    }

})


$.get("https://607e95f802a23c0017e8ba2f.mockapi.io/habib-admin",function(response)
    {
     let objectdata = response
     console.log(objectdata)
  for(var i=0;i<objectdata.length;i++)
  {
      if(i==0)
      {
      rowsrender(objectdata[i],i)
      }
      else{
          rowsrender(objectdata[i])
      }

  }
  var getallrows = $(".data-row")
  console.log(getallrows)
  for(var i=0;i<getallrows.length;i++)
  {
    getallrows[i].addEventListener("click",function(event)
    {
      let getid = event.currentTarget.firstChild.innerText
      let getdetails =  objectdata.filter((item) =>
    
      item.id == getid
      )[0]
      console.log(event.currentTarget.className)
      $(".data-row").removeClass('active')
      event.currentTarget.className = "data-row active"
      console.log(getdetails)
      changerightside(getdetails)
    
    })
  }
 function changerightside(getdetails)
  {
    var { firstName, lastName, description, address } = getdetails;
    var { streetAddress, city, state, zip } = address;
  $(".info-name").html(`<b>User Selected </b> ${firstName} ${lastName}`)
     $("textarea").text(`description ${description}`);
     $(".adress").html(`<b>Address:</b> ${streetAddress}`);
     $(".city").html(`<b>City:</b> ${city}`);
     $(".state").html(`<b>State:</b> ${state} `);
     $(".zipcode").html(`<b>Zip:</b> ${zip}`);   
  }
    })
})


/*
 <table>
                        <tbody>
                            
                            <tr class="data-row">
                                <td class="column1">856</td>
                                <td class="column2">Yeqing</td>
                                <td class="column3">Elshoff</td>
                                <td class="column4">RKimmel@tincidunt.com</td>
                                <td class="column5">(230)488-3157</td>
                            </tr>

                        </tbody>
                    </table>
*/

    function rowsrender(persondata,index)
    {
        if(index == 0)
        {
 var trows = $("<tr>").addClass("data-row active")
        }
        else{
            var trows = $("<tr>").addClass("data-row")
        }
 var td1 = $("<td>").addClass("column1").text(persondata.id)
 var td2 = $("<td>").addClass("column2").text(persondata.firstName)
 var td3 = $("<td>").addClass("column3").text(persondata.lastName)
 var td4 = $("<td>").addClass("column4").text(persondata.email)
 var td5 = $("<td>").addClass("column5").text(persondata.phone)
trows.append(td1,td2,td3,td4,td5)

$("tbody").append(trows)

}


