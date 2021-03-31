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

  return <p>{text}</p>;
}

export default Loading;
