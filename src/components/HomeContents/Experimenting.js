import React from 'react';

export default function Experimenting(){
  function x() {
    for(var i=1; i<=5; i++) {
      function close(x) {
        setTimeout( function () {
          console.log(x);
        }, x * 1000);
      }
      close(i);
    }
  }         
  x();
  return <> </>
}