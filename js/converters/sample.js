module.exports=function combinationString(s){
  if(s==undefined)
  {
    return null;
  }
var result="";
var a=Array.from(s);
var set=new Set();
for(var i=0;i<a.length;i++)
{
  for(var j=0;j<a.length;j++){
    for(var k=0;k<a.length;k++){
      if(i!=j&&j!=k&&i!=k){
        set.add(a[i]+a[j]+a[k]);
      }
    }
  }
}
for(var i=0;i<set.length;i++){
  if(i!=set.length-1)
    result+=x.get(i)+"\n";
  else {
      result+=x.get(i);
  }
}
return result;
}
