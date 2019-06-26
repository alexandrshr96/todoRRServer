import React from 'react';
import { connect } from 'react-redux';
import { addTodo as addTodoAction } from '../../actions/index';
import {SemanticHeader,Title,Input} from './style'

class Header extends React.Component{

  handleSubmit = (e) => {
    const { addTodo } = this.props
    if (e.keyCode !== 13) {
      return;
    }
    e.preventDefault();

    let value = e.target.value.trim();

    if(!value){
      return;
    }
    addTodo(value);
    e.target.value = '';
  }

  render(){
    return(
      <SemanticHeader className='header'>
        <Title className="header__title">todos</Title>
        <Input className="header__input" placeholder="What needs to be done?"
          onKeyDown={this.handleSubmit}
          autoFocus
        ></Input>
      </SemanticHeader>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    todoItems: state.todoItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (payload) => {
      dispatch(addTodoAction(payload))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)