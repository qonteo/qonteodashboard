import React, { useRef, useEffect, memo } from 'react'
import * as d3 from 'd3'
import moment from 'moment'
export const GraficGrillaDesktop = memo(({data}) => {

    const ref = useRef()

    useEffect(() => {

            tablehours(data)
        
            return ()=>{
                 validarref()
            }
    }, [data])

    const validarref=()=>{
        ref.current.querySelector('svg')!==null && ref.current.querySelector('svg').remove()
    }

    const tablehours = (data) => {


        const dias_semana = [];
        for (let i = 6; i >= 0; i--) {
            dias_semana.push(moment().subtract(i, 'days').format("DD/MM"))
        }



        if (data.length > 0) {
            const margin = { top: 30, right: 200, bottom: 200, left: 50 },
                width = 900 - margin.left - margin.right,
                height = 950 - margin.top - margin.bottom;


            const svg = d3.select(ref.current)
                .attr("align", "center")

                .append("svg")
                .attr("width", 700)
                .attr("height", 750)
                .append("g")

                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");



            const myVars = ["23:00", "22:00", "21:00", "20:00", "19:00", "18:00", "17:00", "16:00", "15:00", "14:00", "13:00", "12:00", "11:00", "10:00", "09:00", "08:00", "07:00", "06:00", "05:00", "04:00", "03:00", "02:00", "01:00", "00:00"];

            const x = d3.scaleBand()
                .range([0, width])
                .domain(dias_semana)
                .padding(0.01);
            svg.append("g")
                .attr("transform", "translate(0, 0)")
                .call(d3.axisTop(x))


            // Build X scales and axis:
            const y = d3.scaleBand()
                .range([height, 0])
                .domain(myVars)
                .padding(0.01);
            svg.append("g")
                .call(d3.axisLeft(y));
            const range = data.map(r => r.total)
            // Build color scale
            const myColor = d3.scaleQuantile()
                .range(['#5BCDFA', '#5EAFFE', '#4782F5', '#3450EF', '#0502D3'])
                //										  .range(["#63be7b", "#f8696b"])
                .domain(range)
            const rectContainer = svg.selectAll()
                .data(data, function (d) { return d.date + ':' + d.time; })
                .enter().append("g")
                .attr("transform", function (d) {
                    let hora = d.time.replace('h', ':00');

                    return "translate(" + (x(d.date)) + "," + (y(hora)) + ")"
                });

            /* svg.append("text")
                .attr("x", 525)
                .attr("y", 720)
                .attr("text-anchor", "left")
                .style("font-size", "30px")
                .style("font-family", "Barlow")
                .text("Total"); */

            rectContainer.append("rect")
                .attr("width", x.bandwidth())
                .attr("height", y.bandwidth())
                .style("fill", function (d) { return myColor(d.total) })

            rectContainer.append("text")
            .attr("x", (x.bandwidth()) / 2)
            .attr("y", ((y.bandwidth()) / 2) + 4)
            .text(function (d) { return d.total })
            .style("font-family", "Barlow")
            .style("font-size", "8pt")
            .style('fill', 'white')
            .style("text-anchor", "middle")

        }



    }
    return (
        <div className="mt text-center"
        ref={ref}
    ></div>
    )
}
)