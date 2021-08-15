$( document ).ready(function() {
    console.log( "ready!" );
    $.ajax({        
        url:'http://localhost:9998/listItems',
        method:"GET",
        dataType: "json",
        contentType: 'application/json; charset=UTF-8',
        
        success:function(res){
            console.log(res)
        },
        error:function(err){console.log(err)},
      });


      $('#addToDoList').on('click', (e)=>{
        e.preventDefault()
        var itemName = $("#form1").val()
          
        var mydata = JSON.stringify({
            "name": itemName,
        });
        console.log(mydata);  
        $.ajax({        
            url:'http://localhost:9998/addlistItems',
            method:"POST",
            dataType: "json",
            contentType: 'application/json; charset=UTF-8',
            data: mydata,
            
            success:function(res){
                console.log(res)
            },
            error:function(err){console.log(err)},
          });
      })
});

