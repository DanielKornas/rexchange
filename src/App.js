import React, {Component} from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import classNames from 'classnames';
import './App.nested.css';

export default class App extends Component {

  constructor() {
     super();
     this.state = { chosenCurrency: 'USD',
                    country: 'USA',
                    finalAmount: 0,
                    testClass: true,
                  };
  }

  componentDidMount () {
    this.getRate();
    this.getFlag();
  }

  getRate(){
    const chosenCurrency = this.state.chosenCurrency;
    fetch('http://api.fixer.io/latest?base=PLN')
      .then(response => response.json())
      .then((currency)=> {
        console.log(currency)
        console.log(1/currency.rates[chosenCurrency]);
        this.setState({
          rate: 1/currency.rates[chosenCurrency],
          baseFlague: 'PLN'
        });
      });
  }

  getFlag(){
      console.log(this.state.chosenCurrency)
    axios.get(`https://restcountries.eu/rest/v2/alpha/${this.state.country}`)
      .then((response)=>{
        this.setState({
          flag: response.data.flag,
        });
        console.log(this.state.flag);
      })
      .catch((error)=>{
        console.log(error)
      });
  };

  calculateMoney(calculate){
    const finalAmount= this.state.rate* calculate.target.value;
    console.log(finalAmount);

    this.setState({
      finalAmount: finalAmount,
    });
  };

  render() {

    const classNamesExample = classNames({
      'testClass': this.state.tesClass,
    });

    return (
      <div className="container">
        <navbar></navbar>
        <header></header>
          <div className={`country ${classNamesExample}`}>
            Kursy z dnia  <Moment format="YYYY/MM/DD">{this.props.dateToFormat}</Moment>
            <div className="country__flags"><img className="country__flag" src={this.state.flag} alt={this.state.flag} /></div>
            <h2 className="country__chosen-currency">
              <span ></span>
            </h2>
            <input className="country__amount center-block" type="number" onChange={this.calculateMoney.bind(this)} />
            <h2 className="country__final-amount">
              <span>{this.state.finalAmount}</span>
            </h2>
          </div>
      </div>
    );
  }
}
