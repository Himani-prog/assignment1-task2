const express = require('express');
const MongoClient = require('mongodb').MongoClient;		
const bodyParser = require('body-parser');
			
let app = express()
var port = process.env.PORT || 3000;

//serve static content 'web page'
app.use(express.static(__dirname + '/public')) 
app.use(bodyParser.json());




//endpoint to serve the bids
//endpoint to create a bid
//endpoint to update a bid with a comment

app.post('/userbids',(req,res)=>{
    console.log('body',req.body)
    let bid=req.body;
    insertbid(bid,res)
})

app.get('/userbids',(req,res)=>{

    getBidsData(res)

})

app.put('/userbids',(req,res)=>{
    
})


//connect to the db
//database connection
const uri = "mongodb+srv://sit725:sit725@sit725.zvyj0.mongodb.net/biddersdetails?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//bids collection handler
let bidCollection;
const openConnection = () => {
    client.connect((err, db)=>{
        bidCollection = client.db("biddersdetails").collection("userbids")
        if(!err){
            console.log('Database Connected')
        }
    });
}

openConnection()

//dbFunction to get the bids
//retrieve all bids
const getBidsData=(res)=>{
    bidCollection.find().toArray(function(err, result){
        console.log(result);
    //find().toArray(function(err, result){
    let maxValue=0;
    for(let i=0;i<result.length;i++){
        currentBidAmount = parseInt(result[i].bidAmount);
        if(currentBidAmount>maxValue){
            maxValue=currentBidAmount
        }
    }
    
    result.maxBidAmount=maxValue;
    const myresponse={
        result:result,
        maxAmt:maxValue
    }
    console.log(res)
        if(err) throw err;
        res.send(myresponse)
    })
    console.log('works')
}

//insert bid into db
//takes a bid entry, add date to it and pushes into the collection
const insertbid = (bid,res)=>{
    //append date to bid object
    //let date = new Date();
    //bid.date = date.getTime();
    bid.userName;
    bid.bidAmount;
    //insert into collection
    bidCollection.insert(bid,(err,result)=>{
        console.log('Bid Amount Inserted',result)
        res.send({result:200})
    })
}

//db function to create a bid
//db function to update a bid





//start the server on port 3000
app.listen(port)
console.log('listening on port '+port)















// Database Management
//const uri = "mongodb+srv://sit725:sit725@sit725.zvyj0.mongodb.net/biddersdetails?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true });


//let collectionUserBids;



/*

client.connect(err => {
    bidCollection = client.db("bidderdetails").collection("userbids");
});

const insertBid=(name,bid)=>{
    //onst collection = client.db("bidderdetails").collection("userbids");
    bidCollection.insertOne({
        userName:name,
        bidAmount:bid
    })
    
    }

setTimeout(function(){
    insertBid('Sam','15')
},1000)*/



/*
const insertBid=(bid)=>{
    collectionUserBids.insertOne({bid:bid})
}

setTimeout(function(){
    insertBid('hello ')
},1000)*/

/*client.connect(err => {
  const collection = client.db("bidderdetails").collection("userbids");
  collection.insertOne({userbids:'hello'})
  // perform actions on the collection object
  client.close();
});*/
