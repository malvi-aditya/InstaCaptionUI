import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Ep6and7() {
  return (
    <>
      <h6>Episode 6:</h6>
      <ul>
        <li>
          <b>Monolith Architechture</b>: Earlier we used to have huge big
          project having backend, UI, database, authentication etc. all
          together. Change in even one part required re deploying of the whole
          project, every thing in the same repo. <br />
          <b>Micro service architecture</b>: New and preffered way of building
          applications. In this, we have different service/ project for every
          thing, like a backend service, ui sevice etc. running independently,
          all services combined together to form the app. Known as single
          responsibility principle, each and every sevice doing its own job.
          Everything in different repos, with their own deployment cycle etc.
          All these services interact with each other to form the app. Also with
          this we can write different services using diffferent tech stacks, ui
          in react, backend in python etc. All services run in their own
          different ports and they can be mapped to domain name. apis can be
          mapped to /api so all apis will be deployed on this endpoint like for
          interacting among services we can use that endpoints.
        </li>
        <li>
          UI interacts with the backend primarily to fetch data. One way is
          first the ui loads, we then make the api call and after getting the
          data we render. Second approach is as soon as page loads we
          immediately render the UI, then we make an api call then and after we
          get data we re render the ui. This is the most better, common approach
          giving better UX. In the first way until we get data our page is white
          or frozen. In second way we render what we can and update later. React
          has fast rendering cycle so second way is preffered as wen re render
          as many times we want.
        </li>
        <li>
          <b>useEffect</b>: This takes two arguments, first is a callback
          function and second is a dependency array. useEffect is triggered when
          the component first renders. When our component executes line by line
          we encounter useeffect, the callback func gets registered and execute
          further. When we return the jsx, our component renders and then the
          callback func is called. so if there is a console.log() just after an
          useeffect it will log first and then the callback func passed will
          run. To follow the second way of rendering ui, we use useeffect, load
          the ui, render then call api using a callback func then re render ui.
        </li>
        <li>
          CORS: our browser blocks the calling of apis/ urls to different
          origin, we cannot call any api directly from localhost. One way of
          bypassing is to use a browser extension.
        </li>
        <li>
          We fetch the data and display it. usually we do optional chaining
          while accessing anything in the json object (data?.data2?.data3).{" "}
          <br />
          Also initially when data is being fetched, instead of showing blank
          screen etc. we can add a loader etc. New standard practice is using{" "}
          <b>Shimmer UI</b>, instead of a spinner, loader to show loading in a
          more better way. Ui loads, show the shimmer ui, after getting data
          then show the actual data. This concept is known as{" "}
          <b>conditional rendering</b>, where we render different things based
          on current scenario ( if(!data) return (Loader....)).
        </li>
        <li>
          Intuition behind introducing useState was to get a way for react to
          know that there is a change in some variable and so we have to re
          render the ui with updated states. the setter function that we get
          from use state internally triggers the whole re render logic etc. When
          a state changes, the whole component re renders. When a component re
          renders, new and old jsx/virtual dom compared and only the jsx where
          the state used gets updated (diff algo, reconciliation ). Whole
          component re renders but only updation happens to elements that have
          changed. Not just virtual dom is making eact faster, react fiber,
          reconciliation process and comparing algo for two virtual doms to make
          only updates where changes are present and not everything makes it
          faster.
        </li>
        <li>Removing CORS plugin: check for something like corsproxy.io</li>
      </ul>
      <h6>Episode 7:</h6>
      <ul>
        <li>
          useEffect: If no dependency array passed and only the callback func
          passed, useEffect triggers on every render of the component. If an
          empty dependency array passed, it triggers only on initial/first
          render and just once. When some dependencies passsed, it triggers
          initially and subsequent times when its dependencies changes. <br />
          useState: can only be used inside of a func and preferrably define
          them at the start of the func/component. Also never define them
          conditionally or for loops or inside of any function ( if (...) const
          [] = useState() ).
        </li>
        <li>
          Routing: Create different and multiple pages in a app using urls/
          endpoints using the popular library react router dom. Create a routing
          configuration in app.js/ top level of the app. Use createBrowserRouter
          from react-router-dom and pass our config. The config is a array of
          objects with each object having a path key specifying the relative
          path ('/', '/about') and a second key called element which is the
          element/component to render for the corresponding path. Once we have
          created this config we can use it over the app using RouterProvider,
          provide the config to the render using routerprovider.
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import ReactDOM from 'react-dom';
              import { createBrowserRouter, RouterProvider } from 'react-router-dom';

              const appRouter = createBrowserRouter([
                {
                  path: '/',
                  element: <Home />,
                  errorComponent: <Error />,
                },
                {
                  path: '/about',
                  element: <About />
                }
              ])

              const root = ReactDOM.createRoot(document.getElementById('root'));

              root.render(<RouterProvider router={appRouter}/>)
          `}
          </SyntaxHighlighter>
          createbrowserrouter is the most preffered, there are some other too
          (check docs). Also react-router-dom has an error page on going to an
          url which is not defined. Another key called 'errorElement' can be
          added in the object to display a error component on undefined paths.
          Also there is a hook called useRouteError, we can have more info about
          the error as it returns an error object (const err = useRouteError()).
        </li>
        <li>
          Children routes: Generally we want to keep our header/ app bar intact
          when we switch between routes and on changing route only content of
          body should change, to achieve this we need children routes. Add a key
          children in the object, and in the component add conditions or we call
          pushing the children in the component according to the route to render
          a component based on the route ( see below ). We do this using
          'Outlet', the outlet component will be filled with the component
          according to the path we are on (we will not see outlet in html dom,
          everything happens behind the scenes).
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
              import ReactDOM from 'react-dom';
              import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

              const AppLayout = () => {
                return (
                  <div>
                    <Header />
                    <Outlet />
                  </div>
                )
              }

              const appRouter = createBrowserRouter([
                {
                  path: '/',
                  element: <Home />,
                  children: [
                    {
                      path: '/',
                      element: <MainHome />,
                    },
                    {
                      path: '/about',
                      element: <About />
                    },
                    {
                      path: '/contact',
                      element: <Contact />
                    }
                  ]
                  errorComponent: <Error />,
                },
              ])

              const root = ReactDOM.createRoot(document.getElementById('root'));

              root.render(<RouterProvider router={appRouter}/>)
          `}
          </SyntaxHighlighter>
        </li>
        <li>
          anchor tag {`<a href=""></a>`}: We should not use this to navigate to
          different routes/pages as it reloads the whole page. Instead we should
          use Link component {`<Link to=""> </Link>`} given by react-router-dom.
          attribute used: to instead of href. Internally, link uses anchor tag,
          it is kind of a wrapper on anchor tagm, browsers etc. dont understand
          link component. react router dom keeps a track of this Link.
        </li>
        <li>
          Single page apps: These apps we create using react and routers are
          known as single page apps as we do not go to any new page and also on
          switching routes we are just replacing components behind the scenes
          and not going to new page/reload etc. <br />
          Client side routing and server side routing: Server side means lets
          say we have some files index.html, about.html, contact.html etc. on
          switching routes among these we made calls to fetch the new html and
          our browser used to reload. On the other hand routing which we do
          using react-router-dom is client side routing as we do everything in
          ui, no new calls are made etc.
        </li>
        <li>
          Dynamic routing: Let say on clicking on some list of data we want to
          redirect to a new route showing more info about it, we will use
          dynamic routing. For ex we have a list of hotels and clicking on it
          shows more details in a new route. <br />
          We create a more details component which dynamically loads data based
          on the url, on clicking a list item we push its details in the url,
          redirect to the new route and then render the component using data in
          url (make api calls etc.) <br />
          Define a dynamic path like this. path: '/restaurants/:resId'. By this
          on going to the path /restaurants/123 or /restaurants/125 we can load
          different data in a component. <br />
          useParams: hook given by react router dom to read url params. const{" "}
          {`{ resId }`} = useParams(). The hook returns a object with the key
          being the url param. In the list of cards, just wrap the container
          with Link and 'to' to the desired route dynamically ("/restaurants/ +
          resId").
        </li>
        <li>
          Graphql: sometimes backend returns tonnes of data in a complex json
          structure which is difficult to deal with. This is where graphql can
          have an impact which helps us with this over fetching, loading only
          required datau sing a structured query.
        </li>
      </ul>
    </>
  );
}
