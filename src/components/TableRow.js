// @flow
import * as React from 'react';

const TableRow = ({singleData}:Object) =>(
      <tr>
        <td>{singleData.rank}</td>
        <td>{singleData.name}</td>
        <td>${singleData.quotes.USD.price}</td>
        <td>{singleData.quotes.USD.percent_change_24h}%</td>
        <td>${singleData.quotes.USD.market_cap}</td>
        <td>${singleData.quotes.USD.volume_24h}</td>
      </tr>
  )

export default TableRow;
