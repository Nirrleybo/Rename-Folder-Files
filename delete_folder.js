const fs = require('fs');
const path = require("path");


main();


function main(){
	try{
		console.log("Start...");
		var args = getArgs();
		var root_path = args ? args.root_path : null;
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
	        console.log("path: " + path);
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
	try{
		var dir = path.dirname(oldPath);
		fs.renameSync(oldPath, dir + "/" + newName);
	} catch(e){
		console.error("changeFileName. error: " + e);
	}
}

function getArgs(){
	var args = {};
	if (process && process.argv[2]) {
		args.root_path = process.argv[2];
	}
	else{
		console.log("No root dir");
		args = null;
	}
	return args;
}
