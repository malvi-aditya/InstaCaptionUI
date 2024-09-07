import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Ep8and9and10 = () => {
  return (
    <div>
      <h6>Episode 8:</h6>
      <ul>
        <li>
          Class based components: Older way of creating components, react was
          built for using class components, functional way is the new and
          preffered way. Just like functional component is a normal js function,
          class based component is a normal js class. <br />
          Creating a class component, use extens React.component to specify that
          is a class component: class ComponentName extends React.component{" "}
          {`{ ... }`}. <br />
          It uses a method render() which returns some jsx just like functional
          component. class FirstName extends React.component{" "}
          {`{ render() { return ( <>...</> ) } }`} <br />
          To receive props, create a constructor method and use keyword
          super(props) to get the props. use this.props.'propName' to then use
          the prop. Just like any class in any language, creating an instance of
          the class triggers the constructor and we get the props.
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import React from 'react';

              class FirstName extends React.component {

                constructor(props) {
                  super(props);
                }

                render() { 
                  return ( 
                    <>{this.props.name}</> 
                  ) 
                }
              }
          `}
          </SyntaxHighlighter>
          use of super(): In React class components, the super keyword is used
          in the constructor method to call the constructor of the parent class,
          which is React.Component. This is necessary because your class
          component extends React.Component, and the parent class's constructor
          needs to be initialized before you can use this in your component.{" "}
          <br />
          Why super(props) is Needed: Inheritance: When you create a class
          component in React, you extend the base class React.Component. In
          JavaScript, when a subclass (your component) extends a superclass
          (like React.Component), the subclass’s constructor needs to call
          super() before using this. super() is a reference to the constructor
          of the parent class (React.Component in this case). It ensures that
          the parent class is properly initialized before any operations are
          done in the child class's constructor.
          <br />
          Accessing this.props: If you need to access this.props in your
          component's constructor, you must pass props to super(). This is
          because the React.Component constructor initializes the this.props in
          the base class. Without calling super(props), this.props would be
          undefined within your constructor.
          <br />
          What Happens If You Don’t Use super(props)? If you omit super() in the
          constructor of a class component, you'll get a JavaScript error that
          says something like: Must call super constructor in derived class
          before accessing 'this' or returning from derived constructor. If you
          call super() but without passing props, you won't have access to
          this.props within the constructor, which could lead to bugs if you try
          to use it.
          <br />
          Summary: super(): Initializes the parent class’s constructor.
          super(props): Passes the props to the parent constructor, allowing you
          to access this.props inside the constructor of your component.
        </li>
        <li>
          In functional component we use useState hook to create state. In class
          component, similar to props, in the constructor we initialize the
          state. constructor is the best place to do anything as it is called
          everytime we create an instance of the class. We use this.state =
          {`{ ... }`} inside the constructor and initialize it with an object
          with keys being state name and value beign their initial value, the
          object contains all the states. Use the state similar to props,
          this.state.name . <br />
          Updating states: like setState in hooks, similarly we have
          this.setState in class components. pass the updated state object to
          this. this.setState({`{ name: this.state.name + 'a' }`}). (append a to
          name). batcj all updates in the single object. All the states (object
          keys) passed in the setState object are updated, rest of the states
          are untouched.
        </li>
        <li>
          Lifecycle of component: Our component 'mounts' on the webpage (or
          loading). The parent components jsx is loaded line by line and as we
          encounter any child component then that starts to load the child
          component. Instance of the component (class) is created, constructor
          is called then render() is called. Lets say there are to nested class
          components, a class component having another class component inside
          it. The parents constructor is called first then th render of the
          parent is called, then it goes inside of the child component which is
          a class and similarly constructor and render of the child will be
          called.
        </li>
        <li>
          componentDidMount: Once the component is mounted then this method is
          called, which happens after the render. constructor -> render ->
          componentDidMount. like previous let say we have did mount method in
          both parent and child. parent constructor -> parent render -> child
          constructor -> child render -> child did mount -> parent did mount. we
          can understand this as child is completely rendered/mounted etc. then
          only we can say parent mounts and so did mount called. life cycle
          methods of child are triggered then parents methods are completed.
          while child is rendering/its methods, parents render is still running
          so its did mount is not invoked. <br />
          Same as useEffect, used to make an api call then re render. <br />
          If there are multiple children class components then every childrens
          constructor and render methods called and then every childs did mount
          called and the finally parents did mount called. This is again done
          for the same reason how useeffect and did mount work, render first
          then call useffect or mount method for optimization. Parent
          constructor & render -> child 1 constructor & render -> child 2
          constructor & render ->..n children.. -> child 1 did mount -> child 2
          did mount -> ..n children.. -> parent did mount <br />
          This can be explained using the react component lifecycle diagram,
          batching of the render phase of multiple children as render phase is
          fast. Commit phase actually has dom manipulation so takes slightly
          longer.(check{" "}
          <a
            href="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/"
            target="_blank"
            rel="noreferrer"
          >
            https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
          </a>
          ) <br />
          Api call inside did mount: simply make componentDidMount async and
          await fetch. async componentDidMount(){" "}
          {`{ const data = await fetch('...') }`}. <br />
          Lifecycle: constructor is called and we initialize states props etc.
          Then react renders the components and updates the dom with initial
          values given to states. Now componentDidMount is called, api call etc
          is made and when we then setS states with received data. This is the
          Mounting cycle, it finishes when component first renders, we render
          quickly and show something while data is fetched. Now as we set
          states, the updating cycle starts. the render function is triggered
          again with new updated values (constructor only called once) then dom
          is updated. Also after this updation of dom, componentDidUpdate is
          also called.
        </li>
        <li>
          componentWillUnmount: after mounting and updating cycles, the last is
          unmounting. It is called just before unmounting. Unmounting means when
          the component will disapper/removed from the dom.
        </li>
        <li>
          Do not compare react component life cycle with method with functional
          component. We say useEffect and componentDidMount are equivalent but
          it not correct to say this as it is not. useEffect does not use
          component did mount behind the scenes. useeffect without any
          dependency is called on every render. did mount is called on first
          render/mount and then there is only updation cycle. if we want to
          trigger useffect only once, then pass emoty dependency array. So
          basically all these lifecycle methods were removed to simplify things.
          componentDidUpdate is same as passing some dependency to useEffect. we
          got prevProps, prevState in componentDidUpdate():
          componentDidUpdate(prevProps, prevState) ...do something like checking
          prevstate with current state. that is why dependency is an array as we
          needed to check many things (if (state1 !== prevstate) etc...) <br />
          componentWillUnmount: Our app is a spa (single page application), but
          when we switch routes/components (component replacement), we have to
          clear some things like timeouts, intervals. these are still registered
          and continue to run behind the scenes so have to be cleared when we
          switch routes. Also multiple timeouts, intervals etc can get
          registered when component mounts again. This can be seen as a drawback
          of SPAs, component switching happens and multiple times did mount
          called can lead to this situation.
        </li>
      </ul>
      <h6>Episode 9:</h6>
      <ul>
        <li>
          Each of our components/ function should have a single responsibility.
          Components should work together where each comonent is doing only one
          and only task. Modular code, break down code into reusable,
          maintainable, testable components. Helps in testing of components too,
          we can write test cases for each and every component.
        </li>
        <li>
          Custom hooks: A hook is just an utility function, a piece of js code.
          Name of custom hooks usually starts with 'use' (recommended
          convention). While writing a custom hook, try seeing like this: what
          is the job of the hook, what params it will take and what it has to
          return.
        </li>
        <li>
          Chunking, code splitting, dynamic bundling, lazy loading, on demand
          loading, dynamic import : (all same) Bundling is when we bundle and
          create one single js file. We have to chunk our app or split our code
          into several pieces/chunks or files. Make logical bundles so one
          bundle has enough code for a major feature. Ex: lets say make my trip,
          we can make several bundles, one for flight components, one for bus,
          one for hotels etc. and load them as needed. If there is a single
          bundle for all this then it can be slightly big in size and take time
          to load. (swiggy food, instamart sections another ex where we might
          need this). <br />
          Instead of directly importing any component (import Component from
          '...'), we can lazily load it. Initially our app wont have all code,
          let say code to some route. We can load it later when needed, using
          lazy() another funcgiven by react. Lazy takes a callback func, and
          returns an import function that takes the path of the component to be
          lazily loaded (note: this import is different than our main react
          import keyword at top of a file). the single llazy line can do a lot
          of things. New call to fetch the js file with the lazily loaded
          component is made. ex:
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import React, { lazy } from 'react';

              const Compo = lazy( () => import('..path') );

              function App() {
              }
          `}
          </SyntaxHighlighter>
          Lazily loaded components have to be fetched asynchronously, if we just
          add above line and try to render code it will not work. It takes
          slight time to fetch a js file, and react tries to render something
          whose code is still being fetched. One way to fix is this by using
          Suspense component. wrap our lazily loaded component by suspense. give
          a placeholder to suspense which is a component which renders while our
          file is being fetched. These optimizations can make large scale apps
          very fast. <br />
          {`<Suspense fallback={<LoadingUI />}>
            <Component />
          </Suspense>`}
        </li>
      </ul>
      <h6>Episode 10: CSS </h6>
      <ul>
        <li>
          Ways of adding css: <br />
          1. in the index.css file. <br />
          2. SASS, SCSS: Writing css with more powers(utilities,
          functionalities) writing css becomes more advance and easy (but not a
          recommended use for large scale apps) <br />
          3. styled-components. (one of the common) <br />
          4. libraries like MUI, Bootstrap etc. <br />
        </li>
        <li>
          Tailwind CSS: <br />
          It works with all the frameworks available, not just react meaning
          with html, angular etc. It is used along with another library called
          postcss, which transforms css using js. tailwind used postcss beghind
          the scenes.
          <br />
          Follow the steps on their website to install, initialize, configure
          tailwind and postcss in app. Our npm (webpack, parcel) uses postcssrc
          file to read tailwind. tailwind config file has some keys like content
          which is an array of file extensions where we are going to use
          tailwind. Then add few lines (directives) in the index.css file, sort
          of importing tailwind in our index.css, we then never have to touch
          index.css.
          <br />
          Tailwind basically gives classnames for every style we will ever need.
          just write what we are thinking when creating css. for ex if we nned
          to give a div display flex: {`<div className="flex"></div>`}, yep this
          is it, it will add display as flex to the div (behind the scenes it is
          converted to our original css object, check dev tools).
          className="w-56" changes the width ('w-somenumber'). similarly there
          are a lot classnames to give styles, justify-content: space-between
          becomes className="justify-between". multiple classnames can be added
          space separated. className="w-24 flex". <br />
          Initially it can be hectic to check classname for each and every style
          we want to apply but using it frequently we will get hang of it.
          VScode extension: Tailwind css intellisense for help, gives
          suggestions, on hover actual style applied can be seen. px and py:
          apply padding on x and y axis, (px -> padding-right & padding-left).
          If we dont have a class for lets say a hard coded value like width:
          200px, we can do this: className="w-[200px]" <br />
          Pros: Fast to apply css, it is lightweight as during bundling of css
          only css classes used will be imported despite there being 1000s of
          classes, also even if e use m-4 (margin) 100 times only 1 time it will
          import, redundant css is not present. Cons: If a lot of styles are to
          be applied to divs then the code can get messy and less readable with
          long lines of classNames.
          <br />A div is divided in 12 sections in tailwind, so lets say if we
          have two childs in a div then they can be given width: 'w-9/12' and
          'w-3/12'. First div will occupy 9 units out of 12 and second 3 units.
        </li>
      </ul>
    </div>
  );
};

export default Ep8and9and10;
