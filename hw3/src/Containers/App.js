// https://juejin.cn/post/6844904165492129799 使用此方法調節
import React, {useState} from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';



function App() {

    const [numItem, setNumItem] = useState(0)

    return (
        <>
            <Header />
            <Main setNumItem={setNumItem}/>
            <Footer num={numItem}/>
        </>
    );
}


  
export default App;