const ExtraHooks = () => {
  return (
    <>
      <h6>Extra Hooks, useMemo, useRef, useCallback</h6>
      <ul>
        <li>
          useMemo: Lets you cache the result between re renders. If there is a
          heavy/expensive computation which we dont want to do on every re
          render then use this hook. Pass a function as first argument, the
          result/returned value is cached. Pass dependency array, recomputing of
          value/ calling function only when any of the dependency changes.
        </li>
        <li>
          useCallback: Cache the function definition instead of its result/value
          between re renders.
        </li>
        <li>
          useRef: Reference a value that is not needed for rendering. When we
          want to store a value/persist across renders but dont want re renders.
          Updating of the value should not trigger re renders. It returns an
          object with a key 'current', that cn be assigned some value which we
          want to persist. directly mutate the current value ref.current = ....
        </li>
      </ul>
    </>
  );
};

export default ExtraHooks;
