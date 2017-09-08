var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test"

//封装一个连接数据库的内部函数
function _connectDB(callback){
	MongoClient.connect(url,function (err,db){
		if (err){
			console.log("failed to connect db");
			return;
		}
		callback(db)
	})
}
//add
_connectDB(function (db){
	db.collection("student").insertOne(
		{
			"name":"lolo",
			age:33,
			time:new Date()		
		},
		function (err,result){
			console.log(err);
			console.log(result.result);
			db.close();
		}
	)
})

//update
_connectDB(function (db){
	db.collection("student").updateMany(
		{
			name:"keke"
		},
		{
			$set:{age:12}
		},
		function (err,result){
			console.log(result.result)
			db.close();
		}
	);
})

//find
_connectDB(function (db){
	var result = [];
	var cursor = db.collection("student").find({"name":"keke"}).skip(0).limit(0).sort({"time":-1})
	cursor.each(function (err,doc){
		if (err){
			console.log("fail");
			db.close();
			return;
		}
		if (doc != null){
			result.push(doc);
		}else{
			console.log(result);
			db.close();
		}
	})
})

//delete
_connectDB(function (db){
	db.collection("student").deleteMany(
		{
			"name":"keke"
		},
		function (err,results){
			if (err){
				console.log("delete failed!")
			}
			console.log(results.result);
			db.close();
		}
	)
})




