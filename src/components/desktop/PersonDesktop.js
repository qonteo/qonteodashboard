import React, { useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { getPersondata, setHoursPersons, setHoursPersonsFemale, setHoursPersonsMale, setWeekPersons, setWeekPersonsFemale, setWeekPersonsMale,setMonthPerson,setMonthPersonMale,setMonthPersonFemale, setGraficRangeAges } from '../../actions/person';
import { BoxPrimary } from '../boxes/BoxPrimary';
import { BoxSecondary } from '../boxes/BoxSecondary';
import { BoxSex } from '../boxes/BoxSex';
import { formatNumber } from '../../helpers/calculo';
import { GraficHours } from '../grafics/GraficHours';
import { GraficWeekLine } from '../grafics/GraficWeekLine';
import { GraficMonth } from '../grafics/GraficMonth';
import { GraficGrillaDesktop } from '../grafics/GrillaDesktop';
import { setEndDateAgePerson, setEndDateHourFemalePerson, setEndDateHourMalePerson, setEndDateHourPerson, setEndDateMonthFemalePerson, setEndDateMonthMalePerson, setEndDateMonthPerson, setEndDateWeekFemalePerson, setEndDateWeekMalePerson, setEndDateWeekPerson, setStartDateAgePerson, setStartDateHourFemalePerson, setStartDateHourMalePerson, setStartDateHourPerson, setStartDateMonthFemalePerson, setStartDateMonthMalePerson, setStartDateMonthPerson, setStartDateWeekFemalePerson, setStartDateWeekMalePerson, setStartDateWeekPerson } from '../../actions/date';
import { DateChange } from '../date/DateChange';
import { DateChangeMonth } from '../date/DateChangeMonth';
import { HorizontalGrafic } from '../grafics/HorizontalGrafic';
import { downloadHeatMapImage, downloadImage, downloadImageDesktop, downloadPdfHeatMap, exportExcel, exportPdf } from '../../helpers/exports';

const currentDate = moment().format("YYYY-MM-DD");
const initDate = moment('2020-07-01').format("YYYY-MM-DD");
export const PersonDesktop = () => {
    const dispatch = useDispatch();
    const { isMenu } = useSelector(state => state.ui);
    const {
        hoursPerson,
        hoursPersonFemale,
        hoursPersonMale,
        weekPerson,
        weekPersonMale,
        weekPersonFemale,
        monthPerson,
        monthPersonFemale,
        monthPersonMale,
        heatmapPerson,
        heatmapRangePerson,
        ageRangePerson,
        totalTodayPerson,
        totalTodayPersonFemale,
        totalTodayPersonMale,
        todayPercentPerson,
        totalYesterdayPerson,
        totalYesterdayFemalePerson,
        totalYesterdayMalePerson,
        maxHourPerson,
        maxHourFemalePerson,
        maxHourMalePerson,
        maxWeekPerson,
        maxWeekFemalePerson,
        maxWeekMalePerson,
        maxMonthPerson,
        maxMonthMalePerson,
        maxMonthFemalePerson,
        totalWeekPerson,
        totalWeekFemale,
        totalWeekMale,
        weekPercentPerson,
        totalMonthPerson,
        totalMonthFemalePerson,
        totalMonthMalePerson
    } = useSelector(state => state.person);

    const {
        dateStartHourPerson, dateEndHourPerson,
        dateStartHourMalePerson, dateEndHourMalePerson,
        dateStartHourFemalePerson, dateEndHourFemalePerson,
        dateStartWeekPerson, dateEndWeekPerson,
        dateStartWeekMalePerson, dateEndWeekMalePerson,
        dateStartWeekFemalePerson, dateEndWeekFemalePerson,
        dateStartMonthPerson,dateEndMonthPerson,
        dateStartMonthMalePerson,dateEndMonthMalePerson,
        dateStartMonthFemalePerson,dateEndMonthFemalePerson,
        dateStartAgePerson, dateEndAgePerson
    } = useSelector(state => state.date);

    


    useEffect(() => {
        dispatch(getPersondata());
    }, [dispatch])

    return (
        <div className={`_d__grid ${!isMenu ? "active" : ""}`}>
            <div>
            </div>
            <div className="contenedor contet_index ">
                <div className="title __desktop mb mt">
                    <span className="text-primary">CO.PMXCO.BOG.A01</span>
                </div>
                <h2 className="mt __title_">Personas</h2>

                <div className="__grilla_4 __padding_especial">
                   {/*  <BoxPrimary date={currentDate} cantidad={totalTodayPerson} text1="Personas en total" text2="hoy" /> */}
                    <BoxSecondary ispercent={true} percent={todayPercentPerson} count={totalYesterdayPerson} text1="ayer" text2="Personas en total" />
                    <BoxSecondary ispercent={true} percent={weekPercentPerson} count={totalWeekPerson} text1="Esta semana" text2="Personas en total" />
                    <BoxSecondary count={totalMonthPerson} text1="Total" text2="Personas en total" initDate={initDate} endDate={currentDate} />
                </div>

                <div className="__grilla_4 mt">
                  {/*   <BoxSex total={totalTodayPerson} count={totalTodayPersonMale}
                        color="white" textsex="hombres"
                        txttop="HOY"
                    /> */}
                    <BoxSex total={totalYesterdayPerson}
                        count={totalYesterdayMalePerson} bg="white"
                        textsex="hombres" txttop="AYER" />
                    <BoxSex total={totalWeekPerson}
                        count={totalWeekMale}
                        bg="white" textsex="hombres"
                        txttop="ESTA SEMANA"
                    />
                    <BoxSex txttop="TOTAL" total={totalMonthPerson} count={totalMonthMalePerson} bg="white" textsex="hombres" />
                </div>


                <div className="__grilla_4 mt">
                 {/*    <BoxSex txttop="HOY" total={totalTodayPerson} count={totalTodayPersonFemale} bg="secondario" color="white" textsex="Mujeres" sex="woman" /> */}
                    <BoxSex txttop="AYER" total={totalYesterdayPerson} count={totalYesterdayFemalePerson} bg="white" textsex="Mujeres" sex="woman" />
                    <BoxSex txttop="ESTA SEMANA" total={totalWeekPerson} count={totalWeekFemale} bg="white" textsex="Mujeres" sex="woman" />
                    <BoxSex txttop="TOTAL" total={totalMonthPerson} count={totalMonthFemalePerson} bg="white" textsex="Mujeres" sex="woman" />
                </div>

                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de personas por hora del día</h2>

                <div className="__detail_top_date">
                    <div className="__text_top">Hora más transitada: {maxHourPerson.hour} con {formatNumber(maxHourPerson.total)} personas</div>
                    <DateChange startDate={moment('2020-07-01').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setHoursPersons}
                        methodStart={setStartDateHourPerson}
                        methodEnd={setEndDateHourPerson}
                        flexColumn={false}
                    />
                
                </div>

                <div id="graficHours" className="exportImgCanvas chart-containerv2 mt bg-yellow w-100">

                    <GraficHours data={hoursPerson} label="Total de Personas" dtsetbg="#0502D3"
                        optionbg="#454545"
                        legendbg="#454545"
                        title=" Hora:"
                        labelop=" Total de Personas:"
                        scltxtlbl="Cantidad de Personas"
                        scalebg="#0502D3" />
                    <GraficHours data={hoursPerson} label="Total de Personas" dtsetbg="#0502D3"
                        optionbg="#454545"
                        legendbg="#454545"
                        title=" Hora:"
                        labelop=" Total de Personas:"
                        scltxtlbl="Cantidad de Personas"
                        scalebg="#0502D3"
                        pl={50}
                        pr={50}
                        pt={200}
                        pb={30}
                    />
                    <div className="title_todayhoras __export_data">
                          <img onClick={() => exportExcel('hour', dateStartHourPerson, dateEndHourPerson, 'DE-PERSONAS-POR-HORA-DEL-DIA')} src="./assets/iconos/downloadcsv.svg" alt="export-svg" />
                        <img onClick={() => exportPdf('graficHours', dateStartHourPerson, dateEndHourPerson,
                            'TOTAL DE PERSONAS POR HORA DEL DÍA',
                            `HORA MÁS TRANSITADA: ${maxHourPerson.hour} CON ${formatNumber(maxHourPerson.total)} PERSONAS`)} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                        <img onClick={() => downloadImageDesktop('graficHours', 'TOTAL DE PERSONAS POR HORA DEL DÍA', dateStartHourPerson, dateEndHourPerson, '#fee700', 380,
                            'hour', 'P', `HORA MÁS TRANSITADA: ${maxHourPerson.hour} CON ${formatNumber(maxHourPerson.total)} PERSONAS`)} src="./assets/iconos/share.svg" alt="share" />
                    </div>
                </div>


                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de hombres por hora del día</h2>
                <div className="__detail_top_date">
                    <div className="__text_top">Hora más transitada: {maxHourMalePerson.hour} con {formatNumber(maxHourMalePerson.total)} hombres</div>
                    <DateChange startDate={moment('2020-07-01').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setHoursPersonsMale}
                        methodStart={setStartDateHourMalePerson}
                        methodEnd={setEndDateHourMalePerson}
                        flexColumn={false}
                    />
                </div>


                <div id="graficHoursMale" className="exportImgCanvas chart-containerv2 mt  w-100">

                    <GraficHours data={hoursPersonMale} label="Total de Hombres" dtsetbg="#0502D3"
                        optionbg="#454545"
                        legendbg="#454545"
                        title=" Hora: "
                        labelop=" Total de Hombres:"
                        scalebg="#0502D3"
                        sexo="male"
                        scltxtlbl="Cantidad de Hombres"
                    />
                    <GraficHours data={hoursPersonMale} label="Total de Hombres" dtsetbg="#0502D3"
                        optionbg="#454545"
                        legendbg="#454545"
                        title=" Hora: "
                        labelop=" Total de Hombres:"
                        scalebg="#0502D3"
                        sexo="male"
                        scltxtlbl="Cantidad de Hombres"
                        pl={50}
                        pr={50}
                        pt={200}
                        pb={30}
                    />

                    <div className="title_todayhoras __export_data">
                           <img onClick={() => exportExcel('hour', dateStartHourMalePerson, dateEndHourMalePerson, 'DE-HOMBRES-POR-HORA-DEL-DIA')} src="./assets/iconos/downloadcsv.svg" alt="export-svg" />
                        <img onClick={() => exportPdf('graficHoursMale', dateStartHourMalePerson, dateEndHourMalePerson,
                            'TOTAL DE HOMBRES POR HORA DEL DÍA',
                            `HORA MÁS TRANSITADA: ${maxHourMalePerson.hour} CON ${formatNumber(maxHourMalePerson.total)} PERSONAS`)} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                        <img onClick={() => downloadImageDesktop('graficHoursMale', 'TOTAL DE HOMBRES POR HORA DEL DÍA', dateStartHourMalePerson, dateEndHourMalePerson, '#fff', 380,
                            'hour', 'P', `HORA MÁS TRANSITADA: ${maxHourMalePerson.hour} CON ${formatNumber(maxHourMalePerson.total)} PERSONAS`)} src="./assets/iconos/share.svg" alt="share" />
                    </div>
                </div>


                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de mujeres por hora del día</h2>

                <div className="__detail_top_date">
                    <div className="__text_top">Hora más transitada: {maxHourFemalePerson.hour} con {formatNumber(maxHourFemalePerson.total)} mujeres</div>
                    <DateChange startDate={moment('2020-07-01').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setHoursPersonsFemale}
                        methodStart={setStartDateHourFemalePerson}
                        methodEnd={setEndDateHourFemalePerson}
                        flexColumn={false}
                    />
                </div>



                <div id="graficHoursFemale" className="exportImgCanvas chart-containerv2 mt  w-100">
                    <GraficHours data={hoursPersonFemale} label="Total de Mujeres" dtsetbg="#0502D3"
                        optionbg="#454545"
                        legendbg="#454545"
                        title=" Hora: "
                        labelop=" Total de Mujeres:"
                        scalebg="#0502D3"
                        sexo="female"
                        scltxtlbl="Cantidad de Mujeres"
                    />
                    <GraficHours data={hoursPersonFemale} label="Total de Mujeres" dtsetbg="#0502D3"
                        optionbg="#454545"
                        legendbg="#454545"
                        title=" Hora: "
                        labelop=" Total de Mujeres:"
                        scalebg="#0502D3"
                        sexo="female"
                        scltxtlbl="Cantidad de Mujeres"
                        pl={50}
                        pr={50}
                        pt={200}
                        pb={30}
                    />

                    <div className="title_todayhoras __export_data">
                         <img onClick={() => exportExcel('hour', dateStartHourFemalePerson, dateEndHourFemalePerson,'DE-MUJERES-POR-HORA-DEL-DIA')} src="./assets/iconos/downloadcsv.svg" alt="export-svg" />
                        <img onClick={() => exportPdf('graficHoursFemale', dateStartHourFemalePerson, dateEndHourFemalePerson,
                            'TOTAL DE MUJERES POR HORA DEL DÍA',
                            `HORA MÁS TRANSITADA: ${maxHourFemalePerson.hour} CON ${formatNumber(maxHourFemalePerson.total)} PERSONAS`)} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                       <img onClick={() => downloadImageDesktop('graficHoursFemale',
                        'TOTAL DE MUJERES POR HORA DEL DÍA',
                        dateStartHourFemalePerson, dateEndHourFemalePerson, '#fff', 380, 'hour', 'P',`HORA MÁS TRANSITADA: ${maxHourFemalePerson.hour} CON ${formatNumber(maxHourFemalePerson.total)} PERSONAS`)} src="./assets/iconos/share.svg" alt="share" />
                    </div>
                </div>


                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de personas por días de la semana</h2>
                <div className="__detail_top_date">
                    <div className="__text_top">Día de la semana más transitado: {maxWeekPerson.day} con {formatNumber(maxWeekPerson.total)} personas</div>
                    <DateChange startDate={moment('2020-07-02').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setWeekPersons}
                        methodStart={setStartDateWeekPerson}
                        methodEnd={setEndDateWeekPerson}
                        flexColumn={false}
                    />
                    
                </div>
                <div className="mt">
                    <div id="graficWeek" className="exportImgCanvas chart-container w-100">
                        <GraficWeekLine
                            data={weekPerson}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día"
                            labelop="tránsito de personas"
                            scltxtlbl="Cantidad de Personas"
                        />
                        <GraficWeekLine
                            data={weekPerson}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día"
                            labelop="tránsito de personas"
                            scltxtlbl="Cantidad de Personas"
                            pl={50}
                            pr={50}
                            pt={200}
                            pb={30}
                        />

                        <div className="title_todayhoras __export_data">
                               <img onClick={() => exportExcel('week', dateStartWeekPerson, dateEndWeekPerson,'DE-PERSONAS-POR-DIA-DE-LA-SEMANA')} src="./assets/iconos/downloadcsv.svg" alt="export-svg" />
                            <img onClick={() => exportPdf('graficWeek', dateStartWeekPerson, dateEndWeekPerson,
                                'TOTAL DE PERSONAS POR DÍA DE LA SEMANA',
                                `DÍA MÁS TRANSITADA: ${maxWeekPerson.day} CON ${formatNumber(maxWeekPerson.total)} PERSONAS`)} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                               <img onClick={() => downloadImageDesktop('graficWeek', 'TOTAL DE PERSONAS POR DÍAS DE LA SEMANA', dateStartWeekPerson, dateEndWeekPerson, '#fff', 330, 'week', 'P',`DÍA MÁS TRANSITADA: ${maxWeekPerson.day} CON ${formatNumber(maxWeekPerson.total)} PERSONAS`)} src="./assets/iconos/share.svg" alt="share" />
                        </div>
                    </div>

                </div>


                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de hombres por días de la semana</h2>


                <div className="__detail_top_date">
                    <div className="__text_top">Día de la semana más transitado: {maxWeekMalePerson.day} con {formatNumber(maxWeekMalePerson.total)} hombres</div>
                    <DateChange startDate={moment('2020-07-02').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setWeekPersonsMale}
                        methodStart={setStartDateWeekMalePerson}
                        methodEnd={setEndDateWeekMalePerson}
                        flexColumn={false}
                    />
                </div>

                <div className="mt">
                    <div id="graficWeekMale" className="exportImgCanvas exportImgCanvas chart-container w-100">
                        <GraficWeekLine
                            data={weekPersonMale}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día"
                            sexo="male"
                            labelop="tránsito de Hombres"
                            scltxtlbl="Cantidad de Hombres"
                        />
                        <GraficWeekLine
                            data={weekPersonMale}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día"
                            sexo="male"
                            labelop="tránsito de Hombres"
                            scltxtlbl="Cantidad de Hombres"
                            pl={50}
                            pr={50}
                            pt={200}
                            pb={30}
                        />

                        <div className="title_todayhoras __export_data">
                               <img onClick={() => exportExcel('week', dateStartWeekMalePerson, dateEndWeekMalePerson,'DE-HOMBRES-POR-DIA-DE-LA-SEMANA')} src="./assets/iconos/downloadcsv.svg" alt="export-svg" />
                            <img onClick={() => exportPdf('graficWeekMale', dateStartWeekMalePerson, dateEndWeekMalePerson,
                                'TOTAL DE HOMBRES POR DÍA DE LA SEMANA',
                                `DÍA MÁS TRANSITADA: ${maxWeekMalePerson.day} CON ${formatNumber(maxWeekMalePerson.total)} PERSONAS`)} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                            <img onClick={() => downloadImageDesktop('graficWeekMale', 'TOTAL DE HOMBRES POR DÍAS DE LA SEMANA', dateStartWeekMalePerson, dateEndWeekMalePerson, '#fff', 340,'week', 'P',`DÍA MÁS TRANSITADA: ${maxWeekMalePerson.day} CON ${formatNumber(maxWeekMalePerson.total)} PERSONAS`)} src="./assets/iconos/share.svg" alt="share" />
                        </div>
                    </div>

                </div>

                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de Mujeres por días de la semana</h2>
                <div className="__detail_top_date">
                    <div className="__text_top">Día de la semana más transitado: {maxWeekFemalePerson.day} con {formatNumber(maxWeekFemalePerson.total)} mujeres</div>
                    <DateChange startDate={moment('2020-07-02').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setWeekPersonsFemale}
                        methodStart={setStartDateWeekFemalePerson}
                        methodEnd={setEndDateWeekFemalePerson}
                        flexColumn={false}
                    />    
                </div>

                <div className="mt">
                    <div id="graficWeekFemale" className="exportImgCanvas chart-container w-100">
                        <GraficWeekLine
                            data={weekPersonFemale}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día"
                            sexo="female"
                            labelop="tránsito de Mujeres"
                            scltxtlbl="Cantidad de Mujeres"
                        />
                        <GraficWeekLine
                            data={weekPersonFemale}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día"
                            sexo="female"
                            labelop="tránsito de Mujeres"
                            scltxtlbl="Cantidad de Mujeres"
                            pl={50}
                            pr={50}
                            pt={200}
                            pb={30}
                        />

                        <div className="title_todayhoras __export_data">
                               <img onClick={() => exportExcel('week', dateStartWeekFemalePerson, dateEndWeekFemalePerson,'DE-MUJERES-POR-DIA-DE-LA-SEMANA')} src="./assets/iconos/downloadcsv.svg" alt="export-svg" />
                            <img onClick={() => exportPdf('graficWeekFemale', dateStartWeekFemalePerson, dateEndWeekFemalePerson,
                                'TOTAL DE MUJERES POR DÍA DE LA SEMANA',
                                `DÍA MÁS TRANSITADA: ${maxWeekFemalePerson.day} CON ${formatNumber(maxWeekFemalePerson.total)} PERSONAS`)} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                                <img onClick={() => downloadImage('graficWeekFemale','TOTAL DE MUJERES POR DÍAS DE LA SEMANA',dateStartWeekFemalePerson,dateEndWeekFemalePerson,"#fff",350,'week','p',`DÍA MÁS TRANSITADA: ${maxWeekFemalePerson.day} CON ${formatNumber(maxWeekFemalePerson.total)} PERSONAS`)} src="./assets/iconos/share.svg" alt="share" />
                        </div>
                    </div>

                </div>

                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de personas por cada día del mes</h2>

                <div className="__detail_top_date month">
                    <div className="__text_top">Día del mes más transitado: {maxMonthPerson.day} con {maxMonthPerson.total} personas</div>
                    <DateChangeMonth
                        startDate={moment('2020-07-02').format("YYYY-MM-DD")}
                        endDate={moment().endOf('month').format("YYYY-MM-DD")}
                        method={setMonthPerson}
                        methodStart={setStartDateMonthPerson}
                        methodEnd={setEndDateMonthPerson}
                        flexColumn={false}
                    />   
                </div>

                <div className="mt">
                    <div id="graficMonth" className="exportImgCanvas chart-container w-100 bg-yellow">
                        <GraficMonth
                            data={monthPerson}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día: "
                            labelop="tránsito de Personas"
                            scltxtlbl="Cantidad de Personas"
                        />
                        <GraficMonth
                            data={monthPerson}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día: "
                            labelop="tránsito de Personas"
                            scltxtlbl="Cantidad de Personas"
                            pl={50}
                            pr={50}
                            pt={200}
                            pb={30}
                        />
                        <div className="title_todayhoras">
                                {moment(dateStartMonthPerson).format("MMMM")} {moment(dateStartMonthPerson).format("YYYY")} - {moment(dateEndMonthPerson).format("MMMM")} {moment(dateEndMonthPerson).format("YYYY")}
                        </div>
                        <div className="title_todayhoras __export_data">
                             <img onClick={() => exportExcel('month', dateStartMonthPerson, dateEndMonthPerson, 'DE-PERSONAS-POR-DIA-DEL-MES')} src="./assets/iconos/downloadcsv.svg" alt="export-svg" />

                            <img onClick={() => exportPdf('graficMonth', dateStartMonthPerson, dateEndMonthPerson,
                                'TOTAL DE PERSONAS POR DÍA DEL MES',
                                `DÍA MÁS TRANSITADA: ${maxMonthPerson.day} CON ${formatNumber(maxMonthPerson.total)} PERSONAS`, true)} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                            <img onClick={() => downloadImageDesktop('graficMonth', 'TOTAL DE PERSONAS POR DÍAS DEL MES', dateStartMonthPerson, dateEndMonthPerson, '#fee700', 380, 'week', 'P', `DÍA MÁS TRANSITADA: ${maxMonthPerson.day} CON ${formatNumber(maxMonthPerson.total)} PERSONAS`, true)} src="./assets/iconos/share.svg" alt="share" />
                        </div>

                    </div>
                </div>

                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de Hombres por cada día del mes</h2>
                <div className="__detail_top_date month">
                    <div className="__text_top">Día del mes más transitado: {maxMonthMalePerson.day} con {formatNumber(maxMonthMalePerson.total)} hombres</div>
                    <DateChangeMonth
                        startDate={moment('2020-07-02').format("YYYY-MM-DD")}
                        endDate={moment().endOf('month').format("YYYY-MM-DD")}
                        method={setMonthPersonMale}
                        methodStart={setStartDateMonthMalePerson}
                        methodEnd={setEndDateMonthMalePerson}
                        flexColumn={false}
                    />  
                
                </div>

                <div className="mt">
                    <div id="graficMonthMale" className="exportImgCanvas chart-container w-100">
                        <GraficMonth
                            data={monthPersonMale}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día: "
                            sexo="male"
                            labelop="tránsito de Hombres"
                            scltxtlbl="Cantidad de Hombres"
                        />
                        <GraficMonth
                            data={monthPersonMale}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día: "
                            sexo="male"
                            labelop="tránsito de Hombres"
                            scltxtlbl="Cantidad de Hombres"
                            pl={50}
                            pr={50}
                            pt={200}
                            pb={30}
                        />
                        <div className="title_todayhoras">
                                {moment(dateStartMonthMalePerson).format("MMMM")} {moment(dateStartMonthMalePerson).format("YYYY")} - {moment(dateEndMonthMalePerson).format("MMMM")} {moment(dateEndMonthMalePerson).format("YYYY")}
                        </div>
                        <div className="title_todayhoras __export_data">
                                <img onClick={() => exportExcel('month', dateStartMonthMalePerson, dateEndMonthMalePerson,'DE-HOMBRES-POR-DIA-DEL-MES')} src="./assets/iconos/downloadcsv.svg" alt="export-svg" />
                            <img onClick={() => exportPdf('graficMonthMale', dateStartMonthMalePerson, dateEndMonthMalePerson,
                                'TOTAL DE HOMBRES POR DÍA DEL MES',
                                `DÍA MÁS TRANSITADA: ${maxMonthMalePerson.day} CON ${formatNumber(maxMonthMalePerson.total)} PERSONAS`,true)} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                            <img onClick={() => downloadImageDesktop('graficMonthMale', 'TOTAL DE HOMBRES POR DÍAS DEL MES', dateStartMonthMalePerson, dateEndMonthMalePerson, '#fff', 380,'month', 'P',`DÍA MÁS TRANSITADA: ${maxMonthMalePerson.day} CON ${formatNumber(maxMonthMalePerson.total)} PERSONAS`,true)} src="./assets/iconos/share.svg" alt="share" />

                        </div>
                    </div>
                </div>

                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de Mujeres por cada día del mes</h2>
                <div className="__detail_top_date month">
                    <div className="__text_top">Día del mes más transitado: {maxMonthFemalePerson.day} con {formatNumber(maxMonthFemalePerson.total)} mujeres</div>
                    <DateChangeMonth
                        startDate={moment('2020-07-02').format("YYYY-MM-DD")}
                        endDate={moment().endOf('month').format("YYYY-MM-DD")}
                        method={setMonthPersonFemale}
                        methodStart={setStartDateMonthFemalePerson}
                        methodEnd={setEndDateMonthFemalePerson}
                        flexColumn={false}
                    /> 
                </div>


                <div className="mt">
                    <div id="graficMonthFemale" className="exportImgCanvas chart-container w-100">
                        <GraficMonth
                            data={monthPersonFemale}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día: "
                            sexo="female"
                            labelop="tránsito de Mujeres"
                            scltxtlbl="Cantidad de Mujeres"
                        />
                        <GraficMonth
                            data={monthPersonFemale}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día: "
                            sexo="female"
                            labelop="tránsito de Mujeres"
                            scltxtlbl="Cantidad de Mujeres"
                            pl={50}
                            pr={50}
                            pt={200}
                            pb={30}
                        />
                        <div className="title_todayhoras">
                                {moment(dateStartMonthFemalePerson).format("MMMM")} {moment(dateStartMonthFemalePerson).format("YYYY")} - {moment(dateEndMonthFemalePerson).format("MMMM")} {moment(dateEndMonthFemalePerson).format("YYYY")}
                        </div>
                        <div className="title_todayhoras __export_data">
                             <img onClick={() => exportExcel('month', dateStartMonthFemalePerson, dateEndMonthFemalePerson,'DE-MUJERES-POR-DIA-DEL-MES')} src="./assets/iconos/downloadcsv.svg" alt="export-svg" />
                            <img onClick={() => exportPdf('graficMonthFemale', dateStartMonthFemalePerson, dateEndMonthFemalePerson,
                                'TOTAL DE MUJERES POR DÍA DEL MES',
                                `DÍA MÁS TRANSITADA: ${maxMonthFemalePerson.day} CON ${formatNumber(maxMonthFemalePerson.total)} PERSONAS`,true)} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                     <img onClick={() => downloadImageDesktop('graficMonthFemale', 'TOTAL DE MUJERES POR DÍAS DEL MES', dateStartMonthFemalePerson, dateEndMonthFemalePerson, '#fff', 380,'month', 'P',`DÍA MÁS TRANSITADA: ${maxMonthFemalePerson.day} CON ${formatNumber(maxMonthFemalePerson.total)} PERSONAS`,true)} src="./assets/iconos/share.svg" alt="share" />

                        </div>
                    </div>

                </div>

                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total semana-acumulado de personas por hora del día</h2>
                <span className="text-center __subtitle">(Ultimos 7 Días)</span>
                <div className="__range_heatmap">
                    {heatmapRangePerson.map(({ range, color }) => (
                        <div className="__range" key={color}>
                            <span  >{range}</span>
                            <div className="__bg-color-heatmap"></div>
                        </div>

                    ))}
                </div>


                <div id="heatmap" className=" mt __hide_desktop">
                    <GraficGrillaDesktop data={heatmapPerson} />
                    <div className="title_todayhoras __export_data">
                          <img onClick={downloadPdfHeatMap} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                    
                    <img onClick={downloadHeatMapImage} src="./assets/iconos/share.svg" alt="share" />
                    </div>
                </div>


                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total acumulado - Género</h2>
                <div className="__detail_top_date month">
                    <div className="__text_top"></div>
                    <DateChange startDate={moment('2020-07-02').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setGraficRangeAges}
                        methodStart={setStartDateAgePerson}
                        methodEnd={setEndDateAgePerson}
                        flexColumn={false}
                    />
               
                </div>
                <div id="graficRangeAge" className="exportImgCanvas chart-containerv2 w-100 mb-i">
                <HorizontalGrafic dataAge={ageRangePerson} scltxtlbl={true} />
                  <HorizontalGrafic dataAge={ageRangePerson} scltxtlbl={true} />
                 <div className="title_todayhoras __export_data">
                            {/* <img onClick={() => exportGrafic('range', initdaterange, findaterange)} src="./assets/iconos/downloadcsv.svg" alt="export-svg" />
                             */}
                             <img onClick={() => exportPdf('graficRangeAge', dateStartAgePerson, dateEndAgePerson,
                                'TOTAL ACUMULADO GENERO',
                                ``)} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                     <img onClick={() => downloadImageDesktop('graficRangeAge', 'TOTAL ACUMULADO GENERO', dateStartAgePerson, dateEndAgePerson, '#fff', 380,'age', 'P','')} src="./assets/iconos/share.svg" alt="share" />

                        </div>
                </div>
                {/* End */}
            </div>
        </div>
    )
}