import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "./FinanceChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function FinanceChart(props) {
    const [chartdata, setData] = useState({});

    useEffect(() => {
        fetch('http://localhost:9000/clientdata/currentworth/'+props.user+'')
        .then(res => res.json())
        .then(setData);
    }, [props.user]);

    const data1 = {
        labels: ['Income', 'Expenditure', 'EMI', 'Equity additions', 'MF SIP', 'Crypto additions', 'Insurance'],
        datasets: [{
            label: 'Income/Expense Chart',
            data: [chartdata.income, chartdata.expenditure, chartdata.emi, chartdata.equityadditions, chartdata.mfsip, chartdata.crypto, +(Math.round(chartdata.insurance/12 + "e+2")  + "e-2")],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)',
                'rgb(54, 162, 235)',
                'rgb(0, 0, 255)',
                'rgb(127, 0, 255)'
            ],
            hoverOffset: 6
        },],
    };

    var stable = chartdata.equityportfolio/1 + chartdata.cryptoportfolio/1 + chartdata.goldportfolio/1 + chartdata.estateportfolio/1 + chartdata.liquidportfolio/1 + chartdata.saving/1 + chartdata.fixeddeposit/1 + chartdata.alternate/1;
    var growth = chartdata.mutualportfolio/1;
    var goal = chartdata.financialgoals/1 + chartdata.retirementgoal/1;

    const data2 = {
        labels: ['Stable', 'Growth'],
        datasets: [{
            label: 'Stable vs Growth Chart',
            data: [stable, growth],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)'
            ],
            hoverOffset: 6
        },],
    };
    const data3 = {
        labels: ['Equity', 'Crypto', 'Gold', 'Real Estate', 'Liquid Assets', 'Saving Balance', 'Fixed Deposit', 'Alternate Assets'],
        datasets: [{
            label: 'Stable Chart',
            data: [chartdata.equityportfolio, chartdata.cryptoportfolio, chartdata.goldportfolio, chartdata.estateportfolio, chartdata.liquidportfolio, chartdata.saving, chartdata.fixeddeposit, chartdata.alternate],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)',
                'rgb(54, 162, 235)',
                'rgb(0, 0, 255)',
                'rgb(127, 0, 255)'
            ],
            hoverOffset: 6
        },],
    };
    const data4 = {
        labels: ['Mutual Funds', 'Current Financial Goal', 'Retirement Portfolio'],
        datasets: [{
            label: 'Financial Assets/Goals Chart',
            data: [chartdata.mutualportfolio, chartdata.financialgoals, chartdata.retirementgoal],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 6
        },],
    };

    return (
        <div className="maindiv">
        <h3>Income/Expense Chart</h3>
            <div className="row">
            <div className="chart col">
                <Pie data={data1} options={
                    {
                        plugins: {
                            legend: {
                                position: "left"
                            }
                        },
                        layout: {
                            padding: {
                                right: 10
                            }
                        }
                    }
                }/>
            </div>
            <div className="col tbl">
            <table class="table table-hover table-striped col">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Income/Expense</th>
                <th scope="col">Monthly Values ₹</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Income</td>
                <td>{chartdata.income}</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Expenditure</td>
                <td>{chartdata.expenditure}</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>EMI</td>
                <td>{chartdata.emi}</td>
                </tr>
                <tr>
                <th scope="row">4</th>
                <td>Equity additions</td>
                <td>{chartdata.equityadditions}</td>
                </tr>
                <tr>
                <th scope="row">5</th>
                <td>MF SIP</td>
                <td>{chartdata.mfsip}</td>
                </tr>
                <tr>
                <th scope="row">6</th>
                <td>Crypto additions</td>
                <td>{chartdata.crypto}</td>
                </tr>
                <tr>
                <th scope="row">7</th>
                <td>Insurance</td>
                <td>{+(Math.round(chartdata.insurance/12 + "e+2")  + "e-2")}</td>
                </tr>
            </tbody>
            </table>
            </div>
            </div>
            <h3>Financial Assets/Goals Charts</h3>
            <div className="smchart row">
                <div className="col">
                <Pie data={data2} options={
                    {
                        plugins: {
                            legend: {
                                position: "left"
                            }
                        },
                        layout: {
                            padding: {
                                right: 10
                            }
                        }
                    }
                }/>
                </div>
                <div className="col tbl">
                <table class="table table-hover table-striped col">
                <tbody>
                    <tr>
                    <td>Stable</td>
                    <td>{(stable/(stable+growth))*100}%</td>
                    </tr>
                    <tr>
                    <td>Growth</td>
                    <td>{(growth/(stable+growth))*100}%</td>
                    </tr>
                </tbody>
                </table>
                </div>
            </div>
            <div className="row">
                <div className="chart col">
                    <Pie data={data3} options={
                        {
                            plugins: {
                                legend: {
                                    position: "left"
                                }
                            },
                            layout: {
                                padding: {
                                    right: 10
                                }
                            }
                        }
                    }/>
                </div>
                <div className="chart col">
                    <Pie data={data4} options={
                        {
                            plugins: {
                                legend: {
                                    position: "right"
                                }
                            },
                            layout: {
                                padding: {
                                    left: 10
                                }
                            }
                        }
                    }/>
                </div>
                <div className="tbl" style={{width: "50%"}}>
                <table class="table table-hover table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Assets/Goals</th>
                    <th scope="col">Monthly Values ₹</th>
                    </tr>
                </thead>
                <thead style={{"background-color": "lightgrey"}}>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">Stable</th>
                    <th scope="col">{stable}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Equity</td>
                    <td>{chartdata.equityportfolio}</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Crypto</td>
                    <td>{chartdata.cryptoportfolio}</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Gold</td>
                    <td>{chartdata.goldportfolio}</td>
                    </tr>
                    <tr>
                    <th scope="row">4</th>
                    <td>Real Estate</td>
                    <td>{chartdata.estateportfolio}</td>
                    </tr>
                    <tr>
                    <th scope="row">5</th>
                    <td>Liquid Assets</td>
                    <td>{chartdata.liquidportfolio}</td>
                    </tr>
                    <tr>
                    <th scope="row">6</th>
                    <td>Saving Balance</td>
                    <td>{chartdata.saving}</td>
                    </tr>
                    <tr>
                    <th scope="row">7</th>
                    <td>Fixed Deposit</td>
                    <td>{chartdata.fixeddeposit}</td>
                    </tr>
                    <tr>
                    <th scope="row">8</th>
                    <td>Alternate Assets</td>
                    <td>{chartdata.alternate}</td>
                    </tr>
                </tbody>
                <thead style={{"background-color": "lightgrey"}}>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">Growth</th>
                    <th scope="col">{growth}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">9</th>
                    <td>Mutual Funds</td>
                    <td>{chartdata.mutualportfolio}</td>
                    </tr>
                </tbody>
                <thead style={{"background-color": "lightgrey"}}>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">Goal</th>
                    <th scope="col">{goal}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">10</th>
                    <td>Current Financial Goal</td>
                    <td>{chartdata.financialgoals}</td>
                    </tr>
                    <tr>
                    <th scope="row">11</th>
                    <td>Retirement Portfolio</td>
                    <td>{chartdata.retirementgoal}</td>
                    </tr>
                </tbody>
                <thead style={{"background-color": "lightgrey"}}>
                <tr>
                <th scope="col"></th>
                <th scope="col">Net Worth</th>
                <th scope="col">{stable+growth}</th>
                </tr>
            </thead>
                </table>
                </div>
            </div>
        </div>
    );
}

export default FinanceChart;