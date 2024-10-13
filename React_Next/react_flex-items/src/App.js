import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [childrenCount, setChildrenCount] = useState(5);
  // const [children, setChildren] = useState([{}]);

  const [childStyle, setChildStyle] = useState({
    backgroundColor: "red",
    width: 100,
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid black",
    // flexGrow: 0,
    // flexShrink: 0,
  });

  const [child1SpecificStyle, setChild1SpecificStyle] = useState({
    // width: 10,
  });

  const [ParentStyle, setParentStyle] = useState({
    backgroundColor: "pink",
    height: 700,
    width: 700,
    gap: 0,
    display: "block",
  });

  // useEffect(() => {
  //   if (child1SpecificStyle.flexShrink === 0)
  //     setChildStyle((prev) => ({ ...prev, flexShrink: 0 }));
  //   else setChildStyle((prev) => ({ ...prev, flexShrink: 1 }));
  // }, [child1SpecificStyle.flexShrink]);

  // useEffect(() => {
  //   if (child1SpecificStyle.flexGrow === 0) {
  //     setChildStyle((prev) => ({ ...prev, flexGrow: 0 }));
  //   } else {
  //     setChildStyle((prev) => ({ ...prev, flexGrow: 1 }));
  //   }
  // }, [child1SpecificStyle.flexGrow]);

  // useEffect(() => {
  //   console.log("flexGrow ", childStyle.flexGrow);
  // }, [childStyle.flexGrow]);

  // useEffect(() => {
  //   console.log("flexShrink ", childStyle.flexShrink);
  // }, [childStyle.flexShrink]);

  return (
    <div
      className="App"
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          flexGrow: 1,
        }}
      >
        {/* Parent Box */}
        <div style={ParentStyle}>
          {Array.from({ length: childrenCount }).map((item, index) => {
            return (
              <div
                key={index}
                style={
                  index === 0
                    ? { ...childStyle, ...child1SpecificStyle }
                    : childStyle
                }
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Option */}
      <div
        style={{
          border: "1px solid black",
          backgroundColor: "rgba(225,225,255)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          alignItems: "start",
          padding: 10,
          gap: 5,
          overflowY: "auto",
        }}
      >
        <h3>Parent Css Properties</h3>
        <div>
          <label htmlFor="parent-display">display:</label>
          <select
            onChange={(e) => {
              setParentStyle((prev) => ({ ...prev, display: e.target.value }));
            }}
            name="parent-display"
          >
            <option value={"block"}>block (default)</option>
            <option value={"inline"}>inline</option>
            <option value={"flex"}>flex</option>
            <option value={"inline-block"}>inline-block</option>
            <option value={"none"}>none</option>
          </select>
        </div>

        <div>
          <label htmlFor="parent-justify-content">justify-content:</label>
          <select
            onChange={(e) => {
              setParentStyle((prev) => ({
                ...prev,
                justifyContent: e.target.value,
              }));
            }}
            name="parent-justify-content"
            disabled={ParentStyle.display === "flex" ? false : true}
          >
            <option value={"start"}>start (default)</option>
            <option value={"center"}>center</option>
            <option value={"end"}>end</option>
            <option value={"stretch"}>stretch</option>
            <option value={"space-between"}>space-between</option>
            <option value={"space-around"}>space-around</option>
            <option value={"space-evenly"}>space-evenly</option>
          </select>
        </div>

        <div>
          <label htmlFor="parent-justify-items">justify-items:</label>
          <select
            onChange={(e) => {
              setParentStyle((prev) => ({
                ...prev,
                justifyItems: e.target.value,
              }));
            }}
            name="parent-justify-items"
            disabled={ParentStyle.display === "flex" ? true : false}
          >
            <option value={"normal"}>normal (default)</option>
            <option value={"start"}>start</option>
            <option value={"center"}>center</option>
            <option value={"end"}>end</option>
            <option value={"stretch"}>stretch</option>
          </select>
        </div>

        <div>
          <label htmlFor="parent-align-items">align-items:</label>
          <select
            onChange={(e) => {
              setParentStyle((prev) => ({
                ...prev,
                alignItems: e.target.value,
              }));
            }}
            name="parent-align-items"
            disabled={ParentStyle.display === "flex" ? false : true}
          >
            <option value={"normal"}>normal (default)</option>
            <option value={"start"}>start</option>
            <option value={"center"}>center</option>
            <option value={"end"}>end</option>
            <option value={"stretch"}>stretch</option>
          </select>
        </div>

        <div>
          <label htmlFor="parent-align-content">align-content:</label>
          <select
            onChange={(e) => {
              setParentStyle((prev) => ({
                ...prev,
                alignContent: e.target.value,
              }));
            }}
            name="parent-align-content"
            disabled={
              ParentStyle.display === "flex" || ParentStyle.display === "block"
                ? false
                : true
            }
          >
            <option value={"normal"}>normal (default)</option>
            <option value={"start"}>start</option>
            <option value={"center"}>center</option>
            <option value={"end"}>end</option>
            <option value={"stretch"}>stretch</option>
            <option value={"space-between"}>space-between</option>
            <option value={"space-around"}>space-around</option>
            <option value={"space-evenly"}>space-evenly</option>
          </select>
        </div>

        <div>
          <label htmlFor="parent-flex-wrap">flex-wrap</label>
          <select
            onChange={(e) => {
              if (ParentStyle.display === "flex") {
                setParentStyle((prev) => ({
                  ...prev,
                  flexWrap: e.target.value,
                }));
              } else {
                alert(
                  "flex-wrap Property only works, if, display is set to flex!"
                );
              }
            }}
            name="parent-flex-wrap"
            disabled={ParentStyle.display === "flex" ? false : true}
          >
            <option value={"nowrap"}>nowrap (default)</option>
            <option value={"wrap"}>wrap</option>
            <option value={"wrap-reverse"}>wrap-reverse</option>
          </select>
        </div>

        <div>
          <label htmlFor="parent-gap">gap {ParentStyle.gap} </label>
          <input
            type="range"
            name="parent-gap"
            min="0"
            max="30"
            value={ParentStyle.gap}
            onChange={(e) => {
              if (ParentStyle.display === "flex") {
                setParentStyle((prev) => ({
                  ...prev,
                  gap: Number(e.target.value),
                }));
              } else {
                alert("Gap Property only works, if, display is set to flex!");
              }
            }}
            disabled={ParentStyle.display === "flex" ? false : true}
          />
        </div>

        <div
          style={{
            border: "1px solid black",
            width: "100%",
            marginTop: 25,
          }}
        />
        <h3>Child Css Properties</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label htmlFor="child-count">Child Count {childrenCount} </label>
          <input
            type="range"
            name="child-count"
            min="1"
            max="20"
            value={childrenCount}
            onChange={(e) => setChildrenCount(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="child1-align-self">
            (1st child only) align-self:
          </label>
          <select
            onChange={(e) => {
              setChild1SpecificStyle((prev) => ({
                ...prev,
                alignSelf: e.target.value,
              }));
            }}
            name="child1-align-self"
            disabled={ParentStyle.display === "flex" ? false : true}
          >
            <option value={"auto"}>auto (default)</option>
            <option value={"normal"}>normal</option>
            <option value={"start"}>start</option>
            <option value={"center"}>center</option>
            <option value={"end"}>end</option>
            <option value={"stretch"}>stretch</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label htmlFor="child-count">flex-basis </label>
          <input
            type="range"
            name="child-count"
            min="1"
            max="20"
            value={childrenCount}
            onChange={(e) => setChildrenCount(e.target.value)}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label htmlFor="child-flex-grow">
            flex-grow: {child1SpecificStyle.flexGrow || 1}{" "}
          </label>
          <input
            type="range"
            name="child-flex-grow"
            min="0"
            max="10"
            value={child1SpecificStyle.flexGrow || 1}
            onChange={(e) =>
              setChild1SpecificStyle((prev) => ({
                ...prev,
                flexGrow: e.target.value,
              }))
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label htmlFor="child-flex-shrink">
            flex-shrink: {child1SpecificStyle.flexShrink || 1}
          </label>
          <input
            type="range"
            name="child-flex-shrink"
            min="0"
            max="10"
            value={child1SpecificStyle.flexShrink || 1}
            onChange={(e) =>
              setChild1SpecificStyle((prev) => ({
                ...prev,
                flexShrink: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
