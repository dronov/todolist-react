/**
 * @jsx React.DOM
 */

var TodoList = React.createClass({

    getInitialState: function(){
        return { 
          total: 0,
          count: 0
        };
    },

    addFinishedTask: function(){
        this.setState( { total: ++this.state.total } );
    },

    removeFinishedTask: function(){
        this.setState( { total: --this.state.total } );
    },

    render: function() {

        var self = this;
        var todolist = this.props.items.map(function(s){
            return <Task name={s.name} active={s.active} addFinishedTask={self.addFinishedTask} removeFinishedTask={self.removeFinishedTask} />;
        });

        return <div>
                    <h1>ToDo List</h1>
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
    <TodoList items={ todolist } />,
    document.body
);
