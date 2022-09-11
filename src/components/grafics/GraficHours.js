import React, { useCallback, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
export const GraficHours = React.memo(({ data, label, dtsetbg, optionbg, scalebg, title, labelop, legendbg = 'black', sexo, scltxtlbl, pl = 0, pr = 0, pb = 0, pt = 0 }) => {
    const [graficData, setGraficData] = useState([]);
    const [isScaleText, setIsScaleText] = useState(false);
  
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

    const scaleText=useCallback(
        () => {
            
            if (!!scltxtlbl) {
                return setIsScaleText(true)
            }
            setIsScaleText(false)
            
        },
        [setIsScaleText,scltxtlbl]
    )



    useEffect(() => {
        getData()
        scaleText()
    }, [getData,scaleText])



    return (
        <>
            {data.length === 0 ?
                <div className="__loader_grafic">
                    <img src="./assets/load/qonteo.gif" alt="spinner_loaded" />
                </div> :
                (
                    <Bar data={

                        {
            
                            labels: data.map(a => a.hour),
                            datasets: [
                                {
                                    label: `${label}`,
            
                                    backgroundColor: `${dtsetbg}`,
                                    data: graficData,
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
            
                                fontSize: 30,
                                fontColor: `${optionbg}`,
                                fontFamily: 'Barlow',
                                fontStyle: 400,
                            },
                                layout:{
                                        padding:{
                                            left: pl,
                                            right: pr,
                                            top: pt,
                                            bottom: pb
                                        },
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
                            tooltips: {
                                enabled: true,
                                mode: 'single',
                                callbacks: {
                                    title: function (tooltipItem, datax) {
            
                                        return `${title}` + data[tooltipItem[0].index].time;
                                    },
                                    label: function (tooltipItems, data) {
                                        return `${labelop}` + tooltipItems.yLabel;
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
                                    ,
                                    scaleLabel: {
                                        display: isScaleText,
                                        labelString: `${scltxtlbl}`,
                                        fontSize: 18,
            
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
})
