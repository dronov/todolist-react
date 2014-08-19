/**
 * @jsx React.DOM
 */

var TodoList = React.createClass({

    getInitialState: function(){
        return { 
          total: 0,
          count: 0,
          todolist: [],
          taskname: '' 
        };
    },

    addFinishedTask: function(){
        this.setState( { total: ++this.state.total } );
    },

    removeFinishedTask: function(){
        this.setState( { total: --this.state.total } );
    },
    
    handleSubmit: function() {
      var text = this.refs.tasktext.getDOMNode().value.trim();
      if (!text) {
        return false;
      }
      // TODO: send request to the server
      this.refs.tasktext.getDOMNode().value = '';
      this.state.todolist.push({name: text})
      this.setState();
      return false;
    },

    render: function() {

        var self = this;
        var todolist = this.state.todolist.map(function(s){
            return <Task name={s.name} active={s.active} addFinishedTask={self.addFinishedTask} removeFinishedTask={self.removeFinishedTask} />;
        });

        return <div>
                    <h1>ToDo List</h1>
                    
                    <form className="taskForm" onSubmit={this.handleSubmit}>
                      <input type="text" placeholder="Enter task name" ref="tasktext" />
                      <input type="submit" value="Add task" />
                    </form>
                    
                    <div id="todolist">
                        {todolist}
                        <p id="total">Done: <b>{this.state.total}</b></p>
                    </div>
                </div>;

    }
});


var Task = React.createClass({
    getInitialState: function(){
        return { active: false };
    },

    clickHandler: function (){
        var active = !this.state.active;
        this.setState({ active: active });
        if (!active ) {
          this.props.removeFinishedTask()
        } else {
          this.props.addFinishedTask( active ? this.state.total: --this.state.total );
        }
    },

    render: function(){
        return  <p className={ this.state.active ? 'active' : '' } onClick={this.clickHandler}>
                    {this.props.name} 
                </p>;
    }
});

var todolist = [
    { name: 'Make coffee' },
    { name: 'Learn some React JS basics' },
    { name: 'Prepare to work' },
    { name: 'Save the world' }
];

React.renderComponent(
    <TodoList />,
    document.body
);
