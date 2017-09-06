var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJs');
//链接错误
db.on('error',function (error){
	console.log(error);
});
//Schema结构
var mongooseSchema = new mongoose.Schema({
	username:{type:String,default:'匿名用户'},
	title:{type:String},
	content:{type:String},
	time:{type:Date,default:Date.now},
	age:{type:Number}
});

//添加mongoose实例方法
mongooseSchema.methods.findbyusername = function (username,callback){
	return this.model('student').find({username:username},callback);
}
//添加 mongoose 静态方法，静态方法在Model层就能使用
mongooseSchema.statics.findbytitle = function (title,callback){
	return this.model('student').find({title:title},callback)
}

//model
var mongooseModel = db.model('student',mongooseSchema);


//增加记录 基于 entity 操作
var doc = {username : 'emtity_demo_username', title : 'emtity_demo_title', content : 'emtity_demo_content'};
var mongooseEntity = new mongooseModel(doc);
mongooseEntity.save(function (error){
	if (error){
		console.log(error)
	}else{
		console.log('saved ok!')
	}
	db.close();
})

// 增加记录 基于model操作
var doc = {username : 'model_demo_username1', title : 'model_demo_title1', content : 'model_demo_content1'};
mongooseModel.create(doc,function (error){
	if (error){
		console.log(error);
	}else{
		console.log('save ok');
	}
	// 关闭数据库链接
	db.close();
})


// 修改记录
var conditions = {username:'model_demo_username1'};
var update = {$set:{age:27,title:'model_demo_title_update'}};
var options = {upset:true};
mongooseModel.update(conditions,update,options,function (error){
	if (error){
		console.log(error);
	}else{
		console.log('update ok!')
	}
	//关闭数据库链接
	db.close();
})


// 查询
// 基于实例方法的查询
var mongooseEntity = new mongooseModel({});
mongooseEntity.findbyusername('emtity_demo_username', function(error, result){
    if(error) {
        console.log(error);
    } else {
        console.log(result);
    }
    //关闭数据库链接
    db.close();
});


// 基于静态方法的查询
mongooseModel.findbytitle('emtity_demo_title', function(error, result){
    if(error) {
        console.log(error);
    } else {
        console.log(result);
    }
    //关闭数据库链接
    db.close();
});


// mongoose find
var criteria = {title : 'emtity_demo_title'}; // 查询条件
var fields   = {title : 1, content : 1, time : 1}; // 待返回的字段
var options  = {};
mongooseModel.find(criteria, fields, options, function(error, result){
    if(error) {
        console.log(error);
    } else {
        console.log(result);
    }
    //关闭数据库链接
    db.close();
});


// 删除记录
var conditions = {username: 'emtity_demo_username'};
mongooseModel.remove(conditions, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('delete ok!');
    }

    //关闭数据库链接
    db.close();
});