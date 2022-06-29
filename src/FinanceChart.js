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
            data: [chartdata.income, chartdata.expenditure, chartdata.emi, chartdata.equityadditions, chartdata.mfsip, chartdata.crypto, chartdata.insurance],
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

    const data2 = {
        labels: ['Equity', 'Mutual Funds', 'Crypto', 'Gold', 'Real Estate', 'Liquid Assets', 'Saving Balance', 'Fixed Deposit', 'Alternate Assets', 'Current Financial Goal', 'Retirement Portfolio'],
        datasets: [{
            label: 'Financial Assets/Goals Chart',
            data: [chartdata.equityportfolio, chartdata.mutualportfolio, chartdata.cryptoportfolio, chartdata.goldportfolio, chartdata.estateportfolio, chartdata.liquidportfolio, chartdata.saving, chartdata.fixeddeposit, chartdata.alternate, chartdata.financialgoals, chartdata.retirementgoal],
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

    return (
        <div className="maindiv row">
            <div className="chart col">
                <h3>Income/Expense Chart</h3>
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
            <div className="chart col">
                <h3>Financial Assets/Goals Chart</h3>
                <Pie data={data2} options={
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
            <div className="table-responsive row">
                <table class="table table-hover table-striped col">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Income/Expense</th>
                    <th scope="col">Monthly Values</th>
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
                    <td>{chartdata.insurance}</td>
                    </tr>
                </tbody>
                </table>
                <table class="table table-hover table-striped col">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Assets/Goals</th>
                    <th scope="col">Monthly Values</th>
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
                    <td>Mutual Funds</td>
                    <td>{chartdata.mutualportfolio}</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Crypto</td>
                    <td>{chartdata.cryptoportfolio}</td>
                    </tr>
                    <tr>
                    <th scope="row">4</th>
                    <td>Gold</td>
                    <td>{chartdata.goldportfolio}</td>
                    </tr>
                    <tr>
                    <th scope="row">5</th>
                    <td>Real Estate</td>
                    <td>{chartdata.estateportfolio}</td>
                    </tr>
                    <tr>
                    <th scope="row">6</th>
                    <td>Liquid Assets</td>
                    <td>{chartdata.liquidportfolio}</td>
                    </tr>
                    <tr>
                    <th scope="row">7</th>
                    <td>Saving Balance</td>
                    <td>{chartdata.saving}</td>
                    </tr>
                    <tr>
                    <th scope="row">8</th>
                    <td>Fixed Deposit</td>
                    <td>{chartdata.fixeddeposit}</td>
                    </tr>
                    <tr>
                    <th scope="row">9</th>
                    <td>Alternate Assets</td>
                    <td>{chartdata.alternate}</td>
                    </tr>
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
                </table>
            </div>
        </div>
    );
}

export default FinanceChart;