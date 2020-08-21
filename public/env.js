// takes an array of bids, builds the html element and then displays on the screen
const displayUserBids=(bids)=>{
    let bidSpace=$('<div id="bidSpace" class="row col s12"></div>')  
    
    bids.forEach(function(bid){
        let bidEntry=$('<div class="row col s12 journalEntry">'+bid.userName+'   '+bid.bidAmount+'</div>')
        bidSpace.append(bidEntry)
    })
    $('#bidsContainer').append(bidSpace)
}

//this function gets the data from the Mode, wraps it in a package and sends it to the server
const newBidder=()=>{
    
    let userName = $('#newBidder').val()
    let bidAmount = $('#newBidAmount').val()

    let data={
        userName:userName,
        bidAmount:bidAmount
        //userName: 'Guest'
    }

    console.log(data);
    $.ajax({
        url:'/userbids',
        contentType: 'application/json',
        data: JSON.stringify(data),  //access in body
        type: 'POST',
        success: function(result){
            console.log(result)
        }
    });
}

const getUserBids=()=>{
    //some logic to get data from the server
    $.get('/userbids',(result)=>{
        
            displayUserBids(result.result)
        
    })

}

$(document).ready(function(){
    console.log('Document ready')



        // this block is used to post messages on the board
    
        $('#finalResult').click(function(){    
        
        let userName = $('#newBidder').val()
        let bidAmount = $('#newBidAmount').val()
            
        var bid = {
            userName:userName,
            bidAmount:bidAmount
        }
        
        
       
        setTimeout(()=>{
           
        $('#finalBid').append('<div><p>Winner is '+userName+' with highest bidding amount: ' +bidAmount+' </p></div>');
            
        },120000)
       
        $.get("http://localhost:3000/userbids",bid,function(data){
            console.log('Data has returned:'+ data)       
        
        });
        
    })

    //once everything is ready get Userbids
    getUserBids()


    //initialise the model window
    $('.modal').modal();
})