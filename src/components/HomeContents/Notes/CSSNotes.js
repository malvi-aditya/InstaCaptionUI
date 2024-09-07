import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const useStyles = makeStyles(() => ({
  content: {
    marginRight: "16px",
  },
  iconText: {
    display: "flex",
    gap: "3px",
    alignItems: "center",
  },
}));

export default function CSSNotes() {
  return (
    <>
      <b>CSS Position</b>: <br />
      1. static: Default one. According to the flow of the elements in the Dom.
      <br />
      2. relative : Same as static. But lets you add top, right, bottom, left.
      Makes it move relative to it's normal position <br />
      3. absolute: Removes from the flow and positions absolute wrt to the
      parent. Parent has to be relative or absolute for top, right, bottom, left
      to work. Else it considers the main html element as the parent.
      <br />
      4. fixed : Fixed to a place. Doesn't think about the parent. Always
      considers html element as the parent. Stays there when scrolled. <br />
      5. sticky : Relative ( when normal) + fixed ( when scrolled). The values
      for top, right, bottom, left become active when scrolled
      <br />
      <b>CSS Display:</b> Lets take this example: (WebDevSimplified)
      <br />
      <SyntaxHighlighter language="html" style={docco}>
        {`
              <div class="flexbox-container">
                <div class="flexbox-item-1"></div>
                <div class="flexbox-item-2"></div>
                <div class="flexbox-item-3"></div>
              </div>
              `}
      </SyntaxHighlighter>
      When class flexbox-container empty the 3 divs will be one below other as
      per flow. When we apply display: flex all elements in the container will
      in one after other in one row. When we reduce the size of the browser they
      shrink to fit and grow back on increasing. <br />
      Main axis: Along the direction of items. Cross axis: Perpendicular to main
      axis/direction of flow of elements. flexDirection: row -> main axis
      horizontal and cross axis vertical. flexDirection: Column -> main axis
      vertical and cross axis horizontal. <br />
      justify-content: style the elements along the main axis, ex: flex-start:
      elements will align at the start of the container/main axis. See different
      values. <br />
      align-items: style the elements along the cross axis. Check align-content
      & flex-wrap property. align-content: use in multiline flexbox containers.{" "}
      <br />
      Properties on items: <br />
      <b>flex-shrink</b>: When flexbox container shrinks on reducing browser
      size, all items shrink in size. to avoid that we can provide flex-shrink:
      0 so it will not shrink in size. <br />
      <b>flex-grow</b>: if the size of container increases and we an element to
      grow in size. flex-grow: 1 will increase the size of item to fill up the
      empty space. If flex-grow:2 given to on item and 1 to other, the first one
      will grow twice as the second one, meaning it will occupy twice the left
      over space than the first one (their exact sizes are not double). This is
      given they some width is already applied lets say 200px. so if left over
      space is x px then their final widths will be 200 + 2*x/3 & 200 + x/3. 200
      px is the beginning.
      <br />
      <b>flex-basis</b>: If we want them to grow from 0px and override the
      initial 200px, set flex-basis: 0 for both. By this final width of first
      item will be exactly double of the second item. <br />
      <b>align-self</b>: override the align-items property and set the alignment
      of a specific item. If align-self: flex-end applied on item 1 it will
      align itself to end of the cross axis, other items continue to br center
      (if align-items: centre applied to container). <br />
      order: change the display order of the items, html element flow remains
      same, but elements displayed by the order property. <br />
      <b>CSS Grid:</b> Flexbox lays out elements in one dimesion/along the main
      axis. Using grid we can lay out elements in 2 dimensions. We have grid
      container that wraps all the grid items. Apply display: grid to the
      container. Then we can apply following to define different things.
      (webdevsimplfied video)
      <br />
      1. grid-template-columns: Define the columns in our grid structure. ex:
      grid-template-columns: 200px 100px - 2 columns with the specified widths.
      For dynamic width use fractional unit, first column is twice as the
      second, similar to flex-grow: grid-template-columns: 2fr 1fr.
      <br />
      Use repeat() to specify things by one func instead of writing them again
      and again ex: instead of grid-template-columns: 100px 100px 100px 100px
      write grid-template-columns: repeat(4, 100px). <br />
      2. grid-template-rows: similar to above, define the rows. <br />
      3. grid-auto-rows: when width of any row is not defined, we can have a
      default width. grid-auto-rows: 150px. if we define any row it will
      override this default width. ex: grid-auto-rows: 150px;
      grid-template-rows: 200px - first row will be 200px while rest will
      default to 150px. Use <b>minmax(150px, auto)</b> to give min height for
      the rows (here 150) and max height to be auto, this is because if there is
      lot of content it will overflow and display in further rows, we want the
      height to increase dynamically according to the content. 4. 4.
      justify-content: place/style the grid container. justify-content: start -
      places container at the start of the screen, center will center on the
      screen. <br />
      5. align-content: aligns the grid container vertically, also give some
      height to the container for this to work. <br />
      6. justify-items: style the items wrt the columns, justify-items: center
      will display the item in the center of the column. <br />
      7. align-items: center - will align every grid item in the center of the
      row.
      <br />
      4. grid-gap: 20px - will give 20px gap between rows and columms. can give
      different gap b/w rows and columns by grid-row-gap: 20px &
      grid-column-gap: 10px. <br />
      5. grid-template-areas: check usage. <br />
      Properties to grid items: <br />
      1. grid-column: 1 / -1: or grid-column-start: '' & grid-column-end: '' -
      specifiy start and end for a specific grid item, the grid item will then
      span across multiple columns, 1 / -1 if applied to 1st item it will span
      across from start to end/ last column. grid-column: span 2 - grid item
      will span across 2 columns. Pass row numbers in grid-column-start/
      grid-column-end. for spaninng across two columns give 1 & 3 as start and
      end values as empty gap is also a column no. grid-row/ grid-row-start &
      grid-row-end are the same. <br />
      2. align-self: override the align-items and align the specific grid item.
      Similarly justify-self overrides justify-items.
    </>
  );
}
