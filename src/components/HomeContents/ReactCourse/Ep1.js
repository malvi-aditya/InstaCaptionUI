import React from "react";

export default function Ep1() {
  return (
    <div>
      <h6>Episode 1:</h6>
      <ul>
        <li>
          Vscode: type html:5 and hit enter to get the basic html code skeleton
          in an html file.{" "}
        </li>
        <li>
          const heading = document.createElement("h1"); heading.innerHTML =
          'Some text': create an html h1 element and add text. appendChild():
          add a child/html element to a div, const root =
          document.getElementById('root'); root.appendChild(heading);
        </li>
        <li>
          Browser do not understand react,we have to configure our project to
          use it, it understands js due to js engine, browser apis etc.{" "}
          <b>CDN and crossorigin</b>: research and understand. One way of using
          react in index.html: get the cdn link and add{" "}
          {`<script crossorigin src='...cdn link'></script>`}. <br />
          Check the React object that is imported. Two files imported: react
          (having core react written, check the file contents in the link) and
          react-dom (containing dom operations, logic needed to modify the DOM).
          react-dom file is like bridge for react to connect to DOM, browsers as
          react can run anywhere mobiles (react native), react 3D etc.
        </li>
        <li>
          Creating element in react, in index.html in script: <br />
          {`<script> const heading = React.createElement("h1", {id: 'heading'}, "Some text");
              const root = ReactDOM.createRoot(document.getElementById("root"));
              root.render(heading);          
              </script>`}
          <br />
          React needs to have a root to do all the dom manipulation, like the
          above. createElement comes from core react, createRoot comes from
          React-dom. we get the div with id root in index.html and create root
          and render. createElement first param is tag, second attributes and
          third the content, the returned value (heading) is an object and not
          node/html element. what render() does is takes this object and creates
          an html element/node to insert it in div with id root.
          <br />
          Most expensive operation in browser is modifying the DOM, react was
          built with the philosophy that using js to modify dom, in interactive
          websites (clicking button something pops up etc.) dom modifying is
          expensive. react was built to optimize this using js.
          <br />
          Move all the js code inside script inside another js file and inject
          the script.
        </li>
        <li>
          Nesting: add multiple createElement inside each other. <br />
          {`const parent = React.createElement("div", {id: 'parent'}, React.createElement("div", {id: 'child'}, React.createElement("h1", {}, 'Text content')) `}{" "}
          <br />
          Pass an array as the third argument to have multiple children.
          <br />
          {`const parent = React.createElement("div", {id: 'parent'}, [React.createElement("div", {id: 'child1'}), React.createElement("div", {id: 'child2'}, 'Text content')]) `}
        </li>
        <li>
          JSX: The above createElement way of nesting is not scalable to make
          large applications, too ugly code etc. This is where JSX comes in.
          Core of react is the create element way, JSX makes our tasks simpler.
        </li>
        <li>
          The order in which files are imported using cdn links in script tag
          should be correct, the react files should be imported first then only
          index.js or our reactjs logic script should be injected. <br />
          If we already have some element in div (id root) in the index.html, it
          will render initially but will be quickly replaced by the object
          passed in root.render(). Anything in the div id root will be replaced,
          elements above and below this div will be rendered as it is.
        </li>
        <li>
          Library vs Framework: React is a library because react can also work
          in a certain portion of a page like only the header etc. wherever the
          div with id root is, it can work independently in a small portion of
          our app. Other Frameworks require us to create an whole app using it
          and comes with lot of packages.
        </li>
      </ul>
    </div>
  );
}
