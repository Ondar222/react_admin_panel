import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

#root {
    height: 100vh;
    width: 100vw;
}

.container {
    
}

.container__wrap {
    overflow-y: hidden;
}

.scroll-wrapper {
    overflow: scroll;
}
  
.ant-layout {
    height: 100%;
}
  
.container__sider {}


  
.container__content {
    overflow: scroll;
    padding: 0px 50px;
}
  
.container__content>:is([class]),
.container__content>:not([class]) {
    overflow: scroll;
}
  
.brm-cell {
    max-height: 10%;
    white-space: initial
}

.fc {
    height: 100%;
}
  
.fc-event {
    margin: 0 0 30px 0;
}
`

export { GlobalStyles }