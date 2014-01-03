// Initial content of main.js
var todos = [
    "Checkout project from github",
    "Invoke 'play run' in your console",
    "Open your browser and head over to http://localhost:9000",
    "Learn JS essentials"
];

console.log(todos);


// Iterating over an array
for (var k in todos) {
    console.log(k, todos[k]);
}

// Object literal
{
    key: 'value',
    array: ['has', 3, 'values'],
    object: {
        0: 'First'
    }
}


// DOM manipulation
var $todosContainer = document.querySelector('body .todos');
$todosContainer.innerHTML = todos;


// DOM create element, set class and append to other element
var $todo = document.createElement('a');
$todo.className = 'list-group-item';

$todosContainer.appendChild($todo);

// DOM create text node, concatenate strings
var $text = document.createTextNode("hello" + ", " + "world");
$todo.appendChild($text);

// Bootstrap - list structure
<div class="list-group">
    <a class="list-group-item"></a>
</div>


// DOM create checkbox
var $checkbox = document.createElement('input');
$checkbox.type = 'checkbox';
$checkbox.checked = true;

$todo.appendChild($checkbox);


// Javascript functions / methods
function addTodo2(title) {
    console.log(title);
    return true;
}

var addTodo = function(title) {
    console.log(title);
    return true;
};

// Functions as variables / methods
var object = {
    displayTodo: function(title) {

    }
};
object.addTodo = addTodo;

object.addTodo();



// Listening to change of checkbox
$checkbox.addEventListener('change', function(){
    todo.completed = $checkbox.checked;
});


// Bootstrap simple form
<form class="form-inline" role="form">
    <div class="form-group">
        <input type="text" class="form-control" id="todo-add-title" placeholder="Buy beer">
    </div>
    <button class="btn btn-default" id="todo-add-button">
        <span class="glyphicon glyphicon-plus"></span>
        Add Todo
    </button>
</form>


// Binding to DOM Events
var $addTitle = document.querySelector('#todo-add-title');
var $addButton = document.querySelector('#todo-add-button');
$addButton.addEventListener('click', function() {
    addTodo($addTitle.value);
});


// Some methods for array operations
var todos = [];

todos.push("append");
todos.unshift("at the beginning");

todos.push("at the end");
todos.reverse();

console.log(todos.pop()); // "at the beginning"
console.log(todos.shift()); // "at the end"

// Event-driven design
var Events = {

    _listeners : {},

    listen: function(eventName, listener) {
        this._listeners[eventName] = listener
    },
    trigger: function(eventName) {
        var listener = this._listeners[eventName];
        if (listener) {
            listener();
        }
    }
};

var Todos = {
    _todos: [],

    addTodo: function(title) {
        // ... add todo to list
        Events.trigger('newTodo');
    },
    getTodos: function() {

    }
};

var renderAllTodos =  function() {
    var todos = Todos.getTodos();
    // rendering
};
Events.listen('newTodo', renderAllTodos);


// Functional style
var notCompletedTodos = [];
for (var k in this._todos) {
    var todo = this._todos[k];
    if (!todo.completed) {
        notCompletedTodos.push(todo);
    }
}

return this._todos.filter(function(todo) {
    return !todo.completed;
});

// Other functional methods
// display all todos
this._todos.forEach(function(todo){
    console.log(todo);
});
// extract titles
var todosTitles = this._todos.map(function(todo){
    return todo.title;
});
// chaining
this._todos.filter(function(todo) {
    return !todo.completed;
}).map(function(todo) {
    return todo.title;
}).forEach(function(todo){
    console.log(todo);
});

// Advanced - reduce
// count both type of todos
var noOfCompletedTodos = this._todos.reduce(function(sum, todo) {
    if (todo.completed) {
        sum.completed++;
    } else {
        sum.notCompleted++;
    }
    return sum;
}, {
    completed: 0,
    notCompleted: 0
});


// Functional-style with context
this._todos.forEach(function(todo) {
    this.displayTodo(todo);
}, TodosView);


// Contexts
var a = {
    variable: 5,
    getVariable: function() {
        return this.variable;
    }
};
console.log(a.getVariable()); // 5

var b = {
    variable: 7
};
b.getVariable = a.getVariable;
console.log(b.getVariable()); // 7


var nakedFunction = a.getVariable;
console.log(nakedFunction()); // undefined
window.variable = 3;
console.log(nakedFunction()); // 3


// Contexts - invoke in specific context
console.log(a.getVariable.call(b)); // 7

// Contexts - binding context
var naked = a.getVariable.bind(a);
console.log(naked()); // 7
a.variable++;
console.log(naked()); // 8


// LocalStorage & JSON.parse
localStorage.setItem('key', 'value');
localStorage.setItem('json', JSON.stringify(object));

var object = JSON.parse(localStorage.getItem('json'));

// Storage class with callbacks
var Storage = {
    _storage: localStorage,

    saveTodos: function(todos, callback) {
        this._storage.setItem('todos', JSON.stringify(todos));
        callback();
    },

    getTodos: function(callback) {
        var todosStr = this._storage.getItem('todos');
        var todos;
        try {
            todos = JSON.parse(todosStr) || [];
        } catch (e) {
            todos = [];
        }
        callback(todos);
    }
};