var output="";
var space = "         ";
var star ="*";
for(var i=0; i<10; i++){
	console.log(space.substring(0,space.length-i)+(output+=("*"))+"*".repeat(i));
}