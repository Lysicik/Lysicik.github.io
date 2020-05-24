import React from 'react';
import './Main.css';

export class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        fetch('https://api.exchangeratesapi.io/latest?base=RUB')
            .then(r => r.json())
            .then(d => this.setState({ data: d.rates }))
    }

    render() {
        const { data } = this.state;
        const val = Object.keys(data);
        const content = val.map((v) => (
            <tr>
                <th>{v}</th>
                <th>{data[v]}</th>
            </tr>
        ));

        return (
            <div className="main">
                <div className="main__table">
                    <table border="1">
                        <tr>
                            <th>Валюта</th>
                            <th>Сколько можно купить на 1 рубль</th>
                        </tr>
                        {content}
                    </table>
                </div>
            </div>
        );
    }
}
