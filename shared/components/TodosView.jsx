import React from 'react';

export default class TodosView extends React.Component {
    handleDelete = (e) => {
        const id = Number(e.target.dataset.id);
        //Equivalent to `dispatch(deleteTodo())`
        this.props.deleteTodo(id);
    }
    
    handleEdit = (e) => {
        const id = Number(e.target.dataset.id);
        const val = this.props.todos.get(id).text;
        
        //for cutting edge UX
        
        let newVal = window.prompt('', val);
        this.props.editTodo(id, newVal);        
    }
    componentDidMount(){
        this.props.getTodos();
    }
    render() {
        return (
            <div id="todo-list">
            {
                this.props.todos.map(() => {
                    return (
                    <div key={index}>
                        <span>{todo}</span>
                        <button data-id={index} onClick={this.handleDelete}>
                            X
                        </button>
                        <button data-id={index} onClick={this.handleEdit}>
                            Edit
                        </button>
                    </div>
                    );
                })
            
            }
            </div>
        )
    }
}