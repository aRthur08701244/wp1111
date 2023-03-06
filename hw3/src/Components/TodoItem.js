import React from "react"

class todoItem extends React.Component {
    constructor(props){
        super(props)
        this.target = React.createRef()
    }

    donItem = () => {
        // console.log(this.target.current.classList.value)
        if ("todo-app__item-detail todo-app__item-done" === this.target.current.classList.value){
            console.log('remove')
            this.target.current.classList.remove("todo-app__item-done")
        }
        else {
            console.log('add')
            this.target.current.classList.add("todo-app__item-done")
        }
        // this.target.current.classList.add("todo-app__item-done")
    }

    render() {
        return(
            <>
                <div className="todo-app__checkbox">
                    <input id={this.props.id} type="checkbox" onChange={this.donItem}/>
                    <label htmlFor={this.props.id}></label>
                </div>
                <h1 className="todo-app__item-detail" ref={this.target}>
                    {this.props.text}
                </h1>
                <img className="todo-app__item-x" src={require("./x-mark.png")} />
            </>
        )
    }
}


export default todoItem