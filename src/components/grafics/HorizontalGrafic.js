import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

export const HorizontalGrafic = ({dataAge,scltxtlbl}) => {
    const [isScaleText, setIsScaleText] = useState(false);
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

        scaleText()
    }, [scaleText])
    return (
        <>
        {dataAge.length === 0 ?
            <div className="__loader_grafic">
                <img src="./assets/load/qonteo.gif" alt="spinner_loaded" />
            </div> :
            (
                <HorizontalBar data={
                    {
                        labels: dataAge.map(a => a.range),
                        datasets: [

                            {
                                label: 'Hombres',
                                backgroundColor: '#0502D3',

                                data: dataAge.map(a => a.male)
                            },
                            {
                                label: 'Mujeres',
                                backgroundColor: '#1EAEF0',
                                data: dataAge.map(a => -1 * a.female)
                            }
                        ]
                    }

                }
                    options={{
                        cornerRadius: 20,
                        title: {
                            display: true,
                            /*    text: ['TOTAL ACUMULADO PERSONAS POR GÉNERO', '', ''], */
                            fontSize: 30,
                            padding: 30,
                            fontColor: '#454545',
                            fontFamily: 'Barlow',
                            fontStyle: 400
                        },
                        maintainAspectRatio: false,
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                boxWidth: 15,
                                fontFamily: 'system-ui',
                                fontColor: 'black'
                            },
                            reverse: true
                        },



                        tooltips: {
                            titleFontSize: 20,
                            xPadding: 20,
                            yPadding: 20,
                            bodyFontSize: 15,
                            bodySpacing: 10,
                            callbacks: {
                                title: function (tooltipItem, data) {
                                    return "Edad:  " + data.labels[tooltipItem[0].index] + ' años';
                                },
                                label: function (tooltipItem, data) {
                                    var value = Math.sign(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]) === -1 ? data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * -1 : data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]


                                    return data.datasets[tooltipItem.datasetIndex].label + ': ' + value;


                                }
                            }
                        },
                        elements: {
                            line: {
                                borderWidth: 8,
                                fill: false
                            },

                        },

                        scales: {
                            xAxes: [
                                {
                                    stacked: false,
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    gridLines: {
                                        display: false
                                    }
                                },

                            ],
                            yAxes: [
                                {
                                    stacked: true,
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    gridLines: {
                                        display: false
                                    },
                                    scaleLabel: {
                                        display: isScaleText,
                                        labelString: "Edad",
                                        fontSize: 18,

                                    },
                                    position: "left",
                                }
                            ],
                        }

                    }}
                />
            )
        }
    </>
   
    )
}
