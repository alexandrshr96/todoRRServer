import React from 'react';
import { connect } from 'react-redux';
import Header from './component/Header/index';
import Main from './component/Main/index';
import Footer from './component/Footer/index';


class App extends React.Component{

  countCompleted = () => {
    const { todoItems } = this.props;
    let counter = 0;
    todoItems.forEach(item => {
      if(item.completed){
        counter++;
      }
    });

    return counter;
  }

  render(){
    return(
      <section className='todo'>
        <Header
        />
        <Main
          countCompleted={this.countCompleted}
        />
        <Footer
          countCompleted={this.countCompleted}
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoItems: state.todoItems
  }
}

export default connect(mapStateToProps)(App);
