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

18. What will be the output when the following code is executed? Explain.

```
console.log(false == '0')
console.log(false === '0')
```

- `true` and `false`. double equal operator must agree in value only. triple equal operator must agree in type and value.

19. What is the output out of the following code? Explain your answer.

```
var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);
```

- 456 (not 123).
- Javascript automatically turns parameters into strings when setting an object property.

20. What will the following code output to the console:

```
console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));
```

- 10!

21. Consider the code snippet below. What will the console output be and why?

```
(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1);
```

- 1 because of closure.

22. What will the following code output to the console and why:

```
var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
```

- `undefined` and `John Doe`. this.\_name is called in the global scope, which does not know the \_name variable.

23. Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

The arguments to the function should be:

a DOM element
a callback function (that takes a DOM element as its argument)

-

```function Traverse(p_element,p_callback) {
   p_callback(p_element);
   var list = p_element.children;
   for (var i = 0; i < list.length; i++) {
       Traverse(list[i],p_callback);  // recursive call
   }
}
```

24. Testing your this knowledge in JavaScript: What is the output of the following code?

```
var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);
```

- 10, 2.

25. Consider the following code. What will the output be, and why?

```
(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();
```

- 1, undefined, 2.

26. What will be the output of this code?

```
var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();
```

- undefined.

27. What will this code print?

```
for (let i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, i * 1000 );
}
```

- 0,1,2,3,4,5. We used let!

28. What do the following lines output, and why?

```
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```

- true, false.

29. How do you add an element at the begining of an array? How do you add one at the end?

- myArray.push('end');
  myArray.unshift('start');

30. Imagine you have this code:

`var a = [1, 2, 3];`
a) Will this result in a crash?
`a[10] = 99;`

- no.

  b) What will this output?
  `console.log(a[6]);`

- undefined

31. What is the value of `typeof undefined == typeof NULL`

- true

32. What would following code return?

`console.log(typeof typeof 1);`

- string!

33. What will be the output of the following code:

```
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```

- 5555

34. What is NaN? What is its type? How can you reliably test if a value is equal to NaN?

    - It's type is `number`. use `isNan()`

35. What will the following code output and why?

```
var b = 1;
function outer(){
   	var b = 2
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();
```

- 3.

36. Discuss possible ways to write a function isInteger(x) that determines if x is an integer.

- `function isInteger(x) { return (x ^ 0) === x; }`

37. How do you clone an object?

- var obj = {a: 1 ,b: 2}
  var objclone = Object.assign({},obj);
