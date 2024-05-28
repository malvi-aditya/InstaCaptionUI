import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const useStyles = makeStyles(() => ({
  content: {
    marginRight: "16px",
  },
  iconText: {
    display: "flex",
    gap: "3px",
    alignItems: "center",
  },
}));

export default function JSNotes(props) {
  const classes = useStyles();
  const [jsBasics, showJsbasics] = useState(false);
  const [closures, setClosures] = useState(false);
  const [funcProg, setFuncProg] = useState(false);
  const [promise, setPromise] = useState(false);
  const [asynAwait, setAsynAwait] = useState(false);
  return (
    <div className={classes.content}>
      <ul>
        <li>
          <div style={{ display: "flex", gap: "5px" }}>
            Javascript Basics:
            <div onClick={() => showJsbasics((val) => !val)}>
              {jsBasics ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
          </div>
          {jsBasics && (
            <ul>
              <li>
                Javascript runs in an execution context (can be seen like a big
                box), which has two parts.
                <br />
                1. Variable environment (Memory component): has variables and
                function mapping (a: 5, fn: {"{...}"}).
                <br />
                2. Thread of execution (Code component): where code is executed
                line by line.
                <br />
                Global execution context created first, execution happens in
                phases. First phase is Memory allocation (creation), JS skims
                thorugh all lines of code and in variable env it creates mapping
                of all funcs and variables. Variables have value "undefined" and
                in func directly the code/func definition is copied and stored
                as value.
                <br />
                The second, Execution, variables (in env) will be replaced by
                actual assigned/calculated value. When function invoked, new
                execution context similar to our global context(same 2
                components and same phase flow) is created inside our global
                context. When "return" keyword encountered in function, it tells
                the function return the control of the program where the
                function was invoked/back to the execution context. returned
                value then replaced with "undefined" in the mapping.(var a =
                func(n), a: undefined -> a: returnedVal). New execution context
                created by function is now deleted, also global one after whole
                execution done.
                <br />
                JS has its call stack to manage all these execution context, at
                the bottom will be our global execution context. Subsequent
                context created will pushed/popped when created/deleted. Control
                goes back to context on top of stack. Stack maintains order of
                execution of execution contexts. (Call stack can be seen in our
                inspect tools), after global context is popped when whole code
                execution is done then the call stack is finally empty.
              </li>
              <li>
                It is synchronous, single threaded language. Single threaded -
                one line/command executed at a time. synchronous - process in a
                specific order, go to the next line when current done
              </li>
              <li>
                <b>Hoisting</b>: Variable and function declarations are always
                moved to top of the code, so if a function is invoked before it
                is defined it still works (same for variables). Creation of
                execution context can explain this. If a func is logged (without
                invoking) before the definition, func definition is shown, and
                "undefined" for variables, explained by exec context memory
                creation (1st phase).
                <br />
                If a variable is not defined at all and we try to use it, then
                we get "Reference error: not defined" as the var does not exist
                in the global context/ no memory allocated for it. It needs to
                be defined atleast once anyhwere, diff between "undefined" and
                not defined is "undefined" is a special value/placeholder given
                to var initially/for time being (until is is assigned to
                something else) when it is added in memory/context. It takes
                space in memory and is not empty.
                <br />
                <b>Imp.:</b> If a func is defined as an arrow func then it
                behaves like a var and will have value "undefined" during the
                memory alloc phase. It needs to be defined using the "function"
                keyword to be available/copied and stored in the context. Also
                this acts like a var:-- var a = function(){"{...}"}
              </li>
              <li>
                Loosely/Weakly typed language, variables can hold any type. Not
                a good practice to assign a variables value to "undefined" as it
                is a kind of special placeholder to say a variable was never
                defined through the code.
              </li>
            </ul>
          )}
        </li>
        <li>
          Javascript Functions: <br />
          When function invoked, a new exec context created. Variables in the
          new context will be independent of var of same name in global context.
          Control of exec will be in our current context and js will look for
          var in local memory. When func exec done, context popped from call
          stack and control returns back to place where func was invoked.
          <br />
          window & this keywords: these global object is always created at the
          global level even if js file is empty. wherever js engine exists and
          js runs, global object is created (object name can be different when
          js running elsewhere like server etc., for browsers mainly: window).
          At the global level, this === window is true meaning both are same.
          Any var or func created in global context will have mapping in window
          object as well, var declared inside a func will not be in window
          object.
        </li>
        <li>
          <b>Scope Chain</b>: <br />
          Whenever a exec context is created, lexical env is created,{" "}
          <b>lexical env is local memory + lexical env of parent</b>. (lexical:
          hierarchy/sequence ) ex: func a() {"{ func c() {...} }"} - func c is
          lexically inside a and a is lexically inside the global scope.
          (location where the code is physically present). In the memory part of
          the context, there is reference to its lexical parent(env/memory).
          Global context points to null.
          <br />
          This linking/referencing chain of every env to its parent is scope
          chain. If js engine does not find a var etc. in the local memory then
          it goes to its lexical parent memory/next level of scope chain and so
          on.
        </li>
        <li>
          <b>Let & const</b>: <br />
          Both are hoisted but in a different way than "var". They are also
          allocated memory but in a different inaccesible memory space and not
          in the global object(can see in Scope->Script section in inspect),
          cannot be accessed until a value is put into them (will not exist in
          the window object also at the global level). <br />
          <b>Temporal dead zone</b>: It is the time between when let/const was
          hoisted and till it is initialised with some value. 1st phase when js
          skims and allocates memory, let/const are in a diff inaccessible
          memory aka temporal dead zone, when code is executed and some value
          assigned then they are out of the zone. Trying to access variable in
          this zone throws reference error (var is not initialised) though they
          are hoisted and allocated memory.
          <br />
          Redeclarations of let variables not allowed -> Syntax error (ex: let a
          = 10; let a = 100; or let a=10; var a = 10;).
          <br />
          In "const", initialising inline is necessary unlike "let" (ex: let a;
          a = 10 -> allowed but const a; a=10 -> syntax error, const a=10 ->
          only valid way). const variable cannot change value (const a = 10;
          a=100 invalid) <br />
          Syntax error: redeclaring let, const not initialised. Type error: re
          assigning const, reference error: trying to access anything
          inacccesible
        </li>
        <li>
          <b>Blocks in js</b>: <br />
          Also known as compound statement, it is defined by curly braces {"{}"}
          , used to combine multiple js statements into a group. use of block:
          multiple statements can be gropued and used at a place where js
          expects a single statement (like with "if" or "for", if expects single
          statement ahead of it: if(true) "here"). <br />
          Block scope: let & const inside a block are hoisted in a diff space in
          memory, called "Block" section (let and const declared in global are
          stored in "Script" section). they are block scope as they can be
          accessed only in the block (see inspect->scope) ("var" always stored
          in the global object). Block scopes also follow lexical scopes, these
          scopes are lexically present.
          <br />
          Shadowing: Redeclaring "var" shadows the previous value as the point
          to same location in memory (var a=10; {"{var a = 100}"}; -- a will be
          changed to 100). "let" declared inside block shadows "let" declared
          outside the block, both let store diff values ( let a =10;{" "}
          {"{ let a = 100; console.log(a) }"}; console.log(a); --- log inside
          block prints 100, outside log prints 10). works the same way in case
          of functions. <br />
          Illegal shadowing: let cannot be shadowed using a var: let a = 10;{" "}
          {"{ var a = 10; }"} (only let can shadow let), this is because var is
          trying to cross the boundary of its scope, shadowing works only when
          we are within the boundary of our scope. vice versa is ok -> var a =
          20; {"{ let a = 10; }"}. as var is function scope this is ok -> let a
          = 10; function x() {"{ var a = 100; }"}. behaviour same for arrow func
          as well.
        </li>
        <li>
          <div style={{ display: "flex", gap: "5px" }}>
            <b>Closures</b>:
            <div onClick={() => setClosures((val) => !val)}>
              {closures ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
          </div>
          {closures && (
            <>
              It means when a function is bind together/along with its with its
              lexical env. Func + reference to its lexical env = closure. Below
              ex: func y is returned by x and after execution of line var z =
              x(), x will be popped from stack and cease to exist. But still z()
              logs 7 as returned func y maintains its closure (lexical env). We
              can say not just func y was returned by x, but closure was
              returned. Closures are maintained at all depths of the scope
              chain.
              <br />
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
            function x() {
              var a = 7;
              function y() {
                console.log(a);
              }
              return y;
            }
            var z = x();
            //....any amount of code            
            z();
            `}
              </SyntaxHighlighter>
              setTimeout: setTimeout( function() {"{...}"}, 1000)
              <br />
              whenever this is encountered, js stores it at some place attaches
              a timer and executes the func/puts it in call stack after the
              timer is done. Meanwhile the rest of the code after setTimeout
              continues to execute (immediately after storing the func and
              attaching timer) and does not wait for setTimeout. Ques: print
              after every second - 1, 2,3,4,5 <br />
              solution 1: for loop using "let". "let" is block scope so new copy
              of i is there passed to timeout so it works.
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
            function x() {
              for(let i=1; i<=5; i++) {
                setTimeout( function () {
                  console.log(i);
                }, i * 1000);
              }
            }         
            x();
            `}
              </SyntaxHighlighter>
              Using var: the incorrect way below. as var is not block scope, i
              is used by reference so following prints 6,6,6,6,6 after every
              second. i has become 6 after for loop and every setTimeout is
              pointing to it:
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
            function x() {
              for(var i=1; i<=5; i++) {
                setTimeout( function () {
                  console.log(i);
                }, i * 1000);
              }
            }         
            x();
            `}
              </SyntaxHighlighter>
              Fix: using closures, we enclose it in a function, so everytime new
              value/copy of i is passed and everyone does not point to same
              place:
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
            function x() {
              for(var i=1; i<=5; i++) {
                function close(x) {
                  setTimeout( function () {
                    console.log(x);
                  }, x * 1000);
                }
                close(i);
              }
            }         
            x();
            `}
              </SyntaxHighlighter>
              Advantages of closures: Function currying, setTimeout, HOC
              (Memoize, once) , Module patterns, data hiding & encapsulation.{" "}
              <br />
              Data hiding & encapsulation: Avoiding access of a variable from
              some other function/parts of a code. Using closure: count var is
              inside func and cannot be accessed by anyone else and can be
              modified using the returned func. Another advantage, we can have
              multiple counters and each will store different count.
              <br />
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
            function Counter() {
              var count = 0;
              
              this.incrementCounter = function () {
                count++;
              }

              this.decrementCounter = function () {
                count--;
              }
            }         
            var counter1 = new Counter();
            counter1.incrementCounter();

            var counter2 = new Counter();
            counter2.incrementCounter();
            counter2.decrementCounter();
            `}
              </SyntaxHighlighter>
              Disadvantages of closure: Overconsumption of memory, lot of memory
              used if lot of closures created in program, if closed over
              variables are not garbage collected and not handled properly there
              can be memory leaks. Garbage collector: frees up the unutilised
              memory, variables not being used anymore.
            </>
          )}
        </li>
        <li>
          First Class Functions: <br />
          1. Function Statement aka Function declaration: the usual way of
          declaring functions is function statement :-- function a() {"{....}"}
          <br />
          2. Function Expression: functions can be treated just like a value and
          can be assigned to other variables, this is a func expression :-- var
          b = function () {"{....}"} <br />
          Major Diff b/w func statement & exp. is hoisting. (see basics) During
          1st phase (memory alloc), in func statement map will be created and
          func definition will be copied/stored so it can be called before the
          statement but in func exp. var b will be undefined before executing
          the line where its assigned the func so we cannot call it before.{" "}
          <br />
          a(); function a() {"{....}"}; -> works but this doesnt -> b(); var b =
          function () {"{....}"} <br />
          3. Anonymous Functions: Functions without a name, they dont have any
          identity. ex: function () {"{...}"}. We can only use them where func
          are used as values (like above in a func exp.), otherwise syntax error
          as its a func statement and statements require a name. <br />
          4. Named Function expression: When an func exp. has a name. ex: var b
          = function c() {"{....}"}. If we try to call c() in global scope it
          throws error as c does not exist in global scope. ex: <br />
          var b = function c() {"{...}"}; <br />
          c(); <br />
          5. Diff b/w parameters and arguments: <br />
          Params - local variables in the functions scope cannot be accessd
          outside, the variables which it accepts. ex: function a(param1,
          param2) {"{...}"}; <br />
          Arguments - The values which we pass to func when invoking it. ex:
          a(arg1, arg2); <br />
          6. First Class Functions: In js we can use func as values, pass them
          as arguments to another func, or return a func from another func or
          assign it to a variable. The ability to do all this is called first
          class functions aka first class citizens. It also helps in achieving
          async operations.
        </li>
        <li>
          CallBack functions: Func passed as an arg is a callback func. ex: here
          y is the callback func. why callback? - we call a func y sometime
          later in our code, like we give x the responsibilty of calling back y
          sometime later. best example is setTimeout, we pass a func as an arg
          and time after which to invoke the func (see inspect/source call stack
          to visualise this, after timer a func will be pushed in stack).
          <br />
          function x(y) {"{...}"}; <br />x (function y() {"{...}"}}); <br />
          Every execution in js happens only from the one call stack, can also
          say single threaded where this stack is the thread. when any operation
          blocks the call stack, it is called <b>
            blocking the main thread.
          </b>{" "}
          <br />
          Event Listeners: Event listeners also take up callback functions, when
          the event occurs the func is brought in the call stack and executed.
          ex: <br />
          document.getElementById("someIdGivenToADiv").addEventListener("event(click/hover)",
          function name(params) {"{...}"}) <br />
          On button click display no. of times it is clicked: count add the
          adding listener in a func (closure), inner callback stores the count
          (lexical env. /closure): <br />
          function attachEventListener() {"{"} <br />
          let count = 0; <br />
          document.getElementById("buttonId").addEventListener("click",
          console.log("Click: ", ++count)); <br />
          } <br />
          attachEventListener(); <br />
          Event Listeners are heavy, meaning they take up memory due to
          maintaining closures etc. We can have multiple listeners etc. in our
          page taking up lot of memory which can slow doen the ui. So, a good
          practice, they need to be removed after use for garbage collection.
        </li>
        <li>
          Event Loop: <br />
          In the browser we have JS Engine & in the js engine we have call
          stack, this stack immediately executes anything which is in it and
          waits for nothing, so how to execute code which has to execute after
          some time and not immediately. <br />
          This is where a browser comes in, a browser has every power that we
          need ex: timers, localStorage, web url, hitting servers, geolocation
          etc. To use all that, we have <b>Web APIs</b> for the same for
          creating the connection between the browser and the js engine. Some of
          the web apis which are a part of browser: setTimeout, DOM APIs
          (document.getElementById etc.), fetch(), localStorage, console,
          location etc. Browser gives access of all these to the js engine for
          using them through the keyword "window". Browser wraps up all these
          apis in the global object, or the "window" object
          (window.console.log() & console.log() both same just like any other
          global variable). when we call any of these web apis, browser
          internally has their implementations which run and do the task (like
          log, set timer etc.) Other places where js runs might have different
          web apis and their implementations. (node.js, smartwatches, water
          cooler etc.)
          <br />
          As we encounter setTimeout, browser registers the function in it and
          starts the timer, now after the timer is up we need the function in
          the call stack as everything is executed only there. Here event loop
          and callBack queue comes. After timer expires, callback func put into
          the callback queue. Event loop acts like a gatekeeper, it checks the
          callback queue and puts the func in the call stack. All callback func
          are pushed in callback queue waiting to be executed, event loop
          continuously checks the call stack, as soon its empty and there's
          something in the queue to be executed it is pushed in the call stack.{" "}
          <br />
          <b>fetch()</b> - This works slightly differently than other callback
          funcs. When we encounter a fetch, api call is made to passed url and
          the callback func to be executed after promise is resolved is
          registered in the browser. when data is received from server, the
          callback func is not pushed in the queue umlike other callback funcs.
          Here <b>Microtask queue</b> comes in, similar to callback queue but
          has higher priority. In case of fetch, the callback func will be
          pushed in the microtask queue and event loop picks it to be executed
          first as soon as call stack empty (then callback queue processed).{" "}
          <br />
          All callback functions that come from promises are pushed in microtask
          queue, also mutation observers. everyother callback func is pushed in
          callback queue also known as <b>Task Queue</b>. Callback queue is
          touched only when microtask queue is empty. <br />
          <b>Starvation:</b> <br />
          If a func in microtask queue is creating another microtask/callback
          func (and so on many func pushed in microtask queue), and if there is
          also a func in callback queue it might have to wait for a long time
          before being executed. <br />
          Event loop is always running, only asynchronous web apis are
          registered in the browser and not the synchronous callback functions
          like what we pass inside map, filter, and reduce.
        </li>
        <li>
          JS Engine: <br />
          Js can run anywhere (browser, smartwatch etc.) because of JavaScript
          runtime environment. It has Js engine (heart of js runtime env), web
          apis, event loop, queues etc. everything needed to run js code. Js
          engine is just a code which processes our js code (google's v8 js
          engine is written in c++). It takes code as an input, goes through 3
          major steps: 1) Parsing 2) Compilation 3) Execution. <br />
          In parsing, tokenisation (converting out js code into tokens) happens
          and there is also Syntax Parser which creates an AST (Abstract Syntax
          tree) (Visualize AST:{" "}
          <a href={"https://astexplorer.net/"} target="_blank">
            https://astexplorer.net/
          </a>
          .) <br />
          The AST is then passed to compilation. Some languages use interpreter
          which directly executes code line by line and no need to compile
          (pros: it is fast). Some languages use compiler, which compiles the
          code to create an efficient and optimised version and then executes
          (pros: efficiency). JS can behave as both (interpreted or compiled
          language )depending on the JS engine. <br />
          JS engines can use interpreter + compiler which makes a JIT
          Compilation (Just in Time). <br />
          Now the AST goes to the interpreter to convert it (high level code) to
          executable code (called Bytecode) and at the same time it takes help
          from compiler to optimise the code. While interpreter executes code
          line by line it interacts with the compiler to optimise the code as
          much it can. Execution then happens using call stack and memory heap
          (where all var and func assigned memory) inside the js engine. <br />
          Now we also have a garbage collector in there (in sync with memory
          heap etc.) to free up unused memory. It uses an algo known as{" "}
          <b>Mark & sweep algo.</b> We also have some optimising techniques in
          the engine, some of them are: Inlining, Inline caching, copy elision
          (read more). <br />
          This all is a generic js engine, diff engine have diff
          ways/implementations of the engine.
        </li>
        <li>
          setTimeout issue: lets say we added a setTimeout with 3 second timer,
          the callback func gets registered in the browser (using setTimeouts
          web api) and the the timer starts. But after the setTiemout line,
          suppose there is execution to be done which can require lets say 7
          sec. Now, the callback func which is expected to execute after 3 sec
          wont run for 7 sec atleast. This is because the global execution
          context is still in the stack and subsequent lines (after timeout one)
          are still being executed. Meanwhile the timer is up and the callback
          func is put in callback queue, waiting to be executed as the stack is
          not empty. After 7 sec when stack empty, event loop puts it in call
          stack and then it gets executed. This is why we should not block the
          main thread/ call stack for long time. <br />a hack to block thread
          for long time:{" "}
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              let startTime = new Date().getTime();
              let endTime = startTime;
              let delay = 10000 // change delay to any ms
              while (endTime < startTime + delay) {
                endTime = new Date().getTime();
              }
            `}
          </SyntaxHighlighter>
        </li>
        <li>
          <div style={{ display: "flex", gap: "5px" }}>
            Functional Programming:
            <div onClick={() => setFuncProg((val) => !val)}>
              {funcProg ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
          </div>
          {funcProg && (
            <>
              Higher order function: A function which takes anohter function as
              an argument or returns a from it function is HOC. <br />
              Following is a way to write code for the problem: we have a radius
              array and want to generate 3 more arrays: circumference, area and
              diameter. Repeating code as below is not the correct way to do it.
              <br />
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
              let radius = [3, 1, 5, 7];
              
              function area (rad) {
                let res = [];
                for (let i=0; i<rad.length; i++) {
                  res.push(Math.PI * rad[i] * rad[i]);
                }
                return res;
              }

              function circumference (rad) {
                let res = [];
                for (let i=0; i<rad.length; i++) {
                  res.push(2 * Math.PI * rad[i]);
                }
                return res;
              }

              function diameter (rad) {
                let res = [];
                for (let i=0; i<rad.length; i++) {
                  res.push(2 * rad[i]);
                }
                return res;
              }

              console.log( area(radius) );
              console.log( circumference(radius) );
              console.log( diameter(radius) );
            `}
              </SyntaxHighlighter>
              Better way of improving this is to extract the computation logic
              out and keep a common function for calculations like below:
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
              let radius = [3, 1, 5, 7];

              const area = function (radius) {
                return Math.PI * radius * radius;
              }

              const circumference = function (radius) {
                return 2 * Math.PI * radius;
              }

              const diameter = function (radius) {
                return 2 * radius;
              }
              
              function calculate (rad, operation) {
                let res = [];
                for (let i=0; i<rad.length; i++) {
                  res.push( operation(rad[i]);
                }
                return res;
              }

              console.log( calculate(radius, area) );
              console.log( calculate(radius, circumference) );
              console.log( calculate(radius, diameter) );
            `}
              </SyntaxHighlighter>
              Now the code is divided into several units and each performs its
              own task. Area func just calculates area similarly other two, and
              calculate func just takes any operation and input and performs
              that operation on the input. <br />
              We have small reusable components each doing some task, this
              increases reusability, modularity. We broke down the code into
              smaller functionl units. <br />
              If we want to convert the calculate func like how we call
              Array.map, in the calculate func "this" points to the array with
              which it is invoked (radius in our case) :
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
              let radius = [3, 1, 5, 7];

              const area = function (radius) {
                return Math.PI * radius * radius;
              }

              Array.prototype.calculate = function(operation) {
                let res = [];
                for (let i=0; i < this.length; i++) {
                  res.push( operation( this[i] ) );
                }
                return res;
              }

              console.log( radius.calculate(area) );
            `}
              </SyntaxHighlighter>
            </>
          )}
        </li>
        <li>
          Map, filter & reduce: <br />
          Map: used to perform some operation on each element and transform the
          array to create a new array. arr.map(func): where arr is array to map
          on and func is the callback func (any operation to perform) <br />
          Filter: Used to filter out elements from an array based on the passed
          logic. arr.filter(func) where arr is array to be filtered and func is
          the filter logic func (callback func passed to filter). <br />
          Reduce: Use when we have to take all the values in an array and come
          up with a single value out of them. arr.reduce(func, initial) takes
          two arguments: callback func and initial value of accumulator <br />
          ex: sum of elements of array: arr.reduce(function (acc, curr){" "}
          {"{ acc = acc + curr; return acc; }"}, 0) <br />
          Above the callback func which we pass gets two parameters, acc:
          accumulator which is initialised to some value (0 here) and our result
          is accumulated in it. second param curr: is the current value, when
          iterating over an array, it is the current value which we are on.
          first argument: callback func and the second argument is the initial
          value to be assigned to the accumulator. <br />
          Chaining of all these three is possible like:
          array.map(func1).filter(func2).reduce(.....)
        </li>
        <li>
          Callbacks issue: <br />
          If theres a flow of apis like if one api is resolved we need to call a
          new api and so on, callback funcs can be big issue. the code grows
          horizontally (called pyramid of doom) and is highly unreadable,
          unmaintainable etc. ex: <br />
          api1(data, function1(){" "}
          {"{ api2(data, function2 () { api3()....so on} ) }"}) <br />
          Inversion of control: Its like we lose control of our code while using
          callbacks. Like above we gave control to api1 (when it is resolved)
          the responsibility of calling api2, this is risky and we are blindly
          trusting ap1 to call api2 by giving the callback func. Api1 might have
          issues and it may happen that api2 never runs or api2 runs twice (lets
          say api2 is critical, some paymeny api etc.)
        </li>
        <li>
          <div style={{ display: "flex", gap: "5px" }}>
            <b>Promises</b>:
            <div onClick={() => setPromise((val) => !val)}>
              {promise ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
          </div>

          {promise && (
            <>
              Used to handle async operations in js. Ex: shopping website, a
              cart, first createOrder api, when resolved, proceed to payment
              api.
              <br />
              We can use callbacks to create a flow, but as we know from above
              issues of callback this is not reliable: <br />
              createOrder( cart, function(orderId){" "}
              {"{ proceedToPayment(orderId); }"}) // cart = ["books", "pen",
              "shoes"]; <br />
              Here we use promises to create a better and reliable flow. Our
              func will return a promise which is nothing but an empty object
              with some undefined data key. Whenever the api returns data after
              some time and the promise is resolved the undefined data will be
              filled with the returned data. (after executing promise line, rest
              of the lines executed as usual). We <b>attach</b> a callback
              function using then(), this callback func is automatically called
              after we get the data. <br />
              const promise = createOrder(cart); <br />
              // promise -> {"{ data: undefined }"} empty before we get data.{" "}
              <br />
              // promise -> {"{ data: orderDetails}"} after we get data. <br />
              promise.then(function (orderId) {"{ proceedToPayment(orderId); }"}
              ); <br />
              So there is big difference b/w the callback way and the promise
              way: 1st one we are passing the callback func to another func and
              the 1st func (createOrder here) will call it whenever it wants to.
              2nd way we are attaching a callback func to promise object, so we
              have the control of the program with us (we are not passing a func
              to another func). createOrder will do its job of getting data, as
              soon as there is data in the promise object we have the guarantee
              of calling the callback func passed only once. <br />
              Promise object actual: fetch() return a promise (see its response)
              <br />
              It mainly has three things, PromiseResult - which stores the
              fetched data. PromisePrototype, and third PromiseState - this is
              the state of the promise, if its not resolved it will be in
              "pending" state, after getting data it will be in "fulfilled"
              state. If failed then "rejected state", it is guaranteed to be in
              these 3 states. (refer mozilla docs). Promise object is immutable,
              we cannot change any value in object. <br />
              Promise chaininig to resolve callback hell/ pyramid of doom:{" "}
              <br />
              We can add multiple .then() and chain to add many callback funcs.
              it solves the issue of passing multiple callback funcs (see
              callback issues) ex: <br />
              createOrder(cart).then(data => return payment(data) ).then(data =>
              return updateWallet(data)).then(data => return showSummary(data)){" "}
              <br />
              Some things in chaining: When multiple .then chained, always
              return anything (like above) that need to be used in the next then
              in the chain. Also if there is an error in any part of the chain,
              the last .catch which we add handles the error. <br />
              <b>Imp:</b> Catch handles any error in the chain which is above it
              in the chain, if there is a then after the catch in the chain it
              will execute. let there be any no. of then statements above catch,
              if one then fails then non of the subsequent then up until the
              catch will not execute, but if there is then after catch it will
              execute. ex: showsummary always runs, error in paymeny/createOrder
              will be catched.
              <br />
              createOrder(cart).then(data => return payment(data) ).then(data =>
              return updateWallet(data)).catch(err =>
              console.log(err.message)).then(data => return showSummary(data))
              <br /> <br />
              Create a promise: we call the Promise() constructor which takes a
              function and provides to functions resolve & reject given by
              Promise api/object to build promises. when a promise is resolved
              we handle it with the callback func passed to then, else when
              promise is rejected (reject()), we handle it passing callback
              function to catch() which is chained with then and receiced the
              error object.
              <br />
              const pr = new Promise(function (resolve, reject) {"{ }"})
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
              // This is consumer as we are consuming the promise
              const promise = createOrder(cart) // cart =["shoes" , "pant",.....]

              promise
                .then((data) => { console.log(data)})
                .catch((err) => { console.log(err.message)});

              // Producer: produces the promise;

              function createOrder(cart) {
                const pr = new Promise((resolve, reject) => {
                  if (!validCart(cart)) { // some validation logic
                    const err = new Error("Some error message");
                    reject(err);
                  }

                  // our code logic then we have data and return it in resolve
                  
                  if (everythingOk) {
                    resolve(data);
                  }
                })

                return pr;
              }
            `}
              </SyntaxHighlighter>
              <b>Promise APIs:</b> <br />
              1. Promise.all(): Used when we have to make multiple api calls
              parallely. We can pass an array (check iterable type) of promises
              to the all func. ex: Promise.all([promise1, promise2, promise3]) -
              3 parallel api calls will be made. if all 3 calls are succesful it
              returns an array of values/ our fetched data. it will wait for
              every promise to resolve then only return the result, if api call
              times are p1 - 3s, p2 - 1s, p3 - 2s then the fetched data array is
              returned after 3s. <br />
              If any of the promise fails/rejected, immediately an error is
              thrown having the error from the failed promise (promise.all() is
              rejected, whole collection of promises). If p2 fails error thrown
              after 1s, p1 & p3 api calls made (the promise) are not cancelled.
              As soon as error encountered, promise.all() fails, it does not
              wait for other api calls made regardless of their success/failure.{" "}
              <br />
              2. Promise.allSettled([p1, p2, p3]): Same as above in case every
              promise is succesfull. But if any promise fails, it still waits
              for every other promise to settle (either reject/resolve) and then
              returns array (same length as no. of promises) of the results. ex:
              [val1, err2, val3] in case p2 fails. <br />
              3. Promise.race([p1, p2,p3]) : As the name, it is a race. The
              promise which settles the earliest is returned whether it is a
              success or failure. ex: p2 resolves in 1s, returned value: val2
              else returns error if it is rejected. Other promise doesnt matter
              what their result is, the one which settles first is returned.{" "}
              <br />
              4. Promise.any([p1,p2,p3]): Same as race but it waits for a
              succesful promise, if the first promise settled is rejected then
              it continues to wait for other promises until it gets a successful
              promise and returns the value/fetced data (Seeking for first
              success). If all promises fail, then an array of errors from all
              promises is returned It is called <b>Aggregate Error</b>. Access
              the array of errors in catch section -> err.errors.
              <br />
              All the four above return a promise, attach a callback func using
              then to see result. ex : Promise.all([p1, p2, p3]).then((res) =>{" "}
              {"{...}"})
            </>
          )}
        </li>
        <li>
          <div style={{ display: "flex", gap: "5px" }}>
            <b>Async, await</b>:
            <div onClick={() => setAsynAwait((val) => !val)}>
              {asynAwait ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
          </div>
          {asynAwait && (
            <>
              Async: Keyword used to create an async function ex: async function
              getData() {"{...}"}. Async func always returns promise, either we
              create a promise and return from it or if we return a string/int
              the func will wrap the value in a promise and return. <br />
              Async and await combo is used to handle promises. Earlier way of
              handling promises: <br />
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
              const p = new Promise((resolve, reject) => {
                resolve("Promise resolved");
              });

              function getData() {
                p.then((res) => console.log(res));
                console.log("Here");
              }

              getData();
            `}
              </SyntaxHighlighter>
              Using async await for the same:
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
              const p = new Promise((resolve, reject) => {
                resolve("Promise resolved");
              });

              async function getData() {
                const data = await p;
                console.log("Here");
                console.log(data);
              }

              getData();
            `}
              </SyntaxHighlighter>
              We will use the await keyword in front of the promise and will get
              the data in a variable. await can be used only inside an async
              func. <br />
              <b>Difference</b> b/w both: Major difference is the execution of
              the code written after the promise resolution line. Assume promise
              takes 10s to resolve. In the old way (.then), the promise.then is
              registered and immediately the subsequent lines are executed, so
              immediately "Here" will be printed and then after 10s Promise
              resolved will be printed, execution does not stop at that line. In
              async await execution stops at the await line and waits there
              until the promise is resolved, so "Here" wont be printed
              immediately, it will go to next line only after promise resolves
              after 10s. <br />
              The following code will print both their subsequent logs
              immediately after 10s as they are the same promise and will be
              resolved after 10s, we will get 4 logs immediately after 10s.
              <br />
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
              const p = new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve("Promise resolved");
                }, 10000)
              });

              async function getData() {
                const data1 = await p;
                console.log("Here1");
                console.log(data1);

                const data2 = await p;
                console.log("Here2");
                console.log(data2);
              }

              getData();
            `}
              </SyntaxHighlighter>
              But if we have two promises with different timeouts lets say p1:
              10s and p2: 5s, after 10s everything (all 4 logs) gets printed as
              both will be resolved after 10s. But if we swap times p1: 5s and
              p2: 10s, after 5s, logs after p1 get printed and more 5s (total
              10s), logs after p2 get printed.
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
              const p1 = new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve("Promise resolved 1");
                }, 10000);
              });

              const p2 = new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve("Promise resolved 2");
                }, 5000);
              });

              //swap times for another behaviour

              async function getData() {
                const data1 = await p1;
                console.log("Here1");
                console.log(data1);

                const data2 = await p2;
                console.log("Here2");
                console.log(data2);
              }

              getData();
            `}
              </SyntaxHighlighter>
              <b>Imp. </b> So as we know, js never stops executing, it just
              appears as if the execution is stopped there. Js engine (never
              waits) is not waiting at the await line for the promise to
              resolve, getData() func is not present even in the call stack. As
              it encounters await line, getData() is removed from the call stack
              while p1/p2 is resolving. when its resolved execution starts again
              from the next line and so on.
              <br />
              Using <b>fetch()</b>. it returns a promise. Once the promise is
              resolved, we get a "Response" object in the variable. This object
              has a body (key) which is a <b>readable stream</b>. We do
              Response.json() which is again a promise which on resolution gives
              our final result. <br />
              const data = await fetch(); // data has response object
              <br />
              const jsonValue = await data.json(); <br />
              Error handling can be done through try catch block: try{" "}
              {"{ const data = await fetch(...); }"} catch(err)
              {"{console.log(err)}"} <br />
              Old way of handling can also be don as async func returns a
              promise: <br />
              async function getData() {"{....}"}; <br />
              getData().catch(err => console.log(err)); <br />
              Async await is just a <b>syntactic sugar</b> over then and catch,
              behind the scenes it uses then only. improves readability and the
              flow makes sense, we dont have to deal with callback funcs and all.
            </>
          )}
        </li>
      </ul>
    </div>
  );
}
