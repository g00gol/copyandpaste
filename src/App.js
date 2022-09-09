import { useState, useEffect } from "react";

export default function App() {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  function handleInput(event) {
    if (!event) {
      return;
    }
    console.log(event.target.value);
    setInput(event.target.value);
  }

  function handleCopy() {
    if (!input) {
      setFailed(true);
      return;
    }
    const str = `/*******************************************************************************\n * Author  : ${input}\n * Date    : ${date}\n * Pledge  : I pledge my honor that I have abided by the Stevens Honor System.\n******************************************************************************/`;
    navigator.clipboard.writeText(str).then(() => console.log("copied"));
    copiedEvent(true);
  }

  const copiedEvent = async () => {
    setCopied(true);
    await delay(5000);
    setCopied(false);
  };

  useEffect(() => {
    setCopied(false);
    setInput(JSON.parse(localStorage.getItem("author_input")));

    const localInput = JSON.parse(localStorage.getItem("author_input"));
    if (localInput === "" || localInput === null) {
      console.log(input);
      console.log("No data");
      setEdit(true);
      return;
    }
    handleInput();
  }, []);

  return (
    <>
      <div
        className={
          "fixed w-screen text-center text-white bg-green-500 py-4 text-xl transition-all duration-500" +
          " " +
          (copied ? "top-0" : "-top-24")
        }
      >
        Copied!
      </div>

      <div
        className={
          "fixed w-screen text-center text-white bg-red-500 py-4 text-xl transition-all duration-500" +
          " " +
          (failed ? "top-0" : "-top-24")
        }
      >
        Missing Field(s)!
      </div>

      <div className="flex w-screen h-screen bg-slate-800 text-white justify-center items-center">
        <code id="input-container" className="text-gray-400 flex flex-col">
          <div
            className={
              "m-6 p-2 space-y-6" +
              (edit
                ? ""
                : " " +
                  "cursor-pointer hover:bg-slate-900 transition-color duration-300")
            }
            onClick={edit ? null : () => handleCopy()}
          >
            <p>
              /*******************************************************************************
            </p>
            <span className="flex">
              <p> * Author&nbsp;&nbsp;:&nbsp;</p>
              {edit ? (
                <input
                  className={
                    "bg-transparent text-gray-400 placeholder-gray-300 focus:outline-none focus:text-gray-300" +
                    " " +
                    (input ? "" : "bg-gray-400")
                  }
                  type="text"
                  placeholder={input === "" ? "Your name" : input}
                  onChange={(e) => handleInput(e)}
                />
              ) : (
                <p>{input}</p>
              )}
            </span>
            <p> * Date&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{date}</p>
            <p>
              {" "}
              * Pledge&nbsp;&nbsp;:&nbsp;I pledge my honor that I have abided by
              the Stevens Honor System.
            </p>
            <p>
              {" "}
              ******************************************************************************/
            </p>
          </div>

          <span className="space-x-4 mx-6 p-2">
            {/* <button onClick={() => handleCopy()}>Copy</button> */}

            {edit ? (
              <button
                onClick={() => {
                  setEdit(false);
                  localStorage.setItem("author_input", JSON.stringify(input));
                }}
                className="text-gray-300"
              >
                Save
              </button>
            ) : (
              <button onClick={() => setEdit(true)}>Edit</button>
            )}
          </span>
        </code>
      </div>
    </>
  );
}
