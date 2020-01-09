//generate all balances brackets
// N = 2 (()), ()()
// N = 3 ((())), (()()), (())(), ()(()), ()()()

"use strict"
let all = [];
let g_gen_balanced_brackets = (left, right, str) => {
    if (left == 0 && right == 0)
        all.push(str);
    if (left > 0)
        g_gen_balanced_brackets(left - 1, right + 1, str + "(");
    if (right > 0)
        g_gen_balanced_brackets(left, right - 1, str + ")");
}

module.exports = g_gen_balanced_brackets;
g_gen_balanced_brackets(2, 0, "");
console.log(all);



let isBalancedBracketAlgo = () => {
    //use stack to  store all opening brackets and pop stack, if closing found to see if balances
    //at the end if stack is not empty that means given expr is not balanced
    console.log("see if a string is balanced or not");
    let exp = '[()]{}{[()()]()}';
    let openBr = '{[(';
    let closeBr = ')]}';
    let exp_arr = exp.split('');
    let st = [];
    let tp = '';
    let isBalanced = false;
    let cur = '';
    for (let i = 0; i < exp_arr.length; i++) {
        tp = exp_arr[i];
        if (openBr.indexOf(tp) !== -1) {
            st.push(tp);
            // console.log(st);
        } else if (closeBr.indexOf(tp) !== -1) {
            cur = st.pop();
            // console.log('popped',cur,st)
        }
    }
    if (st.length === 0) isBalanced = true;
    isBalanced ? console.log('balanced', st) : console.log('not balanced', st);
}
module.exports = isBalancedBracketAlgo;
isBalancedBracketAlgo();

let newSet = []
let findAllCombination01 = (str, i) => {
    let sArr = str.split('')
    let ln = sArr.length;
    while (i < ln && sArr[i] != '?') i += 1; //find index of until ? is found
    if (i == ln) { newSet.push(sArr.join('')); return; }
    sArr[i] = 0; findAllCombination01(sArr.join(''), i);
    sArr[i] = 1; findAllCombination01(sArr.join(''), i);
}
module.exports = findAllCombination01;
findAllCombination01('10??', 0);
console.log('new set is', newSet)



