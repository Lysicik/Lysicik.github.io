import React from 'react';
import './Convert.css';

export class Convert extends React.Component {
    constructor() {
        super();

        this.state = {
            data: {},
            key1: '',
            key2: '',
            val1: '',
            val2: '???'
        };
    }

    componentDidMount() {
        fetch('https://api.exchangeratesapi.io/latest?base=RUB')
            .then(r => r.json())
            .then(d => this.setState({ data: d.rates }))
    }

    render() {
        const { data, val1, val2 } = this.state;
        const val = Object.keys(data).map((v) => (
            <option>{v}</option>
        ));

        return (
            <div className="convert">
                <div className="convert__content">
                    <div className="convert__wrapper">
                    <select onChange={this.onKey1Change.bind(this)} className="convert__select">
                        <option disabled selected value> -- select an option -- </option>
                        {val}
                    </select>
                        <input value={val1} onChange={this.onValChange.bind(this)} className="convert__input"/>
                    </div>
                    <div className="convert__wrapper">
                    <select onChange={this.onKey2Change.bind(this)} className="convert__select">
                        <option disabled selected value> -- select an option -- </option>
                        {val}
                    </select>
                        <div className="convert__value">{val2}</div>
                    </div>
                </div>
            </div>
        );
    }

    onKey1Change(e) {
        this.setState({key1: e.target.value}, () => {this.onButtonClick()});
    }

    onKey2Change(e) {
        this.setState({key2: e.target.value}, () => {this.onButtonClick()});
    }

    onValChange(e) {
        this.setState({val1: e.target.value.replace(/\D+/g, ''), val2: '???'}, () => {this.onButtonClick()});
    }

    onButtonClick() {
        const { key1, key2, val1 } = this.state;

        if (key1 && key2 && val1) {
            fetch(`https://api.exchangeratesapi.io/latest?symbols=${key2}&base=${key1}`)
                .then(r => r.json())
                .then(({rates}) => {
                    this.setState({ val2: val1 * rates[key2] })
                });
        }
    }
}
