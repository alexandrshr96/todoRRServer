import React from 'react';
import {
  SemanticFooter,
  FooterLeft,
  FooterMiddle,
  FooterRight,
  Filters,
  FiltersItem,
  FiltersLink,
  Clearbutton
} from './style';
import { connect } from 'react-redux';
import { setVisibilityFilter as setVisibilityFilterAction,
         removeCompletedTodo as removeCompletedTodoAction,} from '../../actions/';
import { visibilityFilters } from '../../constants';


class Footer extends React.Component {

  handleSetFilter = (filter) => {
    const { setVisibilityFilter } = this.props

    setVisibilityFilter(filter);
  }

  handleRemoveCompletedTodo = () => {
    const { removeCompletedTodo} = this.props

    removeCompletedTodo();
  }

  updateCounter = () => {
    const { todoItems } = this.props
    let counter = 0;

    todoItems.forEach(item => {
      if(!item.completed){
        counter++;
      }
    });

    return counter;
  }

  createClearButton = () => {
    const { countCompleted } = this.props

    if(countCompleted() > 0){
      return <Clearbutton
        className="clear-btn"
        onClick={this.handleRemoveCompletedTodo}
      >Clear completed</Clearbutton>
    }
  }

  render(){
    const { lcStore, filters } = this.props
    let FooterWrapper = SemanticFooter(lcStore);//lcStore.getItem().length
    let button = this.createClearButton();
    const { all, active, completed } = visibilityFilters;
    const linksNameFilter = [all, active, completed];
    const linksName = Object.keys(visibilityFilters);

    return(
      <FooterWrapper className="footer">
        <FooterLeft className="footer__left">
          <span className="todo-count">
            <strong>{this.updateCounter()}</strong>
            <span> items left</span>
          </span>
        </FooterLeft>
        <FooterMiddle className="footer__middle">
          <Filters className="filters">
            {linksNameFilter.map(Button =>
              <FiltersItem key={linksNameFilter.indexOf(Button)} className="filters__item">
                <FiltersLink
                  href="#"
                  className='filters__link'
                  onClick={() => this.handleSetFilter(Button)}
                  style={filters === Button ? {border:'1px solid rgba(175, 47, 47, 0.2)'}
                    : {border:'1px solid transparent'}}
                >{linksName[linksNameFilter.indexOf(Button)]}</FiltersLink>
              </FiltersItem>
            )}
          </Filters>
        </FooterMiddle>
        <FooterRight className="footer__right">
          {button}
        </FooterRight>
      </FooterWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoItems: state.todoItems,
    filters: state.filters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setVisibilityFilter: payload => {
      dispatch(setVisibilityFilterAction(payload))
    },
    removeCompletedTodo: payload => {
      dispatch(removeCompletedTodoAction(payload))
    },
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Footer)
