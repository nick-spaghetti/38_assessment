Answer the following questions below:
- What are some ways of managing asynchronous code in JavaScript?
	- js provides three methods of handling async code:
		- callbacks - allow you to provide functions to call
		- promises - allow you to chain methods together
		- async / await - 'syntactic sugar' for promises

- What is a Promise?
	- a promise in js is a proxy for a value not necessarily known when the promise is created.  it allows you to associate handlers with an asynchronous action's eventual success value or failure reason

- What are the differences between an async function and a regular function?
	- the word 'async' before a function means that that function returns a promise.  other values are wrapped in a resolved promise automatically.  async ensures that the function returns a promise and wraps non-promises in it

- What is the difference between Node.js and Express.js?
	- node is an environment for executing js code outside of a browser.  often used for building back-end services like api
	- express is a framework that uses node to simplify its api and makes it easier to organize an app's functionality with middleware and routing

- What is the error-first callback pattern?
	- the error-first pattern consists of executing a function when the async operation ends.  it takes an error as the first argument and the result of the request as extra arguments

- What is middleware?
	- middleware is a type of computer software that helps glue everything together.  encompass everything from web servers to authentication systems to messaging tools

- What does the `next` function do?
	- executes the middleware succeeding the current middleware.  i.e. i don't want to deal with this, you deal with it

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

	• there are a few issues, mainly in order to streamline things we could break the code up into different chunks.  they're all going to the same users api, so we could make that it's own async function.  we can set the usernames as an array, then have a getUser that combines the async request to the api and passes in the usernames for the users

```js
const usernames = ['elie', 'joelburton', 'mmmaaatttttt'];
const users = await getUsers(usernames);

async function getUser(username) {
    return $.getJSON(`https://api.github.com/users/${username}`);
};

async function getUsers(usernames) {
    const userPromises = usernames.map(getUser);
    const users = await Promise.all(userPromises);
    return users;
};
```