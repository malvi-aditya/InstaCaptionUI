import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Ep11and12 = () => {
  return (
    <>
      <h6>Episode 11:</h6>
      <ul>
        <li>
          Higher order components (HOC): <br />
          HOC is a function that takes a component and returns a component. It
          takes a component, enhances or add somethings or modifys and returns
          the component. Lets say we have a component and a hoc withAuth which
          has some authentication checks then returns some component based on
          the checks.
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import React from 'react';
              import { Redirect } from 'react-router-dom';

              function withAuth(Component) {
                  return function AuthenticatedComponent(props) {
                      const isAuthenticated = localStorage.getItem('authToken'); // Example check for authentication

                      if (!isAuthenticated) {
                          // If the user is not authenticated, redirect to the login page
                          return <Redirect to="/login" />;
                      }

                      // If authenticated, render the wrapped component with the passed props
                      return <Component {...props} />;
                  };
              }

              export default withAuth;
          `}
          </SyntaxHighlighter>
          The above hoc is used as:
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import React from 'react';
              import withAuth from './withAuth';
              
              function Dashboard() {
                  return (
                      <div>
                          <h1>Dashboard</h1>
                          <p>Welcome to your dashboard!</p>
                      </div>
                  );
              }
              
              export default withAuth(Dashboard);
          `}
          </SyntaxHighlighter>
          <b>Imp:</b> HOC is pure function, it will not change the behaviour of
          the passed component/ input component as param. It will just take the
          input component and enhance it.
        </li>
        <li>
          UI is quite static, we give some jsx and it displays as it is. Data
          layer is the most important. All react apps have 2 layers UI and Data,
          UI layer is powered by data layer. All states, props etc is our data
          layer, handling/Managing these (data layer) nicely can speed up our
          app. Keep the data layer strong so that UI layer is also strong.
        </li>
        <li>
          Accordion: When data to display in several cards, we collapse the data
          and use something like arrow on clicking expand and show/hide data.
        </li>
        <li>
          Controlled and Uncontrolled components: <br />A controlled component
          is one where the form data is handled by the React components state.
          The value of the input element is always driven by the component's
          state, and any change to the input updates the state via an event
          handler. The inputs value is controlled by the state. Any change to
          the input is managed by an event handler, which updates the state. The
          source of truth for the inputs value is the state. Ex: <br />
          const [value, setValue] = useState(''); <br />
          const handleChange = (event) => setValue(event.target.value) <br />
          An uncontrolled component is one where the form data is handled by the
          DOM itself, rather than the React component's state. You access the
          input's value using a ref instead of handling every change via state.
          The inputs value is not controlled by the state; instead, it is
          maintained by the DOM. You retrieve the inputs value when needed,
          usually via a ref. The source of truth is the actual DOM element, not
          the React state. <br />
          const inputRef = useRef(null); <br />
          const handleSubmit = () => alert(`Input Value:
          $inputRef.current.value`); <br />
          Controlled Components are ideal when: You need to control the forms
          data tightly, like in form validation, conditional rendering based on
          input values, or when submitting the form. You need to handle complex
          forms where the value needs to be accessed, validated, or modified
          frequently. <br />
          Uncontrolled Components are suitable when: Youre building simple forms
          where the input value isnt needed until form submission. You want to
          reduce the amount of boilerplate code and React re-renders. Youre
          migrating or integrating with non-React code that relies on
          traditional HTML forms.
        </li>
        <li>
          Use react dev tools to view component tree, profiling. recording
          actions using the profiler for performance optimization.
        </li>
        <li>
          Lets say we way multiple Accordions and on opening one accordion
          should collapse all others. If we have implemented this using state in
          an accordion component and mapping a list of data and endering
          accordions then this feature is not possible as each accordion
          maintains its own state and cannot affect others. <br />
          In this case we have to lift up the power of state above (to the
          parent, <b>Lifting the state up</b>). When the parent controls the
          child, the child becomes an uncontrolled component as it relies on its
          parent. If the child has its own state then it is controlled as parent
          cannot contros it. <br />A simple state in the parent can be
          maintained to store which accordion is open and on clicking on any
          other setter func can be passed from parent to child and then can be
          updated. ( our state will store index of open accordion and while
          mapping we can send open/false props according to the index )
        </li>
        <li>
          <b>Props Drilling</b>: In large scale apps, we have lots of components
          and passing props/data between these can become a big challenge. Data
          flows usually one way, top to bottom or parent to child. When there
          are lets say many levels of children and we want to pass data from
          root to a leaf then we have to pass that prop through every
          intermediate child/component. The intermediate components have no use
          of the prop, they just receive it and pass it forward. This is known
          as props drilling and generally not a good way.
        </li>
        <li>
          React Context: To solve the issue of props drilling, context was
          introduced. We keep some state/data etc. at the top level and then can
          use it anywhere in the app without passing props. We need some data at
          the global that needs to be accessible anywhere in the app like login
          status, theme etc. <br />
          Generally we create a seperate file having the context states. This
          file we will use createContext to create a context and export it. We
          can pass some default value in createContext, like createContext(
          {`{  theme: dark }`}). We can then use the value using useContext
          hook. ex: const data = useContext(themeContext). Complete ex:
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import { createContext } from 'react;

              const ThemeContext = createContext({ theme: 'dark' });
              export default ThemeContext
          `}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import { useContext } from 'react;
              import ThemeContext from './...'

              const data = useContext(ThemeContext);
          `}
          </SyntaxHighlighter>
          In class based components, we can use the Consumer to access the
          context data, we get in the callback function.
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import ThemeContext from './...'

              class A extends Component () {
                render() {
                  return (
                    <>
                    <ThemeContext.Consumer>
                      { (data) => <> </>}
                    </ThemeContext.Consumer>
                    </>
                  )
                }
              }
          `}
          </SyntaxHighlighter>
          Generally we create a Provider as we have to update these context data
          etc. the above example a static value was used. Then provide the value
          to the whole App as whole app is wrapped with the provider. The part
          of app wrapped with the provider can only access the value. We can
          have multiple context, multiple nesting of providers etc.
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import ThemeContext from './...'

              function A () {
                return (
                  <>
                    <ThemeContext.Provider value={{'data object here'}}>
                      <App />
                    </ThemeContext.Provider>
                  </>
                )
              }
          `}
          </SyntaxHighlighter>
          We can update the states in context too, just pass the setter function
          in the value object.
        </li>
        <li>
          <b>IMP:</b> Redux vs Context: Redux is a state management library, it
          is an external library and not inside react. Small and medium sized
          applications mostly dont need redux, context is enough in most cases.
          Large scale apps can also be built using Context without issues. But
          usually redux is used in large scale apps (a more commonly used) as it
          is scalable, works in a different way. If we have multiple context
          then it can become complicated, redux has much more tools etc for
          usage and data management.
        </li>
      </ul>
      <h6>Episode 12:</h6>
      <ul>
        <li>
          Redux is used in our data layer to optimise and better it. It is like
          a store/ central place where we have some of our states/data etc. It
          is not mandatory to use redux (use wisely), most apps can be built
          without it. But if our app needs lot of data management, passing etc
          then prefer it. Though any UI can be built without using redux. It is
          an external library and not in react. npm i redux. There are more
          librarries that can used for state management (zustand, lightweight
          and gaining popularity). We can also use redux dev tools just like
          react dev tools.
        </li>
        <li>
          Two libraries are there react-redux and redux toolkit (rtk). Earlier
          there was some old way of writing redux but over time it has
          simplified a lot. redux toolkit with react-redux is newer way.
          (plain/vanilla redux is old). react-redux is like the bridge between
          the two. (check docs for more info)
        </li>
        <li>
          Redux store: we can see this as an big js object stored at a central
          place and any component can access it meaning write and read data.
          Keep all or as much of data neede in this central place. We have some
          parts of the store called slices. A lsice can be seen as a small
          portion of the store and we can create multiple slices in it. To keep
          data we make these logical partitions/ slices. Let say in an app, in
          one slice we can keep cart data, login info in other slice, theme data
          in one slice etc.
        </li>
        <li>
          Updating data: lets say now we have to update some data in a slice.
          for this we have to <b>'dispatch'</b> an <b>'action'</b>, we cannot
          directly modify it just like that. It then class a functions which
          internally modifies the data. This function is known as{" "}
          <b>'reducer'</b>, which modifies the slice of our redux store.
        </li>
        <li>
          <b>Selector</b>: for reading data from the store we use something
          known as a selector. It will read the from the store and modify the
          component where that data is being displayed. This phenomenon is
          called subscribing to the store. The component using the data is in
          sync with the store (subscribed).
        </li>
        <li>
          Steps: 1. Install @reduxjs/toolkit and react-redux <br />
          2. Build our store. <br />
          3. connect our store with the app (the bridge).
          <br />
          4. Build the slice <br />
          5. dispatch action <br />
          6. read the data using selector
        </li>
        <li>
          Building store: use the configureStore function from toolkit to
          initialize/define a store. use a new file generally in our utils
          folder to initialize.
        </li>
        <SyntaxHighlighter language="javascript" style={docco}>
          {`
              import { configureStore } from ' @reduxjs/toolkit';
              
              const appStore = configureStore({});

              export default appStore
          `}
        </SyntaxHighlighter>
        In our app js we need to provide the store, just like a context provider
        where we need to use redux wrap that part with the provider:
        <SyntaxHighlighter language="javascript" style={docco}>
          {`
             // App.js 
              import { Provider } from ' react-redux';
              import { appStore } from './....path';
              
              const App = () => {
                return (
                  <>
                    <Provider store={appStore}>
                    </Provider>
                  </>
                )
              }
              
          `}
        </SyntaxHighlighter>
        configure store comes from toolkit as it is a thing related to redux,
        provider (bridge between redux and react) is our normal provider which
        is in react. <br />
        To create a slice use createSlice function, generally we can create a
        new file for every slice. The function takes a config to create a slice,
        define the slices name its initial state and its reducer function.
        Reducer is an object that will action, we can see action sort of an api
        which will help us in modifying the data or a away to interact with the
        store, we define the actions that can be done on the data. Lets say
        addItem action adds an item to a data array. The function defined for
        the action (here addItem) is the reducer function. It has access to the
        state through param and the action. we dispatch a payload in the action
        object with our data that needs to be added in the array.
        <SyntaxHighlighter language="javascript" style={docco}>
          {`
              import { createSlice } from ' @reduxjs/toolkit';
              
              const dataSlice = createSlice({
                name: 'sliceName',
                initialState: {
                  array: []
                },
                reducers: {
                  addItem: (state, action) => {
                    // mutation of state
                    state.array.push(action.payload) // push something in the data array in state
                  },
                  removeItem: (state, action) => {
                    state.array.remove(action.payload); // some popping, splicng logic this is just random
                  }, 
                  clearData: (state, action) => {
                    state.array.length = 0;
                  }
                }
              });

              export default dataSlice.reducer

              export const { addItem, removeItem, clearData } = dataSlice.actions
          `}
        </SyntaxHighlighter>
        Redux toolkit gives us the above syntax for exporting reducer and the
        actions. We add the slice to the store as below. In the initilization
        config, add a reducer which is responsible to modify our appStore. Each
        slice will have its reducer and combining all those makes our appStore
        reducer (below key value pair)
        <SyntaxHighlighter language="javascript" style={docco}>
          {`
              import { configureStore } from ' @reduxjs/toolkit';
              import dataReducer from './...pathofSliceFile'
              
              const appStore = configureStore({
                reducer : {
                  data: dataReducer,
                  //other slices reducers added as key value pairs
                }
              });

              export default appStore
          `}
        </SyntaxHighlighter>
        <li>
          Selector: Used for subscribing to the store, It is just a hook-
          useSelector(). In the hook we can pass a callback func specifying the
          location or data item for which we want access. Like in our case we
          want access to data.array (data key in appStore reducer has this array
          defined in dataSlice). useSelector helps us to get the exact
          portion/slice of our store from which we want to read data/subscribe
          to. In some file we can:
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import { useSelector } from 'react-redux';

              function Component() {

                const dataArray = useSelector( (store) => store.data.array );
              }
          `}
          </SyntaxHighlighter>
        </li>
        <li>
          Dispatch: When we want update the data we dispatch it. We need
          something known as 'dispatch' (it is a function) which we get from the
          useDispatch hook from react-redux. In dispatch() we pass the action
          which we had exported from the slice file (addItem, removeItem). Then
          whatever we pass inside the action goes into the actions payload (like
          here 'SomeValue' will go inside action.payload which we access in the
          slice reducer). In some file where we want to dispatch data lets say
          on clicking a button:
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import { useDispatch } from 'react-redux';
              import { addItem } from './dataSlicefilepath'

              function Component() {

                const dispatch = useDispatch()

                const handleAdd = () => {
                  dispatch(addItem("SomeValue"));
                }
                
                return (
                  <>
                  <button onClick={handleAdd}></button>
                  </>
                )

              }
          `}
          </SyntaxHighlighter>
        </li>
        <li>
          Some points: <br />
          <ul>
            <li>
              Make sure we are subscribing to the right portion/slice of the
              store while using useSelector. If we dont subscribe to the right
              portion of the store it will be a big performance loss. get the
              needed data exactly by passing in the right slice path inside the
              useSelector callback function instead of getting the whole store
              or something like that. do: const data = useSelector((store) =>
              store.data.array); dont: const store = useSelector(store =>
              store); const data = store.data.array; . We dont want to subscribe
              to the whole store/ unnecessary slices and data.
            </li>
            <li>
              While creating store (appStore), keyword used is 'reducer' as it
              is a one big reducer. This reducer can have many small reducers.
              When we create a a slice, we write many reducers (addItem etc.).
            </li>
            <li>
              In the old way of redux that is vanilla redux, it was very
              important and mentioned by redux docs that do not mutate states in
              the reducer function defined (like in the new way we get state in
              callback func and mutate, this was prohibited). A copy of state
              was created and then this was modified and returned (returning was
              mandatory). Ex: addItem: (state, action) => const new = [..state];
              return new;//after some modifications .In the new way using redux
              toolkit, we have to mutate states (no other option) and return is
              also not required. But the point is, redux still makes an
              immutable state behind the scenes (old way) and is not asking the
              developers to do this (immutable way). A library: Immer takes care
              of all this (check more). <br />
              Also we cannot modify state like this using equality operator as
              it will only modify it locally and not the actual state. addItem:
              (state) => state = [..state, newItem]. RTK says either mutate the
              state or return a new state. clearItem: (state) =>
              state.data.array.length = 0 or clearItem: (state) => return{" "}
              {`{ array: [] } `};
            </li>
            <li>
              Redux dev tools: Same browser extension as react dev tools, if an
              app is using redux then we can use the redux dev tools. When our
              app grows ver large with lots of components, states, lot of
              dispatching happening and lot of components have subscribed to
              these slices, these dev tools help a lot in debugging.
            </li>
            <li>
              Read about RTK Query. In older version of redux we used to use
              middlewares, redux thunks to lets say fetch data from api call and
              then store the data in the store.
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default Ep11and12;
