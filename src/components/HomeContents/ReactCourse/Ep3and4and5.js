import React from "react";

export default function Ep3and4and5() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h6>Episode 3:</h6>
      <ul>
        <li>
          Creating npm scripts: In the scripts key in package.json we can add
          scripts that we want to run, add a key value pair with the key being
          the name of script and value being the command. Ex start script:
          "start": "parcel index.html", this will 'npx parcel index.html'.
          generally checking package.json in an existing project will help in
          understanding how to build, commands etc. Now 'npm run `script_name`'
          will execute the script, 'npm `script_name`' also same (we usually do
          npm run start as a script named start is defined).
          <br />
        </li>
        <li>
          React element (created by React.createElement) is a object with some
          properties and not same as html element/node, when we render this
          element on the DOM then it becomes an html element. This way of
          creating is not developer friendly, easy, clumsy etc. <b>JSX</b> was
          introduced to solve this issue, easier js syntax to write html with
          js. JSX and react are very different/separate, we can write react
          without jsx but it becomes very difficult to build large apps. old way
          was to create 3 files: html, css, js and buld app. JSX merges all
          these 2 into one. Below is creating react element using core react,
          react.createElement => react element (JS Object) => HTML element
          (render)
          <br />
          const heading = React.createElement("h1", {`{}`}, "Text")
        </li>
        <li>
          Writing JSX: <br />
          const jsxHeading = {`<h1> Heading</h1>`}
          <br />
          <b>Important:</b> The above is not html in js, JSX is not html in js.
          It is not html, it is jsx, both have a big difference. JSX is html (or
          XML) like syntax. jsxHeading is a react element (will be an object).
          The above is creating a react element using jsx. The above is not pure
          js, it is valid though beacuse of jsx, js does not comes with jsx
          built inside. Js engine will not be able to understand this snippet of
          jsx so it is not completely valid js, browser console will throw error
          on jsx snippets. JSX code/our react apps are transpiled (converted)
          then given to js engine as now it is understandable by it.
          <br />
          <b>Imp:</b> Its JSX that makes our code readable by introducing this
          syntax and not React.
        </li>
        <li>
          Babel: Parcel/ webpack are just package managers, the{" "}
          <b>transpilation</b> of JSX is done by <b>Babel</b>. It converts jsx
          into code the react/js can understand. The JSX we have is converted to
          React.createElement and further flow is same, behind the scenes JSX is
          converted to core react createElement only. (Try logging jsx code the
          above line, it is the same object we get from createElement).
          <br />
          Babel not only converts JSX into react, old browsers dont understand
          ES6 code so babel transpile the ES6 code into older codes which the
          browser can understand. Babel is just a js library doing just this
          converting job. JSX is not html as in html we give class="class name"
          but in jsx we have className="class name", also everything is camel
          case unlike html where we put hyphen -. Also if jsx is spread across
          multiple lines then we need to wrap it with (), Inline/single line jsx
          () are not mandatory.
        </li>
        <li>
          <b>React Component:</b> Everything is a component in react, buttons,
          header, footer, card etc. There are two types of components: class and
          functional. class based is the old way, functional is the latest and
          new way. <br />
          Functional component: Its just a js function (name should begin with
          capital) which returns a piece of JSX/ react element. ex: const Button
          = () => {`{return <>...</>}`}. <br />
          We render functional components by simply this syntax: {`<Button />`}{" "}
          or {`<Button></Button>`}. Browser does not care what components are
          created, how they are nested etc. in the end everything is transpiled
          into react element and then the html elements (DOM tree) which browser
          understands. Nesting of components is called{" "}
          <b>component composition</b>. we can write any js expression,
          variables inside jsx using {`{ ..here }`}, meaning we can also render
          any functional components in it ex: {`<> {Button()}</>`} given: const
          Button = () => {`{ }`}
        </li>
        <li>
          Lets say we fetch some data from api and the received data is executed
          in some jsx. Then some malicious data/code is prone to run on our
          browser, this is known as <b>cross site scripting</b>. As it can run
          on browser it can access localStorage, cookies etc.
          <br />
          const data = fetch(); --data is malicious <br />
          {`<> {data} ...render`} --somewhere data used where js executes.{" "}
          <br />
          But jsx handles this, whatever expression, data, variables etc is
          passed in jsx {`{ }`}, jsx cleans/sanitises or makes sure nothing
          malicious is executed. It prevents cross site scripting.
        </li>
      </ul>
      <h6>Episode 4:</h6>
      <ul>
        <li>
          While we building ui/react app we should know what we are building
          that is the design/wireframe and then the process of building it. For
          building a food ordering app, build a design (check the video) and
          then start building code for it. <br />
          With the design (food order) we can now build a low level design of
          the app, basic components structure/ skeleton like header, footer,
          body, components in body. Header will have App logo, Some routes -
          home, about etc. Body: search bar, filters, data display cards.
          Footer: Contact info, Linkouts etc. Top level component can be App
          that contains our whole app. <br />
          Now as we are going to show a lot of cards showing restaurant details,
          we build a general card component and render it multiple times with
          different restaurant info using <b>props</b> and display in the grid
          format, making our code modular and reusable. Components are just
          functions and we make functions to reuse certain piece of code,
          Passing props to a component is just passing arguments to a functions.
        </li>
        <li>
          <b>Config Driven UI</b>: Controlling the UI using a config/data that
          we get from backend. We get some data from backend and the UI is then
          driven using that. Like if we get some restaurant names in our food
          ordering app from backend, we will iterate on the list and render
          accordingly. According to different factors we can receive different
          data from backend and UI will display data with that data. Like if we
          change our location we will get different restaurants etc. to display
          in our UI. We dont have different UIs for different locations, lol
          obviously. So we say that our UI is driven by data/config backend
          data. <br />
          We should be able to design API response json and understand what we
          need to drive our UI, What all data we need to drive and build UI.
          Config driven uis are dynamic and are more preffered. <br />
          All images used in our app will be in a cdn and we fetch it from there
          using the link. <br />
          <b>Imp:</b> While using array.map() and rendering components, we
          should pass a key so that every rendered child/card/component has a
          unique key. This is because react optimizes its render cycle. Lets say
          a new value is added in the list at the first position, a new
          restaurant. If we dont have a unique key, react will re render all the
          list items/cards as react does not know which item is new. But when we
          pass a key, react knows which is the new id so other cards wont re
          render and only the new card is rendered. Never use/not recommended
          index (2nd param of map) as key, as the order of items might change
          hence ids can change.
        </li>
      </ul>
      <h6>Episode 5:</h6>
      <ul>
        <li>
          Everything that we do in react can be done by plain html, css, js. But
          we use libraries like these to make our life easy, build large apps
          with lesser effort, optimizations, strong functionalites like hooks.
        </li>
        <li>
          First practice: Have multiple file, a folder structure to maintain/
          build our app. all source code is in src folder mainly. Making a
          separate file for every component. Generally we have a components
          folder in src to house all the components. It is up to use, we can
          define other structure like keeping files feature wise, components
          related to one feature is one folder. Keep them anyhow, in the end
          they are all going to be merged while bilding, file structures are
          just for us, dont overthink lol.
          <br />
          Generally the file name is same as the component name with a capital
          name. Export the component then import it where it needs to be used.
          Keep all the hard coded/constants data, variables, urls etc. in a
          separate constants file and not in our among the normal components,
          generally we create a utils folder (data used all across the app)
          having this constants file (file name small as it is not component).
          And the constant name is also in captial case/snake ex: const URL =
          '....'.
        </li>
        <li>
          Default and named exports: default export is the normal export and the
          default export of a file. When multiple things exported from a file
          then use named exports, without the keyword default and directly write
          export in front of the const. One file can have only one default
          export. Named exports are imported by their exact names and using
          destructuring of object.
        </li>
        <li>
          Hooks: Lets say on clicking a button etc we want to update something
          and display the new data. If we simply update a normal variable, let
          etc it will update the variable but still UI will not update. Here we
          introduce hooks to achieve this. Hooks are just normal js funcs. This
          is where useState, state variable. On updating this variable it
          triggers a re render and our UI is updated. It makes a local state of
          the component.
        </li>
        <li>
          Reconciliation Algo (React Fiber): <br />
          Lets say there is a container and it has list of children or many
          child elements, and our UI changes so that the child elements are
          filtered so they reduce in number. <br />
          Virtual DOM: It is not the actual Dom tree, react creates a virtual
          Dom tree. Virtual dom is a representation of an actual dom. It is made
          using the React elements, the objects which we saw earlier, basically
          the nesting of these objects that we get from createElement. Virtual
          dom is an old thing that existed long time before react, react
          developers built the algo using virtual dom to make it fast. <br />
          Diff Algo: It finds out the difference between two virtual doms, the
          previous one and the updated one. Once the difference calculated then
          actual updates to DOM done. Finding out diff b/w two html element tree
          is tough but diff b/w two objects (react elements) is fast. This
          efficient Dom manipulation makes react faster.
        </li>
      </ul>
    </div>
  );
}
