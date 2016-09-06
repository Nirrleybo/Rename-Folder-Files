/*************************************/
/***** Insert Root Folder Here *******/
/*************************************/
var root_dir = "";

/* Change to true to enable script */
var is_on = 1; // <-- Change to true !

/** 
* true - use "root_dir" var (above) content
* false - to use cmd param 
*/
var test = false; 




const fs = require('fs');
const path = require("path");


main();


function main(){
	if (!is_on) return;
	try{
		console.log("Start...");
		var args = getArgs();
		var root_path = args ? args.root_path : null;
		if (test) root_path = root_dir;
		if (root_path) {
			deleteFolder(root_path, []);
			console.log("Done !");
		} else{
			console.log("Aborting");
		}
	}
	catch(e){
		console.error("main. error: " + e);
	}
}

function deleteFolder(dir){
	try{
	    var files = fs.readdirSync(dir);
	    var index = 1;
	    for(var i in files){
	        if (!files.hasOwnProperty(i)) continue;
	        var path = dir+'/'+files[i];
	        if (fs.statSync(path).isDirectory()){
	            deleteFolder(path);
	        } 
	        changeFileName(path, index);
	        index++;
	    }
	} 
	catch(e){
		console.error("deleteFolder. error: " + e);
	}
}

function changeFileName(oldPath, newName){
	// fs.rename(old,new,callback)
	try{
		var dir = path.dirname(oldPath);
		fs.renameSync(oldPath, dir + "/" + newName);
	} catch(e){
		console.error("changeFileName. error: " + e);
	}
}

function getArgs(){
	var args = {};
	if (process && process.argv[0]) {
		args.root_path = process.argv[0];
	}
	else{
		console.log("No root dir");
		args = null;
	}
	// print process.argv
	// process.argv.forEach(function (val, index, array) {
	//   console.log(index + ': ' + val);
	// });
	return args;
}