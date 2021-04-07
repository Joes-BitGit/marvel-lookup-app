import { useState, useEffect } from "react";

function Loading() {
  const [text, setText] = useState("Loading");

  useEffect(() => {
    const stopper = text + "...";
    // console.log("MOUNTING IN USEEFFECT");
    let interval = window.setInterval(() => {
      text === stopper ? setText("Loading") : setText(`${text}` + ".");
    }, 300);

    return () => {
      // console.log("UNMOUNTING IN USEEFFECT");
      window.clearInterval(interval);
    };
  });

  // return <p>{text}</p>;
  return (
    <div class="preloader-wrapper active center-align">
      <div class="spinner-layer">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
