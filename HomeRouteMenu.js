"use strict"
//[1,2,3,4] sum 8 = false
//[1,2,4,4] sum 8 = true
//consider solution if array is sorted
//consider solution if array is not sorted
let op,found,ln;
let x,y,df;

let option1=(arr,sum)=>{
    found=false;
    op='found: '+found;
    ln=arr.length;
    for(let i=0;i<ln;i++){
        x=arr[i];
        for(let j=0;j<i;j++){
            y=arr[j];
            if(x+y===sum){
                found=true;
                op='Option1: '+' x= '+x+' y= '+y+' i= '+i+' j= '+j + ' found: '+found;
                break
            }
        }
        if(found) break;
    }
    console.log('option1(2 for loops, not so optimum):',op)
}

let option2=(arr,sum)=>{
    found=false;
    op='found: '+found;
    ln=arr.length;
    for(let i=0;i<ln;i++){
        x=arr[i];
        df=sum-x;
        for(let j=i+1;j<ln;j++){
            if(df===arr[j]){
                found=true;
                op='x '+x+' sum '+sum+' diff complement of sum '+df+' found: '+found;
                break;
            }
        }        
    }
    console.log('option2(2 loop, not so fast, but better than 2 for as it only looks for complement of sum-x (log complex nlogn)):',op)
}

let option3=(arr,sum)=>{
    found=false;
    op='found: '+found;
    ln=arr.length;
    let comps=[];
    for(let i=0;i<ln;i++){
        x=arr[i];
        if(comps.indexOf(x)!==-1){
            found=true;
            op='val '+x+' sum '+sum+' complement('+sum+'-'+x+'='+(sum-x)+') found '+found+' '+comps+', pair is '+x+' & '+(sum-x)+' at '+arr.indexOf(x)+' & '+arr.indexOf(sum-x);
            break;
        }
        comps.push(sum-x);
    }
    console.log('option3(linear complexity, fastest) works well with sorted and unsorted array also:',op)
}


let arr,sum;
// arr=[1,2,3,4]; sum=8;
// option1(arr,sum);
// arr=[1,2,4,5]; sum=9;
// option2(arr,sum);
arr=[4,1,2,5]; sum=9;
option3(arr,sum);

