# a5-PH-Github-Issue-Tracker
This is an assignment project of MERN stack course in programming hero batch 13.

Live project on Netlify - https://zunaid-a5-ph-github-issue-tracker.netlify.app/<br/>
Live project on GitHub - https://zunaidchowdhury.github.io/a5-PH-Github-Issue-Tracker/home.html

<br/>

## Answers to Questions

#### 1. What is the difference between var, let, and const?

Answer: var is old way to declare a variable and let/const are modern way to declare variable in js, introduced in es6.
the difference is that var is function scoped and let/const are block scoped.

var
function scoped, if declared inside func then accessible only inside function, else var is global scoped
can be redeclared with same name
can call before declaring


let/const
block scoped, if declared inside block then accessible only inside block
can't be redeclared with same name
can’t call before declaring

<br/>

#### 2. What is the spread operator (...)?

Answer: '...' spread operator is introduced in es6. it extracts elements from an array or object to individual elements.
lets say we have an array,
const arr = [1, 2, 3];

using sprea operator we can make a copy of the array like this,
const duplicate = [...arr];

also we can pass array elements as individual arguments to functions that dont accept arrays directly like Math.max().
for example,
const numbers = [10, 20, 5];
console.log(Math.max(...numbers));

Not only array but we can update objects also using spread operator, like,
const user = { name: 'John', age: 25 };
const updatedUser = { ...user, age: 26 }; // { name: 'John', age: 26 }


<br/>

#### 3. What is the difference between map(), filter(), and forEach()?
Answer: map(), filter(), and forEach(), all of them are array methods and they have their own use cases.
map() and filter() creates/returns a new array but forEach() doesnt return anything but we can does something with each element of the array with it.

map() and forEach() kind of similar but the difference is that map returns a new array where forEach does not.

we can use filter() method to filter out array elements based on a condition and it returns us with a new array with filtered elements.

A good example of these array methods with chaining is given below,
const activeAdults = users
  .filter(user => user.age >= 18)
  .map(user => user.name.toUpperCase());

<br/>

#### 4. What is an arrow function?
Answer: In javascript we have two types of functions, regular function and arrow function. they are different in their behaviour.
We declare regular function like,
function add () {}

and arrow function like,
const add = () => {};

Main diffrences between regular function and arrow function are,
a. regular functions are hoisted but arrow functions are not hoisted so we can call regular functions before their declaration but
cant call arrow function before their declaration.
b. regular functions have their own 'this' binded but arrow functions does not have this binding.

<br/>

#### 5. What are template literals?
Answer: template literal '``' is a new feature in js, introduced in es6. in js we use single quote '', double quote "" to write strings,
now we can use template literal '``' to write strings. but whats special about it? The magic is that now we can embed variables or expressions directly in the string using the ${expression} syntax. we can type multi line strings, template literals preserve all whitespaces, including newlines, exactly as we type them in our code.




<br/><br/><br/>

# Desktop Version
<div align="center">
  <img src="./full-shot.png" width="100%" alt="Completed project image" />
</div>



<br/><br/><br/>

# Links
GitHub Repository Link - https://github.com/ZunaidChowdhury/a5-PH-Github-Issue-Tracker <br/>
Live project on Netlify - https://zunaid-a5-ph-github-issue-tracker.netlify.app/ <br/>
Live project on GitHub - https://zunaidchowdhury.github.io/a5-PH-Github-Issue-Tracker/home.html <br/>
LinkedIn Profile - https://www.linkedin.com/in/zunaid-chowdhury-784735237/