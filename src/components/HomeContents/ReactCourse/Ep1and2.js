import React from "react";

export default function Ep1and2() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <h6>Episode 1:</h6>
        <ul>
          <li>
            Vscode: type html:5 and hit enter to get the basic html code
            skeleton in an html file. For react component skeleton, type rafce.
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
            <b>CDN and crossorigin</b>: research and understand. One way of
            using react in index.html: get the cdn link and add{" "}
            {`<script crossorigin src='...cdn link'></script>`}. <br />
            Check the React object that is imported. Two files imported: react
            (having core react written, check the file contents in the link) and
            react-dom (containing dom operations, logic needed to modify the
            DOM). react-dom file is like bridge for react to connect to DOM,
            browsers as react can run anywhere mobiles (react native), react 3D
            etc.
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
            node/html element. what render() does is takes this object and
            creates an html element/node to insert it in div with id root.
            <br />
            Most expensive operation in browser is modifying the DOM, react was
            built with the philosophy that using js to modify dom, in
            interactive websites (clicking button something pops up etc.) dom
            modifying is expensive. react was built to optimize this using js.
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
            Core of react is the create element way, JSX makes our tasks
            simpler.
          </li>
          <li>
            The order in which files are imported using cdn links in script tag
            should be correct, the react files should be imported first then
            only index.js or our reactjs logic script should be injected. <br />
            If we already have some element in div (id root) in the index.html,
            it will render initially but will be quickly replaced by the object
            passed in root.render(). Anything in the div id root will be
            replaced, elements above and below this div will be rendered as it
            is.
          </li>
          <li>
            Library vs Framework: React is a library because react can also work
            in a certain portion of a page like only the header etc. wherever
            the div with id root is, it can work independently in a small
            portion of our app. Other Frameworks require us to create an whole
            app using it and comes with lot of packages.
          </li>
        </ul>
      </div>
      <div>
        <h6>Episode 2:</h6>
        <ul>
          <li>
            Basic repo with css, html and js files cannot be pushed to prod. Our
            project can have thousands of files, we need to do some things like
            minify, bundle, code splitting, chunking, image optimization,
            compress, remove comments etc.
          </li>
          <li>
            Create-react-app: most courses start using this, this is already an
            ignited app, not done from scratch. we need to know what is inside
            it, what it does, behind the scenes etc. it gives a skeleton which
            is ready to go for production. we can build our own
            create-react-app. we used react in our project but it itself cannot
            produce a fast, production ready app. Many packages, libraries etc.
            combined with react make our app faster, not just react.
          </li>
          <li>
            NPM: It does not stand for node package manager, it is everything
            but not node package manager, lol. It does manage packages though
            behind the scenes. Biggest package manager, big repo with all
            packages, utilities, libraries etc. using create-react-app, npm is
            already installed and setup. <br />
            use command <b>'npm init'</b> to initialize npm in directory. This
            will create the package.json file in the directory (configuration
            file for npm). It is needed for managing packages/dependencies
            versions etc.
            <br />
            The most important dependency we need is the <b>Bundler</b> to
            minify etc. our files, webpack, parcel are some of the bundlers that
            bundle all the files and build our app. <br />
            use command 'npm install' or 'npm i' to install any packages. To
            have any dependency as a development/dev add the flag -D 'npm i -D
            parcel'. Dev dependency: Package required during the development
            phase of the app. Normal dependency: package needed during all times
            dev/prod. Look all the version management chars: ~ tilde, ^ caret
            etc.
            <br />
            <b>package-lock.json</b>: It keeps track of the exact version being
            installed and locks it. Any dependency will have a key 'integrity'
            in it which is a hash so that we have exact versions everywhere dev
            machine, prod. We have the dependency tree in it. <br />
            <b>Node Modules:</b> It has the actual and all the code that is
            fetched from npm. Any dependency can have its own sub dependency and
            so on, these are known as transitive dependencies, every sub
            dependency is also installed and present in the node_modules.
            Checking in node_modules, any dependency will also have its own
            package.json. This can also be seen as a dependency tree. <br />
            We never push node_modules anywhere, we ignore it. Only package and
            package-lock pushed, using these both we can generate node_modules
            'npm i'/ 'npm ci'.
          </li>
          <li>
            npx parcel index.html: we execute parcel and pass the main/root
            file. This will created the build and host on localhost. <br />
            <b>npx</b>: Use this command to execute a package. <br />
          </li>
          <li>
            The previous of adding react in our app was using the cdn links in
            script in index.html. This is not a good way, correct way is using
            npm itself. Using cdn links is costly operation, api call to the
            link to get the package etc. If we can we have it already in
            node_modules, also version control is not smooth as urls update.
            <br />
            'npm install react' and 'npm install react-dom' to add react as a
            dependency. Now we have to import React in each of our files. <br />
            Note: If we inject a js file/script in index.html using script tag
            and the js file has imports in it (import React...) then it will
            throw error. This is because it is a normal js file and js does not
            understand 'import'. Add the attribute ' type: 'module' ' in script
            tag to treat it as a module and not plain js file.
          </li>
          <li>
            HMR (Hot Module replacement): On saving file, parcel automatically
            reloads the hosted page with the new changes, this is done by HMR. A
            file watching algo written in cpp tracks of the files to do this.
            Parcel also caches things to speed up the build process. Image
            optimization, minification of prod build, compress, consistent
            hashing, code splitting, differential bundling, error handling,
            diagnostic ,Tree Shaking is also done by parcel.
            <br />
            differential bundling: app can run on different places like browsers
            etc. by this the app will run smoothly everywhere (old browsers
            etc.).
            <br />
            Tree Shaking: Remove unused/ dead code for optimizing. <br />
            Different dev and prod builds: More optimizations are done to
            produce the prod build.
          </li>
          <li>
            browserslist in package.json: takes an array specifying the browsers
            where we want to support our app. this assures the app will
            definitely work in the specified values, it might or might not work
            in things that are not specified in the array. search browserslist
            to play with values.
          </li>
        </ul>
      </div>
    </div>
  );
}
