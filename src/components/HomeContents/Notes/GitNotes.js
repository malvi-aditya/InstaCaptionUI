import React from "react";

export default function GitNotes() {
  return (
    <>
      Commands: <br />
      git branch -M 'main'-- If on master branch, it will rename to main. <br />
      git remote add origin git@github.com:'repolink' -- connect the local git
      repo to the remote repo created in github. <br />
      git push origin main -- push the code in branch 'main' to added 'origin'. <br />
      check all ssh key, public, private key issues and fixes.<br />
      
    </>
  );
}
