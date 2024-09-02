import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Ep8and9 = () => {
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
        <li></li>
      </ul>
    </div>
  );
};

export default Ep8and9;
