const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const Mongo_url="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(Mongo_url);
}
const initDB=async()=>{
    await Listing.deleteMany({});
    const ownerId=new mongoose.Types.ObjectId("68b743cfaa638c15d1b2666a");
    initData.data=initData.data.map(obj => ({ ...obj, owner:ownerId }));
    await Listing.insertMany(initData.data);  
    console.log("data was inserted");
}

initDB();
