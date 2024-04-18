import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    
}

*>not[.bcr-cell] {
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
    padding: 0 0 20px 0;
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
    padding: 20px 50px;
}
  
.container__content>:is([class]),
.container__content>:not([class]) {
    overflow: scroll;
}
  
.brm-cell {
    white-space: initial;
}

.brm-event {
}

.brm-event>button {
    // width: 100%;
    color: white;
}

.fc {
    height: 100%;
}
  
.fc-event {
    width: 100%;
    margin: 0 0 30px 0;
}
`

export { GlobalStyles }