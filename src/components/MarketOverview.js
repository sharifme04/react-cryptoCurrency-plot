// @flow
import * as React from 'react';
import TableRow from './TableRow';

type State ={/**/};
type Props ={updateData:any};

class MarketOverview extends React.Component<Props, State> {
  render() {
        let tableData = this.props.updateData.map(
          singleData => <TableRow singleData={singleData} key={singleData.id}/>
        );
    return (
      <div className="container-fluid">
      <h3 className="title-text">Market Overview</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>Price Change (24h)</th>
            <th>Market Cap</th>
            <th> Volume (24h)</th>
          </tr>
        </thead>
        <tbody>
           {tableData}
        </tbody>
      </table>
      </div>
    );
  }
}

export default MarketOverview;
