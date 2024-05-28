import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ReactNotes(props) {
  const [showPerf, setShowPerf] = useState(false);
  return (
    <>
      <ul>
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
      </ul>
    </>
  );
}
