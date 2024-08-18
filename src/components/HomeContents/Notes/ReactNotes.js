import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function ReactNotes(props) {
  const [showPerf, setShowPerf] = useState(false);
  const [hooks, setHooks] = useState(false);
  return (
    <>
      <ul>
        <li>
          <div style={{ display: "flex", gap: "5px" }}>
            React Hooks: <br />
            <div onClick={() => setHooks((val) => !val)}>
              {hooks ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
          </div>
          {hooks && (
            <>
              Hooks: Can be used only in functional components. Cannot be nested
              in anything, like inside an if or for loop. They need to be called
              in exact order in every component render, cannot be called
              conditionally.
              <br />
              1. <b>useState</b>: Returns an array, first is state and second is
              its setter func. pass default value of state ex: const [a, setA] =
              useState(4); updating the state re renders the component with the
              new state. prefer to pass a func in the setter func to accurately
              get the previous value of the state. We can pass a func instead of
              a default value (like 4 here), the func will only run once when
              the component is rendered initially. <br />
              2. <b>useEffect</b>: Add Side effects, on a state change etc. we
              want to do something like api call etc. pass a func in useEffect
              and the func gets executed every time we render. pass a second
              arg- an array of dependencies, whenever any dependency changes the
              useEffect is triggered. Add event listeners in the func (and an
              empty dependency array) to perform some actions on window resize
              etc. return the cleanup values from the useEffect so the listeners
              are removed on unmount ex: <br />
              useEffect(() => {"{"} <br />
              window.addEventListener('resize', handleResize); <br />
              return () => {"{"} <br />
              window.removeEventListener('resize', handleResize); }<br />} , []){" "}
              <br />
              3. <b>useMemo</b>: If there is a slow function in our code, use
              useMemo to improve/optimise performance. Memo - Memoization, cache
              the result so we dont have to compute it every time. Pass a func
              to useMemo which has the slow func inside. Second arg is the
              dependency array, pass the state/value on change of which we need
              to recompute/call the slow func. This way we run the slow func
              only we need to and not every time. Over usage is also not good,
              we increase a useMemo func call with every useMemo and also more
              memory is consumed to cache/store. <br />
              <b>Imp.</b> If two objects are same meaning having the same
              values, they are still diffeent as they refer to diff objects. So
              if we have declared an object in a variable and add it as a
              dependency in useEffect and component re renders due to some other
              state, useEffect triggers although the object is same but
              reference is new, use useMemo to fix this. <br />
              4. <b>useRef</b>: Ex: we want to count how many times our
              component re renders, one way is to create a state to store render
              count and add an useEffect which just increments this states value
              by 1. Now a major flaw in this is when we update the state, it
              will trigger re render and again update the state and hence in an
              infinite loop. <br />
              Correct way to do this is by useRef. States and refs both persist
              between re renders of the component but refs do not cause the
              component to re update/ re render when it is changed. It is
              different from our component render cycle. useRef returns an
              object with a key called current which has a default value if
              passed in useRef like here current will be 1.
              <br />
              const renderCount = useRef(1); // returns {"{ current: 1 }"} in
              renderCount <br />
              useEffect(() =>{" "}
              {"{ renderCount.current = renderCount.current + 1 }"}) <br />
              Most common use case is to create a ref and attach it to a element
              to perform some actions on it. Ex: on clicking button the input
              text box will be focussed.
              <br />
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
                  const inputRef = useRef();

                  function focus() {
                    inputRef.current.focus();
                  }

                  return (
                    <>
                      <input ref={inputRef} value={} onChange={} />
                      <button onClick={focus}>Focus</button>
                    </>
                  )
                `}
              </SyntaxHighlighter>
              One more use case: store a previous value of a state, in state
              variable we only have the current value and not the previous
              value. We can add an useEffect which triggers on the states
              change, and pass a func where we set the current state in the ref
              - useEffect(() => {"{ inputRef.current = state }"}, [state]){" "}
              <br />
              5. <b>useContext</b>: Consider this ThemeContext created with
              createContext function export to use in rest of the app.
              ThemeContext.Provider wraps up the all parts/app where we need
              access to the info/ variables (passed as value prop to provider).
              All of the children etc of the components wrapped have access to
              the value.
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
                  export const ThemeContext = React.createContext();

                  export default function App() {

                    const [darkTheme, setDarkTheme] = useState(true);

                    function toggleTheme() {
                      setDarkTheme(prev => !prev);             
                    }

                    return (
                      <>
                        <ThemeContext.Provider value={darkTheme}>
                        <button onClick={toggleTheme}>Toggle</button>
                        <FunctionalComponent />
                        </ThemeContext.Provider>
                      </>
                    )
                  }
                `}
              </SyntaxHighlighter>
              Now we use useContext to use the value (darkTheme) in the
              FunctionalComponent as following.
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
              import { useContext } from 'react';
              import ThemeContext from './---';

              export default function FunctionalComponent () {

                const darkTheme = useContext(ThemeContext);

                return (

                )
              }
            `}
              </SyntaxHighlighter>
              6. <b>useReducer</b>: Also allows to manage state and re render
              component when it changes, but gives a concrete way to handle
              complex states, based on some action that we send it transforms
              current state into the new state. consider a simple counter, 2
              func and buttons that increment and decrement the count.
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
                export default function App() {

                  const [count, setCount] = useState(0);

                  function inc() {
                    setCount(prev => prev + 1);
                  } 

                  function dec() {
                    setCount(prev => prev - 1);
                  }

                  return (
                    <>
                      <button onClick={dec}> - </button>
                      <span>{count}</span>
                      <button onClick={inc}> + </button>
                    </>
                  )
                }
              `}
              </SyntaxHighlighter>
              Now we use useReducer for the same thing. useReducer takes two
              args, first is the reducer - a func that we perform on our state
              to get the new state. Second is the initial state (here an object
              with count 0), generally pass objects instead of the actual value.
              It returns our state object and a dispatch func which we call to
              update our state. reducer func takes the current state and action
              (which we pass to dispatch) as params. whatever passed to dispatch
              becomes the action param. Here in inc func, we pass the action as
              increment, so in reducer when we check action.type as 'increment'
              we return the new state accordingly.
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
                import React, { useReducer } from 'react';

                const ACTIONS = {
                  INCREMENT: 'increment',
                  DECREMENT: 'decrement'
                }

                function reducer(state, action) {
                  switch (action.type) {
                    case ACTIONS.INCREMENT: 
                      return { count: state.count + 1 }
                    case ACTIONS.DECREMENT:
                      return { count: state.count - 1 }
                    default: 
                      return state
                  }
                }

                export default function App() {

                  const [state, dispatch] = useReducer(reducer, { count: 0 }); // same as useState line

                  function inc() {
                    dispatch({ type: ACTIONS.INCREMENT });
                  }

                  function dec() {
                    dispatch({ type: ACTIONS.DECREMENT });
                  }

                  return (
                    <>
                      <button onClick={dec}> - </button>
                      <span>{state.count}</span>
                      <button onClick={inc}> + </button>
                    </>
                  )
                }
              `}
              </SyntaxHighlighter>
              Like here we have increment and decrement in reducer func, our
              state only changes when there is an action of these two types.
              Unexpected state changes due to some side effects are avoided.
              This is an simple example to demonstrate useReducer, it is used in
              much complex state management etc. We can send a payload in the
              dispatch func if we want to send some value that reducer func
              needs to access, here we can access te key value as
              action.payload.key ex: dispatch(
              {"{ type: '', payload: { key: value }}"})
              <br />
              7. <b>useCallback</b>: Similar to useMemo, it is not going to run
              contents inside of it unless something changes, after wrapping our
              func with useCallback it will only recreate our func when any of
              the dependencies changes. ex: <br />
              const a = () => {"{...}"} // before wrapping with useCallback
              const a = useCallback( () => {"{...}"}, [state]) // after wrapping{" "}
              <br />
              <b>Difference b/w useMemo & useCallback</b> is useMemo takes a
              func and returns the return value of the func whereas useCallback
              returns the whole func. Lets say our func returns an array, in
              useMemo variable a will be set to that array, in useCallback 'a'
              will be set to the func itself. We can pass params to the returned
              func etc. useMemo does not return a func so we cannot do this.
              Another use case can be when lets say a func is very slow to
              create, then we create and return it only when we want to and not
              everytime. <br />
              8. Create custom hooks: Make sure the name starts with 'use'.
              Creating a hook to store in local storage. We return a value and
              setter like useState from our custom hook. We take a key and
              initialVal as params. in any place we use it as const [age,
              setAge] = useLocalStorage('age', 23);
              <SyntaxHighlighter language="javascript" style={docco}>
                {`
                import { useState, useEffect } from 'react';

                function getSavedValue(key, initialVal) {
                  const savedValue = JSON.parse(localStorage.getItem(key));
                  if (savedValue) return savedValue;

                  if (initialVal instanceof Function) { // initial val can be func like we pass to useState
                    return initialVal();
                  }
                  return initialVal
                }

                export default function useLocalStorage(key, initialVal) {

                  const [value, setValue] = useState(() => {
                    return getSavedValue(key, initialVal);
                  });

                  useEffect(() => {
                    localStorage.setItem(key, JSON.stringify(value));
                  }, [value])

                  return [value, setValue];
                }
              `}
              </SyntaxHighlighter>
            </>
          )}
        </li>
        <li>
          <b>Proptypes</b>: Validate the types of the props a component consumes
          to avoid any bugs. use isRequired if a prop is required and cannot be
          empty. <br />
          import PropTypes from 'prop-types'; <br />
          export default function Component({"{prop1, prop2}"}) {"{....}"}{" "}
          <br />
          Component.propTypes ={" "}
          {"{ prop1: PropTypes.string.isRequired, prop2: PropTypes.number}"}
          <br />
          use children key to check if any children is required (children:
          PropTypes.element.isRequired). Different checks - bool, func, node,
          PropTypes.any. String or number: prop1:
          PropTypes.oneOfType([PropTypes.number, PropTypes.string]) <br />
          If there is an enum which takes some values -- enumProp:
          PropTypes.oneof(['Loading', 'Ready']); If any other random string
          passed other than in the array error thrown <br />
          Checks on array: PropTypes.arrayOf(PropTypes.number); only array of
          numbers allowed. Nesting:
          PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number,
          PropTypes.string])); array of strings or numbers. <br />
          PropTypes.shape({"{ name: PropTypes.string, age: PropTypes.number }"}
          ); will check if the passed object is of this shape (key/value) and
          types. If an extra key is passed no error thrown. But if we want exact
          match of keys (no extra and no less) then PropTypes.exact(
          {"{ name: PropTypes.string, age: PropTypes.number }"})
        </li>
        <li>
          <b>Render props</b>: sharing code between components using a prop
          whose value is a function. This function, known as the "render prop,"
          allows for dynamic rendering and gives you control over what to render
          inside a component. <br />
          1. Function as a Child Component: The most common implementation of
          render props involves passing a function as a child to a component.
          This function receives props and returns React elements. <br />
          2. Code Reuse: Render props enable you to encapsulate reusable logic
          in a component, and then use it in various ways without having to
          repeat the logic in each place. Example:
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import React, { useState, useEffect } from 'react';

              // A simple component that uses render props to pass mouse position
              const Mouse = ({ render }) => {
                const [position, setPosition] = useState({ x: 0, y: 0 });
              
                const handleMouseMove = (event) => {
                  setPosition({ x: event.clientX, y: event.clientY });
                };
              
                useEffect(() => {
                  window.addEventListener('mousemove', handleMouseMove);
                  return () => {
                    window.removeEventListener('mousemove', handleMouseMove);
                  };
                }, []);
              
                return render(position);
              };
              
              // Using the Mouse component with a function as the render prop
              const App = () => {
                return (
                  <div>
                    <h1>Move the mouse around!</h1>
                    <Mouse render={({ x, y }) => (
                      <p>The current mouse position is ({x}, {y})</p>
                    )} />
                  </div>
                );
              };
              
              export default App;
              
            `}
          </SyntaxHighlighter>
        </li>
        <li>
          <b>React suspense</b>: lets you handle asynchronous operations like
          data fetching or code splitting more gracefully. It allows components
          to "wait" for something before they are rendered. While it's a
          powerful feature, it's still under active development for some use
          cases, particularly for data fetching. <br />
          Key Concepts of React Suspense: <br />
          1. Suspense Component: It acts as a boundary that "suspends" rendering
          of components until the asynchronous operations inside it are
          resolved. <br />
          Fallback UI: While waiting for the asynchronous operation to complete,
          Suspense shows a fallback UI, such as a loading spinner or a
          placeholder. <br />
          Concurrent Mode: Suspense works best with Concurrent Mode, allowing
          React to interrupt and resume rendering as necessary. <br />
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import React, { Suspense, lazy } from 'react';

              // Dynamically import a component
              const OtherComponent = lazy(() => import('./OtherComponent'));

              function App() {
                return (
                  <div>
                    <h1>My App</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                      <OtherComponent />
                    </Suspense>
                  </div>
                );
              }

              export default App;
            `}
          </SyntaxHighlighter>
          When to Use Suspense 1. Code Splitting: Efficiently load parts of your
          app only when needed. 2. Data Fetching: (When stable) Simplify
          handling of asynchronous data fetching. 3. Concurrent UI: Improve user
          experience by managing loading states more gracefully. <br />
          Limitations: 1. Experimental: Some features, especially around data
          fetching, are still experimental. 2. Error Handling: Error boundaries
          are needed to handle errors in Suspense components. 3. Library
          Support: Full benefits often require libraries that are designed to
          work with Suspense.
        </li>
        <li>
          <b> React.Memo</b>: memo lets you skip re-rendering a component when
          its props are unchanged. React.memo is a higher-order component in
          React that optimizes the rendering performance of function components
          by memoizing their output. Essentially, it prevents a component from
          re-rendering if its props have not changed. This can be particularly
          useful for performance optimization in large React applications where
          unnecessary re-renders can affect performance. <br />
          Key Concepts: <br />
          1. Memoization: React.memo caches the rendered output of a component
          and skips rendering when the props remain the same. <br />
          2. Pure Component for Function Components: It is similar to
          React.PureComponent but for function components.
          <br />
          To use React.memo, wrap your function component with it when exporting
          the component:
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import React from 'react';

              const MyComponent = (props) => {
                console.log('Rendering MyComponent');
                return <div>{props.name}</div>;
              };
              
              export default React.memo(MyComponent);              
            `}
          </SyntaxHighlighter>
          Explanation Component: 1. Memoization: React.memo caches the
          component’s rendered output based on its props. If the props do not
          change, React skips rendering the component and uses the cached
          output. 2. Shallow Comparison: By default, React.memo performs a
          shallow comparison of the component’s props to determine if the
          component should re-render. <br />
          Caveats: 1. Frequent Prop Changes: If the props change frequently, the
          overhead of the memoization may outweigh the benefits. 2. Complex
          Comparison: Shallow comparison works for simple props. For deeply
          nested objects, consider using a custom comparison function. 3.
          Development vs. Production: Ensure performance gains in a production
          environment. In development, additional checks might not reflect the
          true performance benefits. <br />
          When to Use React.memo: 1. Pure Functional Components: Components that
          render the same output given the same props. 2. Performance
          Optimization: To prevent unnecessary re-renders and improve
          performance. 3. Static Content: For components that primarily display
          static content or rely on props that change infrequently.
          <br />
          Also see how to pass custom comparision function for props. <br />
          <b>Pure Functional components: </b> functions/components that render
          the same output when given the same props, same props but different
          outputs not possible.
        </li>
        <li>
          <div style={{ display: "flex", gap: "5px" }}>
            Performance issues, freezing etc. : <br />
            <div onClick={() => setShowPerf((val) => !val)}>
              {showPerf ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
          </div>
          {showPerf && (
            <ul>
              <li>
                Identify the Symptoms: First, gather information about the
                symptoms. Is the entire UI freezing, or just certain components?
                Is it slow to load initially, or does it become slow after
                interacting with the application? Are there any error messages
                or warnings in the browser console?
              </li>
              <li>
                Check for Network Issues: Slow loading times can often be
                attributed to network issues. Use browser developer tools to
                check network requests. Look for long response times, large file
                sizes, or excessive numbers of requests. Address issues such as
                slow server response times, large asset sizes, or unnecessary
                network requests.
              </li>
              <li>
                Monitor Performance: Use browser developer tools to monitor the
                performance of your application. Look for CPU and memory usage,
                JavaScript execution time, layout and rendering times, and
                network activity. Identify any spikes or patterns that correlate
                with the UI freezing or slow loading.
              </li>
              <li>
                Profile JavaScript Execution: Use browser developer tools to
                profile JavaScript execution. Identify any functions or
                operations that are consuming excessive CPU time. Look for
                inefficient algorithms, nested loops, or unnecessary
                computations. Optimize performance-critical code paths to reduce
                execution time.
              </li>
              <li>
                Analyze Rendering Performance: Use browser developer tools to
                analyze rendering performance. Look for layout thrashing,
                excessive re-renders, or large numbers of DOM elements. Use
                techniques such as virtualization, memoization, or
                shouldComponentUpdate to optimize rendering performance.
              </li>
              <li>
                Inspect Component Hierarchy: Examine the component hierarchy and
                rendering logic of your application. Identify any components
                that are rendering unnecessarily or frequently. Optimize
                component rendering by implementing PureComponent or using
                shouldComponentUpdate to prevent unnecessary re-renders.
              </li>
              <li>
                Check for Memory Leaks: Monitor memory usage in the browser
                developer tools. Look for memory leaks or excessive memory
                consumption over time. Identify any objects or resources that
                are not being properly released or cleaned up. Fix memory leaks
                by properly managing resources, removing event listeners, or
                using tools like WeakMap to prevent memory retention.
              </li>
              <li>
                Test in Different Environments: Test your application in
                different environments and browsers. Performance issues may be
                specific to certain browsers or devices. Identify and address
                any compatibility issues or performance discrepancies across
                different environments.
              </li>
              <li>
                Use Performance Monitoring Tools: Consider using performance
                monitoring tools or libraries to track and analyze performance
                metrics over time. Tools like Google Lighthouse, WebPageTest, or
                New Relic can provide insights into performance trends and help
                identify areas for improvement.
              </li>
              <li>
                Implement Profiling and Logging: Instrument your application
                with profiling and logging mechanisms to capture performance
                data and debug information in production environments. Use tools
                like React DevTools, Redux DevTools, or custom logging libraries
                to track performance metrics and diagnose issues in real-time.
              </li>
            </ul>
          )}
        </li>
        <li>
          Critical Rendering Path (CRP) : A sequence of few steps/rules that
          tells how the browser renders our code. <br />
          1. DOM Tree: browser will first load the main html file and make the
          dom tree. (Check all types of this files in the network tab: all
          types)
          <br />
          2. Load css: then the css is loaded and the css tree is built. CSS is
          render blocking meaning only after all css files are loaded/imported
          in browser then only rendering will start otherwise rendering is
          blocked, if there are multiple css files only when all files are
          loaded rendering begins. CSS tree (CSSOM - CSS object model) will only
          have all those nodes/elements that have some styles applied to it.{" "}
          <br />
          script tag: this is parser blocking meaning rendering will continue to
          happen on browser when multiple script tags encountered and being
          loaded one by one. Paser blocking means unless one file is not loaded
          it wont go on the next line. But modern browsers parallely loads all
          the files and not sequentially. <br />
          3. Render tree: This tree will have all the nodes that have to be
          rendered or shown on the browser. Basically merging dom tree and css
          tree is the render tree.
          <br />
          4. Layout: Taking the render tree and display it on the browser by
          computing /calculating different things. like if there some font size
          then calculate some width/position/ space taken to display on the
          browser. On resizing the browser window, layout phase is triggered
          again to recompute new values for displaying in the new resized
          window. Paint phase is also triggered again and this is called
          <b>reflow</b>.<br />
          5. Paint: Take the layout and the render tree to render the content.
          Basically paint (show) the render tree on the browser.
        </li>
      </ul>
    </>
  );
}
