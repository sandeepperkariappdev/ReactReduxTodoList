import React from 'react';

export default class TodosForm extends React.Component {
    handleSummit = () => {
        let node = this.refs['todo-input'];
        this.propd.createTodod(node.value);
        node.value = '';
    }
    
    render () {
        return (
            <div id="todos-form">
                <input type="text" placeholder="type todo" ref="todo-input"/>
                <input type="submit" value="OK!" onClick={this.handleSubmit} />
            </div>
        );
    }
}