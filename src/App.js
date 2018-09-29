import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import MarketOverview from './components/MarketOverview';
import LiquidityAnalysis from './components/LiquidityAnalysis';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      value: 100,
      data: ""
    } ;
    this.selectLimit = this.selectLimit.bind(this);
  }

  componentDidMount() {
     fetch("https://api.coinmarketcap.com/v2/ticker/")
       .then(res => res.json())
       .then(
         (result) => {
           this.setState({
             isLoaded: true,
             data: result.data
           });
         },
         (error) => {
           this.setState({
             isLoaded: true,
             error
           });
         }
       )
   }
selectLimit(event) {
  this.setState({value: event.target.value});
}

  render() {
    let result = [this.state.data];
    let updateData = Object.values(result[0])
                      .sort((a, b)=>(a.rank - b.rank))
                      .slice(0, this.state.value);
    return (
        <div>
           <nav className="navbar navbar-inverse">
           <div className="container-fluid">
              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                 <li><Link to="/">Market Overview</Link></li>
                   <li>
                     <div className="form-group">
                       <select className="form-control" value={this.state.value} onChange={this.selectLimit}>
                         <option value="10" >10</option>
                         <option value="50" >50</option>
                         <option value="100">all (maximum of [100])</option>
                       </select>
                     </div>
                   </li>
                   <li><Link to="/liquidity">Liquidity Analysis</Link></li>
                </ul>
              </div>
           </div>
           </nav>
          <Switch>
            <Route
            exact path="/"
            render={routeProps => <MarketOverview  updateData={updateData} />}
            />
            <Route
            exact
            path="/liquidity"
            render={routeProps => <LiquidityAnalysis updateData={updateData} />}
            />
          </Switch>
        </div>
    );
  }
}

export default App;
