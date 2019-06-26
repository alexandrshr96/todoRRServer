import React from 'react';
import TodoItem from './TodoItem/index';
import { connect } from 'react-redux';
import { ToggleAllInput, ToggleAllLabel, TodoList } from './style';
import { toggleTodo as toggleTodoAction,
         deleteTodo as deleteTodoAction,
         toggleAllTodo as toggleAllTodoAction,
         editTodo as editTodoAction,
         fetchTodos as fetchTodosAction } from '../../actions/index';
import { visibilityFilters } from '../../constants'

class Main extends React.Component{
  state = {
    editing: null,
  }


  handleToggleItem = id => {
    const { toggleTodo } = this.props;

    toggleTodo(id);
  }

  // updateStorage = () => {
  //   const { todoItems, lcStore, lcFilter, filters } = this.props

  //   lcStore.setItem(todoItems);
  //   lcFilter.setItem(filters);
  // }

  componentDidMount(){
    this.props.fetchTodos();
  }

  handleDeleteItem = id => {
    const { deleteTodo } = this.props;

    deleteTodo(id);
  }

  handleToggleAllItems = () => {
    const { toggleAllTodo } = this.props;

    toggleAllTodo();
  }

  handleEditItem = e => {
    const { editTodo } = this.props

    if (e.keyCode !== 13) {
      return;
    }

    e.preventDefault();

    let text = e.target.value.trim();

    if(!text){
      return;
    }

    let obj = {
      id: parseInt(e.target.id, 10),
      text
    }

    editTodo(obj);

    e.target.value = '';
    this.setState({
      editing: null
    });
  }

  showEditInput = id => {
    this.setState({
      editing: id
    });
  }

  editInputBlur = () => {
    this.setState({
      editing: null
    });
  }

  createToggleAllLabel(){
    const { lcStore, todoItems, countCompleted } = this.props

    if(lcStore){//lcStore.getItem().length > 0
      let obj = {
        length: todoItems.length,
        counter: countCompleted()
      }
      let ToggleAllLabelWrapper = ToggleAllLabel(obj);

      let btn = <ToggleAllLabelWrapper
        className="toggle-all-label"
        htmlFor="toggle-all"
        onClick={this.handleToggleAllItems}>
      </ToggleAllLabelWrapper>;

      return btn;
    }
  }

  filteringList = () => {
    const { todoItems, filters } = this.props

    let items = filters === visibilityFilters.active ? todoItems.filter(item => item.completed === false)
      : filters === visibilityFilters.completed ? todoItems.filter(item => item.completed === true)
        : todoItems;

    return items;
  }

  render(){
    //this.updateStorage();
    const clearButton = this.createToggleAllLabel();
    const items = this.filteringList();

    return(
      <section className="main">
        <ToggleAllInput
          className="toggle-all"
          id="toggle-all"
          type="checkbox">
        </ToggleAllInput>
        {clearButton}
        <TodoList className="todo-list">
          {items.map(item=>
            <TodoItem
              key={item._id}
              item={item}
              toggle={this.handleToggleItem}
              remove={this.handleDeleteItem}
              edit={this.handleEditItem}
              showEdit={this.showEditInput}
              editing={this.state.editing}
              blur={this.editInputBlur}
            />
          )}
        </TodoList>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    todoItems: state.todoItems,
    filters: state.filters,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleTodo: payload => {
      dispatch(toggleTodoAction(payload))
    },
    deleteTodo: payload => {
      dispatch(deleteTodoAction(payload))
    },
    toggleAllTodo: payload => {
      dispatch(toggleAllTodoAction(payload))
    },
    editTodo: payload => {
      dispatch(editTodoAction(payload))
    },
    fetchTodos: payload => {
      dispatch(fetchTodosAction(payload))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main)