import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import { SpinningBoxSection, TestComponent } from "./components/TestComponent";

import Hero from "./components/Hero/Hero"

import "./style.css"
import Background from "../../components/Background/Background";

const NewHomePage = () => {
  return (
    <SmoothScrollbar>
      {(bind) => (
        <div {...bind}>
          {/* <Hero /> */}
          <div id="test" style={{
            height: "3000px",
          }}>
            test
          </div>
        </div>
      )}
      
    </SmoothScrollbar>
  )
}

export default NewHomePage;