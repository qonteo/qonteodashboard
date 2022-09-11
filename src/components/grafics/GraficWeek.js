import React, { useCallback, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
export const GraficWeek = ({data,label,dtsetbg,optionbg,scalebg,title,labelop,legendbg='black',sexo=null,pl=0,pr=0,pb=0,pt=0}) => {
    const [graficData, setGraficData] = useState([]);
 
  
    const getData =useCallback(
        ()=>{
            if (!!sexo ) {
                if (sexo === 'male') {
                   return setGraficData(data.map(a => a.male))
                }
                if(sexo==='female'){
                    return setGraficData(data.map(a => a.female))

                }

                  return setGraficData(data.map(a => a.total)) 
            }
            
            setGraficData(data.map(a => a.total))
        },[data,sexo]
    )

   



    useEffect(() => {
        getData()
     
    }, [getData])


    
    
    
    

    return (
        <>
        {data.length === 0 ?
            <div className="__loader_grafic">
                <img src="./assets/load/qonteo.gif" alt="spinner_loaded" />
            </div> :
            (
                <Bar data={
                    {
                        labels: data.map(a => a.dow),
                        datasets: [
                            { 
                                label: `${label}`,
                                
                                backgroundColor: `${dtsetbg}`,
                                data:graficData,
                                borderWidth: 0
                            },
        
                        ],
                        borderWidth: 0
                    }
        
                }
                    options={{
                        cornerRadius: 20,
                        title: {
                            display: true,
                          /*   text: ['TOTAL VEHÍCULOS POR HORA DEL DÍA', '', ''], */
                            fontSize: 30,
                            padding: 50,
                            fontColor: `${optionbg}`,
                            fontFamily: 'Barlow',
                            fontStyle: 400,
                        },
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                boxWidth: 15,
                                fontSize: 18,
                                fontFamily: 'Barlow',
                                fontColor: `${legendbg}`
                            }
                        },
                        layout:{
                            padding:{
                                left: pl,
                                right: pr,
                                top: pt,
                                bottom: pb
                            },
                        },
        
                        tooltips: {
                            enabled: true,
                            mode: 'single',
                            callbacks: {
                                 title: function (tooltipItem, datax) {
        
                                    return `${title} ` + data[tooltipItem[0].index].dow;
                                }, 
                                label: function (tooltipItems, data) {
                                    return `${labelop} ` + tooltipItems.yLabel;
                                },
                            }
                        },
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: `${scalebg}`,
                                    fontSize: 18,
                                    fontFamily: 'Barlow',
                                    fontStyle: 600,
                                    beginAtZero: true,
        
                                },
                                gridLines: {
                                    display: false
                                }
        
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: `${scalebg}`,
                                    fontSize: 18,
                                    fontFamily: 'Barlow',
                                    fontStyle: 600,
        
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: false
                                }
                            }]
                        },
        
                    }}
                />
            )
        }
    </>
    )
}
