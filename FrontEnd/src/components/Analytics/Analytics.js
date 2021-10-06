import React, { useEffect, useState } from 'react';

import axios from 'axios';

import PieChart from "./PieChart/PieChart";

const Analytics = () => {

    const url = "http://localhost:80";
    const [analyticsData, setAnalyticsData] = useState({});

    const formatData = (result) => {
        console.log("result",result);
        const { createdTodos,completedTodos } = result;
        // create 1 for completedTodos is pending.
        const groups = createdTodos.reduce((groups, createdTodos) => {
            const date = createdTodos.created_at.split('T')[0];
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(createdTodos);
            return groups;
        }, {});

        // Edit: to add it in the array format instead
        const datewiseTasks = Object.keys(groups).map((created_at) => {
            return {
                created_at,
                tasks: groups[created_at]
            };
        });

        
        const series = [];
        const labels = [];
        
        datewiseTasks.forEach((data)=>{
            labels.push(data.created_at);
            series.push(data.tasks.length)
        })

        setAnalyticsData({ series: series, labels: labels });
        console.log("datewiseTasks : ",datewiseTasks);
        console.log("series : ",series);
        console.log("labels : ",labels);
        
        // // for completedTodos. - haven't reuse code due to lack of time.
        // const groups2 = completedTodos.reduce((groups, createdTodos) => {
        //     const date = createdTodos.created_at.split('T')[0];
        //     if (!groups[date]) {
        //         groups[date] = [];
        //     }
        //     groups[date].push(createdTodos);
        //     return groups;
        // }, {});

        // // Edit: to add it in the array format instead
        // const datewiseTasks2 = Object.keys(groups2).map((created_at) => {
        //     return {
        //         created_at,
        //         tasks: groups2[created_at]
        //     };
        // });

        
        // const series2 = [];
        // const labels2 = [];
        
        // datewiseTasks2.forEach((data)=>{
        //     labels2.push(data.created_at);
        //     series2.push(data.tasks.length)
        // })

        // setAnalyticsData2({ series: series2, labels: labels2 });
        // console.log("datewiseTasks : ",datewiseTasks2,series2,labels2);
    }

    useEffect(() => {
        axios
            .post(`${url}/api/chart/todo-analytics`)
            .then((res) => {
                const { result } = res.data;
                // setChartData(result);
                formatData(result);
            })
            .catch((err) => {
                console.log(err, err.response);
            });
    }, []);
    // chartData.createdTodos

    return (
        <>
            <PieChart data={analyticsData} />
            {/* <PieChart data={analyticsData} />  for completedTodos*/}
        </>
    )
}

export default Analytics;