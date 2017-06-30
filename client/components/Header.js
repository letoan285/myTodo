import React from 'react';


export default class Header extends React.Component {

  render (){
    return (
      <nav className="navbar navbar-default">
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
              <li><a href="/">Home</a></li>
              <li><a href="#">My Todo</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
         </div>
      </nav>

    );
  }
}
