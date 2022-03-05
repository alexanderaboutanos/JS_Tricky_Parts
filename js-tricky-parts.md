<!-- @format -->

<b>Questions!<b>

The following questions were asked from this website:
`https://www.toptal.com/javascript/interview-questions`

1. What is a potential pitfall with using `typeof bar === "object"` to determine if `bar` is an object? How can this pitfall be avoided?

   - Surprisingly, `null` is also considered an object in Javascript. Therefore, `typeof null === "object"` would return a `true`. This pitfall can be avoided by writing `(bar !== null) && (typeof bar === "object")`.

2. What will the code below output to the console and why?

```
(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));

```

- The code `var a = b = 3` results in `b = 3` and `var a = b`. Therefore, the results are `a` is `false` and `b` is `true`. How? Because `b` is defined within an 'unnamed' function, the `b` variable is declared in the global scope. Because `a` is defined using `var`, it is only defined locally in the 'function'.

3. What will the code below output to the console and why?

```
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();
```

- Result:
- ```
  outer func: this.foo = bar
  outer func: self.foo = bar
  inner func: this.foo = undefined
  inner func: self.foo = bar
  ```
- In the outer function, this and self refer to myObject. In the inner function, `this` no longer refers to myObject, while self still refers to `this`.

4. What is the signifigance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?

- As a reference, this is what it looks like...

```
(function() {
    ...
    code
    ...
})();
```

- One possible reason to wrap a JavaScript source file in a function block is create an easier referenceable alias for a global variable. For instance, this is exactly what jQuery does with it's `$` symbol.
- Furthermore, it creates a private namespace which can prevent potential name clashes between different modules and libraries.

5. What is the significance , and what are the benefits, of including `use strict` at the beginning of a JavaScript source file?

- The `use strict` tag enforces stricter parsing and error handling on JS code at runtime. Some code errors that would have been ignored generate errors or throw exceptions.

6. Consider the two functions below. Will they both return the same thing? Why or why not?

```
function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}
```

- The first function will return an object with a single key/value pair: `bar:"hello"`. The second function will return `undefined`. When one saves and runs the code, a semicolon will be added after the return on the second function. No error is thrown because it's technically not invalid.

7. What will the code below output?

```
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);
```

- You cannot be sure! It might print out 0.3 and true or it might not. Becasue JavaScript treats all numbers with floating point precision, this will not always yield the same results. This all has to do with the binary way that Javascript stores numbers.

8. In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?

```
(function() {
    console.log(1);
    setTimeout(function(){console.log(2)}, 1000);
    setTimeout(function(){console.log(3)}, 0);
    console.log(4);
})();
```

- Answer: 1,4,3,2.

9. Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

```
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase();
  return (str == str.split('').reverse().join(''));
}
```

10. Write a sum method which will work properly when invoked using either syntax below.

```
console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5
```

- Answer:

```
function sum(x) {
  if (arguments.length == 2){
    return arguments[0] + arguments[1];
  }
  else {
    return function(y) {return x + y};
  }
}
```

11. Consider the following code snippet:

```
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```

- (a) What gets logged to the console when the user clicks on “Button 4” and why?
- No matter what button is pressed, 5 will always be logged. When the onclick method is invoked, the i variable has already turned to 5.

- (b) Provide one or more alternate implementations that will work as expected.
- If you pass the value of `i` into a function at each iteration, you can then capture the value. We can actually do this by changing 1 keyword. Instead of the `var` keyword, which captures a global value, we can use the `let` keyword.

```
for (let i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```

12. Assuming d is an “empty” object in scope, say:

`var d = {};`
…what is accomplished using the following code?

```
[ 'zebra', 'horse' ].forEach(function(k) {
	d[k] = undefined;
});
```

- Answer:

```
d = {
  zebra: undefined
  horse: undefined
}
```

13. What will the code below output to the console and why?

```
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
```

let arr1 = ['j', 'o', 'h', 'n']
let arr2 = ['n', 'h', 'o', 'j']
nhojjones
4 n
4 j

-

```
"array 1: length=5 last=j,o,n,e,s"
"array 2: length=5 last=j,o,n,e,s"
```

arr1 and arr2 are the same (i.e. ['n','h','o','j', ['j','o','n','e','s'] ]) after the above code is executed.

14. What will the code below output to the console and why ?

```
console.log(1 +  "2" + "2");
- "122"
- Javascript assumes you are trying a string concat because the second value is a string. then it tacks on the third string.
console.log(1 +  +"2" + "2");
- "32"
- Here, + +"2", the second + is treated as a unary operator, turning the 2 intoa numeric value.
console.log(1 +  -"1" + "2");
- "02"
console.log(+"1" +  "1" + "2");
- "112"
console.log( "A" - "B" + "2");
- "NaN2"
console.log( "A" - "B" + 2);
- NaN
```

15. The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?

```
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};
```

SOLUTION

```
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout( nextListItem, 0);
    }
};
```

- The stack overflow is eliminated because the event loop handles the recursion, not the call stack.

16. What is a “closure” in JavaScript? Provide an example.

- a closure an inner function which has access to the variables in the outer function's scope chain. A closure has access to variables in 3 scopes: (1): variable in its own scope, (2)variables in the enclosing function's scope, and (3) global variables.

17. What would the following lines of code output to the console?

```
console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));
```

Solution:

```
0 || 1 = 1
1 || 2 = 1
0 && 1 = 0
1 && 2 = 2
```
