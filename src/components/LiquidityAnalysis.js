// @flow
import * as React from 'react';
import {ScatterplotChart} from 'react-easy-chart';
import ToolTip from './ToolTip';

type State ={
  width:number,
  height:number,
  dataDisplay:any,
  showToolTip:boolean,
  top:string,
  left:string,
  name:string,
  x:string,
  y:string,
  z:string

};
type Props ={updateData:any};

class LiquidityAnalysis extends React.Component<Props, State> {
  constructor(props:any) {
    super(props);
    this.state = {
      dataDisplay: '',
      showToolTip: false,
      width:900,
      height:500,
      top:'',
      left:'',
      name:'',
      x:'',
      y:'',
      z:''
    } ;
    (this:any).mouseOverHandler = this.mouseOverHandler.bind(this);
    (this:any).mouseOutHandler  = this.mouseOutHandler.bind(this);
    (this:any).mouseMoveHandler = this.mouseMoveHandler.bind(this);
    (this:any).handleResize     = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
      width: window.innerWidth*.65,
      height: window.innerWidth*0.35
    });
 }

  mouseOverHandler(d:Object, e:Object) {
      this.setState({
        dataDisplay: '',
        showToolTip: true,
        top: `100px`,
        left: `300px`,
        y: d.y,
        x: d.x ,
        z: d.z,
        name:d.name});
    }

  mouseMoveHandler(e:Object) {
    if (this.state.showToolTip) {
      this.setState({ top: `100px`, left: `300px` });
    }
  }

  mouseOutHandler() {
    this.setState({ showToolTip: false });
  }

  createTooltip() {
    if (this.state.showToolTip) {
      return (
        <ToolTip
          top={this.state.top}
          left={this.state.left}
        >
          Name: {this.state.name}, M_cap: {this.state.x}, Vlm: {this.state.y}, Price Change: {this.state.z}%
        </ToolTip>
      );
    }
    return false;
  }

  render() {
    let chartData = this.props.updateData.map(data=>{
      return {
        type: data.rank,
        x: data.quotes.USD.market_cap,
        y: data.quotes.USD.volume_24h,
        z: data.quotes.USD.percent_change_24h,
        name:data.name
      };
    });
    return (
      <div className="container-fluid">
      <h4 className="title-text">Market Capitalization Vs Volume (24h)</h4>
      <div className="text-center">
        <ScatterplotChart
           data={chartData}
           axes
           axisLabels={{x: 'Market Capitalization---->', y: 'Volume (24h)---->'}}
           width={this.state.width}
           height={this.state.height}
           style={{ '.label': { fill: 'black' } }}
           mouseOverHandler={this.mouseOverHandler}
           mouseOutHandler={this.mouseOutHandler}
           mouseMoveHandler={this.mouseMoveHandler}
         />
        <br />
       {this.createTooltip()}
      </div>
      </div>
    );
  }
}

export default LiquidityAnalysis;
