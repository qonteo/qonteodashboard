import React, { useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/es';
import "../../helpers/roundbarchart";
import {
    setEndDateHourVehicle, setStartDateHourVehicle,
    setStartDateWeekVehicle, setEndDateWeekVehicle,
    setStartDateMonthVehicle, setEndDateMonthVehicle,
    setEndDateHourPerson, setStartDateHourPerson,
    setStartDateHourMalePerson, setEndDateHourMalePerson,
    setStartDateHourFemalePerson, setEndDateHourFemalePerson,
    setStartDateWeekPerson, setEndDateWeekPerson,
    setStartDateWeekMalePerson, setEndDateWeekMalePerson,
    setEndDateWeekFemalePerson, setStartDateWeekFemalePerson, setStartDateAgePerson, setEndDateAgePerson
} from '../../actions/date';

import { useDispatch, useSelector } from 'react-redux';
import { getStartVehicles, setHoursVehicles, setWeekVehicles, setMonthVehicles } from '../../actions/vehicle';
import {
    getPersondata, setGraficRangeAges, setHoursPersons,
    setHoursPersonsFemale, setHoursPersonsMale,
    setWeekPersons, setWeekPersonsFemale,
    setWeekPersonsMale
} from '../../actions/person';
import { GraficHours } from '../grafics/GraficHours';
import { GraficWeek } from '../grafics/GraficWeek';
import { GraficMonth } from '../grafics/GraficMonth';
import { BoxPrimary } from '../boxes/BoxPrimary';

import { formatNumber } from '../../helpers/calculo';
import { BoxSecondary } from '../boxes/BoxSecondary';
import { TimeRealButton } from './TimeRealButton';
import { ScrollButton } from './ScrollButton';
import { DateChange } from '../date/DateChange';
import { DateChangeMonth } from '../date/DateChangeMonth';
import { BoxSex } from '../boxes/BoxSex';
import { GraficGrilla } from '../grafics/GraficGrilla';
import { downloadImage } from '../../helpers/exports';
import { HorizontalGrafic } from '../grafics/HorizontalGrafic';
import { getTypesVehicle } from '../../actions/typeVehicle';
import { PlateData } from '../../actions/plate';


const currentDate = moment().format("YYYY-MM-DD");

export const QonteoMobile = () => {

    const dispatch = useDispatch();
    const {
        vehicleHours,
        vehicleDaysOfWeek,
        vehicleDaysOfMonth,
        maxHour,
        maxWeek,
        maxMonth
    } = useSelector(state => state.vehicle);

    const { bus, car, bike, suv, truck, other,
        countTodayTypes, todayPercentTypes,
        countYesterdayTypes, countWeekTypes,
        weekPercentTypes, countTypes } = useSelector(state => state.typeVehicle);
        const {
            topPlate
        } = useSelector(state => state.plate);



    const {
        hoursPerson,
        hoursPersonFemale,
        hoursPersonMale,
        weekPerson,
        weekPersonMale,
        weekPersonFemale,
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
        totalWeekPerson,
        totalWeekFemale,
        totalWeekMale,
        weekPercentPerson,
        totalMonthPerson,
        totalMonthFemalePerson,
        totalMonthMalePerson
    } = useSelector(state => state.person);




    const {
        dateStartHourVehicle, dateEndHourVehicle,
        dateStartWeekVehicle, dateEndWeekVehicle,
        dateStartMonthVehicle, dateEndMonthVehicle,
        dateStartHourPerson, dateEndHourPerson,
        dateStartHourMalePerson, dateEndHourMalePerson,
        dateStartHourFemalePerson, dateEndHourFemalePerson,
        dateStartWeekPerson, dateEndWeekPerson,
        dateStartWeekMalePerson, dateEndWeekMalePerson,
        dateStartWeekFemalePerson, dateEndWeekFemalePerson,
        dateStartAgePerson, dateEndAgePerson
    } = useSelector(state => state.date);

    useEffect(() => {
        dispatch(getStartVehicles());
        dispatch(getTypesVehicle())
        dispatch(PlateData())
        dispatch(getPersondata())
    }, [dispatch])

 

    return (
        <div>
            <div className="title mb mt">
                <span className="text-primary">CO.PMXCO.BOG.A01</span>
            </div>

            <div id="positionVehicle">
                <ScrollButton refVehicle={'positionVehicle'} active={'vehicle'} refPerson={'positionPerson'} />
            </div>
            <TimeRealButton dispath={dispatch} method={getStartVehicles} />

            <div className="contenedor contet_index">
             {/*    <BoxPrimary date={currentDate} cantidad={formatNumber(countTodayTypes)} text1="Vehículos en tránsito" text2="hoy" /> */}
                <div className="__line_separator"></div>

                <h2 className=" __title_grafic">Total de vehículos por horas del día</h2>
                <div className="__detail_top_date">
                    <div className="__text_top">Hora más transitada: {maxHour.hour} con {maxHour.total} vehículos</div>
                    <DateChange startDate={moment('2020-07-02').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setHoursVehicles} methodStart={setStartDateHourVehicle}
                        methodEnd={setEndDateHourVehicle}
                    />
                </div>
                <div className="mt">
                    <div id="graficHours" className="exportImgCanvas chart-container">
                        <GraficHours data={vehicleHours}
                            label="Tiempo (horas)" dtsetbg="#0a18f1"
                            optionbg="#454545"
                            title="Hora: "
                            scltxtlbl={null}
                            labelop="tránsito de vehículos :"
                            scalebg="#0502D3"
                        />
                        <GraficHours data={vehicleHours}
                            label="Tiempo (horas)" dtsetbg="#0a18f1"
                            optionbg="#454545"
                            title="Hora: "
                            scltxtlbl={null}
                            labelop="tránsito de vehículos :"
                            scalebg="#0502D3"
                            pl={20}
                            pr={20}
                            pt={150}
                            pb={30}
                        />
                        <div className="title_todayhoras __export_data">
                            <img className="__cursor_pointer" onClick={() => downloadImage('graficHours',
                                'TOTAL DE VEHÍCULOS POR HORA DEL DÍA',
                                '#fff', 75, dateStartHourVehicle, dateEndHourVehicle, 'hour', 'v'
                            )} src="./assets/iconos/share.svg" alt="share" />
                        </div>
                    </div>
                </div>

                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total vehículos por días de la semana</h2>
                <div className="__detail_top_date">
                    <div className="__text_top">Día de la semana más transitado: {maxWeek.day} con {maxWeek.total} vehículos</div>
                    <DateChange
                        startDate={moment('2020-07-01').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setWeekVehicles} methodStart={setStartDateWeekVehicle}
                        methodEnd={setEndDateWeekVehicle}
                    />
                </div>

                <div className="mt">
                    <div id="graficWeek" className="exportImgCanvas chart-container">
                        <GraficWeek
                            data={vehicleDaysOfWeek}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día: "
                            labelop="tránsito de vehículos"
                        />
                        <GraficWeek
                            data={vehicleDaysOfWeek}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día: "
                            labelop="tránsito de vehículos"
                            pl={20}
                            pr={20}
                            pt={30}
                            pb={30}

                        />

                        <div className="title_todayhoras __export_data">
                            <img className="__cursor_pointer" onClick={() => downloadImage('graficWeek', 'TOTAL DE VEHÍCULOS POR DÍA DE LA SEMANA', '#fff', 60, dateStartWeekVehicle, dateEndWeekVehicle, 'week', 'v')} src="./assets/iconos/share.svg" alt="share" />
                        </div>
                    </div>

                </div>
                <div className="__line_separator"></div>
             {/*    <BoxSecondary count={countYesterdayTypes} percent={todayPercentTypes} text1="ayer" text2="Vehículos en tránsito" />
                <BoxSecondary count={countWeekTypes} percent={weekPercentTypes} text1="esta semana" text2="Vehículos en tránsito" /> */}
                <div className="__range_date">
                    <BoxSecondary initDate={moment('2020-07-24').format("YYYY-MM-DD")} endDate={currentDate} count={countTypes} text1="Total" text2="Vehículos en tránsito" />
                </div>
                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de vehículos por días del mes</h2>
                <div className="__detail_top_date month">
                    <div className="__text_top">Día del mes más transitado: {maxMonth.day} con {maxMonth.total} vehículos</div>
                    <DateChangeMonth
                        startDate={moment('2020-07-02').format("YYYY-MM-DD")}
                        endDate={moment().endOf('month').format("YYYY-MM-DD")}
                        method={setMonthVehicles}
                        methodStart={setStartDateMonthVehicle}
                        methodEnd={setEndDateMonthVehicle}
                    />
                </div>
                <div className="mt">
                    <div id="graficMonth" className="exportImgCanvas chart-container">
                        <GraficMonth
                            data={vehicleDaysOfMonth}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            scltxtlbl={null}
                            title="Día: "
                            labelop="tránsito de vehículos"
                        />
                        <GraficMonth
                            data={vehicleDaysOfMonth}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            scltxtlbl={null}
                            title="Día: "
                            labelop="tránsito de vehículos"
                            pl={20}
                            pr={20}
                            pt={70}
                            pb={30}
                        />
                        <div className="title_todayhoras">
                            {moment(dateStartMonthVehicle).format("MMMM")} - {moment(dateEndMonthVehicle).format("MMMM")}
                        </div>
                        <div className="title_todayhoras __export_data">
                            <img className="__cursor_pointer" onClick={() => downloadImage('graficMonth', `TOTAL DE VEHÍCULOS POR DÍA DEL MES - ${moment(dateStartMonthVehicle).format("MMMM").toUpperCase()}/${moment(dateEndMonthVehicle).format("MMMM").toUpperCase()}`, '#fff', 10, dateStartMonthVehicle, dateEndMonthVehicle, 'month', 'v')} src="./assets/iconos/share.svg" alt="share" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="__line_separator"></div>

            <div className="contenedor contet_index">
                <h2 className=" __title_grafic">Total de vehículos por categoría</h2>
                <BoxPrimary bg="bg-gray" date={currentDate} cantidad={topPlate.plate} text1={`ha pasado ${topPlate.occurency} veces `} text2="Top vehiculo" />
                <div className="box_share mt __text-capitalize">
                    <BoxSex textBottom="TOTAL" count={car.total} color="white" textsex="Carros" sex="carro" />
                    <BoxSex textBottom="TOTAL" count={truck.total} color="white" textsex="Camiones" sex="camion" />
                </div>
                <div className="box_share mt __text-capitalize">
                    <BoxSex textBottom="TOTAL" count={bike.total} color="white" textsex="Motos" sex="moto" />
                    <BoxSex textBottom="TOTAL" count={suv.total} color="white" textsex="SUVs" sex="suvs" />
                </div>
                <div className="box_share mt __text-capitalize">
                    <BoxSex textBottom="TOTAL" count={bus.total} color="white" textsex="Buses" sex="bus" />
                    <BoxSex textBottom="TOTAL" count={other.total} color="white" textsex="otros" sex="carro" />
                </div>

            </div>


            <div className="__line_separator"></div>
            <div className="title mt mb" >
                <h2>Personas</h2>
            </div>
            <div id="positionPerson">
                <ScrollButton refVehicle={'positionVehicle'} active={'person'} refPerson={'positionPerson'} />
            </div>

            <div className="contenedor contet_index">

              {/*   <BoxPrimary date={currentDate} cantidad={totalTodayPerson} text1="Personas en total" text2="hoy" /> */}


             {/*    <div className="box_share mt ">
                    <BoxSex total={totalTodayPerson} count={totalTodayPersonMale} color="white" textsex="hombres" />
                    <BoxSex total={totalTodayPerson} count={totalTodayPersonFemale} color="white" textsex="Mujeres" sex="woman" />
                </div> */}

                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de personas por hora del día</h2>
                <div className="__detail_top_date">
                    <div className="__text_top">Hora más transitada: {maxHourPerson.hour} con {maxHourPerson.total} personas</div>
                    <DateChange startDate={moment('2020-07-01').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setHoursPersons}
                        methodStart={setStartDateHourPerson}
                        methodEnd={setEndDateHourPerson}
                    />
                </div>

                <div id="graficHourP" className="chart-containerv2 exportImgCanvas mt bg-yellow">

                    <GraficHours data={hoursPerson} label="Total de Personas"
                        dtsetbg="#0502D3"
                        optionbg="#454545"
                        legendbg="#454545"
                        title=" Hora:"
                        labelop=" Total de Personas:"
                        scltxtlbl={null}
                        scalebg="#0502D3" />
                    <GraficHours data={hoursPerson} label="Total de Personas"
                        dtsetbg="#0502D3"
                        optionbg="#454545"
                        legendbg="#454545"
                        title=" Hora:"
                        labelop=" Total de Personas:"
                        scltxtlbl={null}
                        scalebg="#0502D3"
                        pl={20}
                        pr={20}
                        pt={150}
                        pb={30}
                    />

                    <div className="title_todayhoras __export_data">
                        <img className="__cursor_pointer" onClick={() => downloadImage('graficHourP', 'TOTAL DE PERSONAS POR HORA DEL DÍA', '#fee700', 75, dateStartHourPerson, dateEndHourPerson, 'hour', 'p')} src="./assets/iconos/share.svg" alt="share" />
                    </div>
                </div>

                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de hombres por hora del día</h2>

                <div className="__detail_top_date">
                    <div className="__text_top">Hora más transitada: {maxHourMalePerson.hour} con {maxHourMalePerson.total} hombres</div>
                    <DateChange startDate={moment('2020-07-01').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setHoursPersonsMale}
                        methodStart={setStartDateHourMalePerson}
                        methodEnd={setEndDateHourMalePerson}
                    />
                </div>


                <div id="graficHourPMale" className="exportImgCanvas chart-containerv2 mt ">

                    <GraficHours
                        data={hoursPersonMale} label="Total de Hombres"
                        dtsetbg="#0502D3"
                        optionbg="#454545"
                        legendbg="#454545"
                        title=" Hora: "
                        labelop=" Total de Hombres::"
                        scalebg="#0502D3"
                        scltxtlbl={null}
                        sexo="male"

                    />

                    <GraficHours
                        data={hoursPersonMale} label="Total de Hombres"
                        dtsetbg="#0502D3"
                        optionbg="#454545"
                        legendbg="#454545"
                        title=" Hora: "
                        labelop=" Total de Hombres::"
                        scalebg="#0502D3"
                        scltxtlbl={null}
                        sexo="male"
                        pl={20}
                        pr={20}
                        pt={150}
                        pb={30}
                    />

                    <div className="title_todayhoras __export_data">
                        <img className="__cursor_pointer"
                            onClick={() => downloadImage('graficHourPMale', 'TOTAL DE HOMBRES POR HORA DEL DÍA',
                                '#fff', 75, dateStartHourMalePerson, dateEndHourMalePerson, 'hour', 'p')} src="./assets/iconos/share.svg" alt="share" />
                    </div>
                </div>

                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de mujeres por hora del día</h2>
                <div className="__detail_top_date">
                    <div className="__text_top">Hora más transitada: {maxHourFemalePerson.hour} con {maxHourFemalePerson.total} mujeres</div>
                    <DateChange startDate={moment('2020-07-01').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setHoursPersonsFemale}
                        methodStart={setStartDateHourFemalePerson}
                        methodEnd={setEndDateHourFemalePerson}
                    />
                </div>

                <div id="graficHourPFemale" className="exportImgCanvas chart-containerv2 mt">
                    <GraficHours data={hoursPersonFemale} label="Total de Mujeres"
                        dtsetbg="#0502D3"
                        optionbg="#454545"
                        legendbg="#454545"
                        title=" Hora: "
                        scltxtlbl={null}
                        labelop=" Total de Mujeres:"
                        scalebg="#0502D3"
                        sexo="female"
                    />
                    <GraficHours data={hoursPersonFemale} label="Total de Mujeres"
                        dtsetbg="#0502D3"
                        optionbg="#454545"
                        legendbg="#454545"
                        title=" Hora: "
                        scltxtlbl={null}
                        labelop=" Total de Mujeres:"
                        scalebg="#0502D3"
                        sexo="female"
                        pl={20}
                        pr={20}
                        pt={150}
                        pb={30}
                    />

                    <div className="title_todayhoras __export_data">
                        <img className="__cursor_pointer"
                            onClick={() => downloadImage('graficHourPFemale', 'TOTAL DE MUJERES POR HORA DEL DÍA', '#fff',
                                75, dateStartHourFemalePerson, dateEndHourFemalePerson, 'hour', 'p')} src="./assets/iconos/share.svg" alt="share" />
                    </div>
                </div>

                <div className="__line_separator"></div>
                <BoxSecondary percent={todayPercentPerson} count={totalYesterdayPerson} text1="ayer" text2="Personas en total" />
                <div className="box_share mt ">
                    <BoxSex total={totalYesterdayPerson} count={totalYesterdayMalePerson} bg="white" textsex="hombres" />
                    <BoxSex total={totalYesterdayPerson} count={totalYesterdayFemalePerson} bg="white" textsex="Mujeres" sex="woman" />
                </div>
                <BoxSecondary percent={weekPercentPerson} count={totalWeekPerson} text1="Esta semana" text2="Personas en total" />
                <div className="box_share mt ">
                    <BoxSex total={totalWeekPerson} count={totalWeekMale} bg="white" textsex="hombres" />
                    <BoxSex total={totalWeekPerson} count={totalWeekFemale} bg="white" textsex="Mujeres" sex="woman" />
                </div>
                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total personas por días de la semana</h2>

                <div className="__detail_top_date">
                    <div className="__text_top">Día de la semana más transitado: {maxWeekPerson.day} con {maxWeekPerson.total} personas</div>
                    <DateChange startDate={moment('2020-07-01').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setWeekPersons}
                        methodStart={setStartDateWeekPerson}
                        methodEnd={setEndDateWeekPerson}
                    />
                </div>

                <div id="graficWeekP" className="exportImgCanvas chart-containerv2 mt bg-yellow">
                    <GraficWeek
                        data={weekPerson}
                        label="Total de Personas"
                        dtsetbg="#0502D3"
                        optionbg="#454545"
                        scalebg="blue"
                        title="Día: "
                        labelop=" tránsito de personas: "
                    />
                    <GraficWeek
                        data={weekPerson}
                        label="Total de Personas"
                        dtsetbg="#0502D3"
                        optionbg="#454545"
                        scalebg="blue"
                        title="Día: "
                        labelop=" tránsito de personas: "
                        pl={20}
                        pr={20}
                        pt={30}
                        pb={30}
                    />
                    <div className="title_todayhoras __export_data">
                        <img className="__cursor_pointer" onClick={() => downloadImage('graficWeekP', 'TOTAL DE PERSONAS DE DÍA DE SEMANA', '#fee700',
                            60, dateStartWeekPerson, dateEndWeekPerson, 'week', 'p')} src="./assets/iconos/share.svg" alt="share" />
                    </div>
                </div>
                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total hombres por días de la semana</h2>
                <div className="__detail_top_date">
                    <div className="__text_top">Día de la semana más transitado: {maxWeekMalePerson.day} con {maxWeekMalePerson.total} hombres</div>
                    <DateChange startDate={moment('2020-07-01').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setWeekPersonsMale}
                        methodStart={setStartDateWeekMalePerson}
                        methodEnd={setEndDateWeekMalePerson}
                    />
                </div>

                <div id="graficWeekPMale" className="exportImgCanvas chart-containerv2 mt ">
                    <GraficWeek
                        data={weekPersonMale}
                        label="Total de Hombres"
                        dtsetbg="#0502D3"
                        optionbg="#454545"
                        scalebg="blue"
                        title="Día: "
                        legendbg="#454545"
                        labelop=" tránsito de Hombres: "
                        sexo="male"
                    />
                    <GraficWeek
                        data={weekPersonMale}
                        label="Total de Hombres"
                        dtsetbg="#0502D3"
                        optionbg="#454545"
                        scalebg="blue"
                        title="Día: "
                        legendbg="#454545"
                        labelop=" tránsito de Hombres: "
                        sexo="male"
                        pl={20}
                        pr={20}
                        pt={30}
                        pb={30}
                    />
                    <div className="title_todayhoras __export_data">
                        <img className="__cursor_pointer" onClick={() => downloadImage('graficWeekPMale', 'TOTAL DE HOMBRES DE DÍA DE SEMANA', '#fff',
                            60, dateStartWeekMalePerson, dateEndWeekMalePerson, 'week', 'p')} src="./assets/iconos/share.svg" alt="share" />
                    </div>
                </div>
                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total mujeres por días de la semana</h2>

                <div className="__detail_top_date">
                    <div className="__text_top">Día de la semana más transitado: {maxWeekFemalePerson.day} con {maxWeekFemalePerson.total} mujeres</div>
                    <DateChange startDate={moment('2020-07-01').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setWeekPersonsFemale}
                        methodStart={setStartDateWeekFemalePerson}
                        methodEnd={setEndDateWeekFemalePerson}

                    />
                </div>


                <div id="graficWeekPFemale" className="exportImgCanvas chart-containerv2 mt ">
                    <GraficWeek
                        data={weekPersonFemale}
                        label="Total de Mujeres"
                        dtsetbg="#0a18f1"
                        optionbg="#0a18f1"
                        scalebg="#0a18f1"
                        title="Día: "
                        labelop=" tránsito de Mujeres: "
                        sexo="female"
                    />
                    <GraficWeek
                        data={weekPersonFemale}
                        label="Total de Mujeres"
                        dtsetbg="#0a18f1"
                        optionbg="#0a18f1"
                        scalebg="#0a18f1"
                        title="Día: "
                        labelop=" tránsito de Mujeres: "
                        sexo="female"
                        pl={20}
                        pr={20}
                        pt={30}
                        pb={30}
                    />
                    <div className="title_todayhoras __export_data">
                        <img className="__cursor_pointer" onClick={() => downloadImage('graficWeekPFemale', 'TOTAL DE MUJERES DE DÍA DE SEMANA', '#fff', 60, dateStartWeekFemalePerson, dateEndWeekFemalePerson, 'week', 'p')} src="./assets/iconos/share.svg" alt="share" />
                    </div>
                </div>
                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total semana-acumulado personas por hora del día</h2>

                <div className="__range_heatmap">
                    {heatmapRangePerson.map(({ range, color }) => (
                        <div className="__range" key={color}>
                            <span  >{range}</span>
                            <div className="__bg-color-heatmap"></div>
                        </div>

                    ))}
                </div>

                <GraficGrilla data={heatmapPerson} />

                <div className="__range_date">
                    <BoxSecondary count={totalMonthPerson} text1="Total" text2="Personas en total" initDate={moment('2020-07-24').format("YYYY-MM-DD")} endDate={moment().format("YYYY-MM-DD")} />
                </div>
                <div className="box_share mt ">
                    <BoxSex total={totalMonthPerson} count={totalMonthMalePerson} bg="white" textsex="hombres" />
                    <BoxSex total={totalMonthPerson} count={totalMonthFemalePerson} bg="white" textsex="Mujeres" sex="woman" />
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
                    />
                </div>

                <div id="graficRangeAge" className="exportImgCanvas chart-containerv2">
                    <HorizontalGrafic dataAge={ageRangePerson} />
                    <HorizontalGrafic dataAge={ageRangePerson} />
                    <div className="content_title_mes_person">
                    </div>
                    <div className="title_todayhoras __export_data">
                        <img className="__cursor_pointer" onClick={() => downloadImage('graficRangeAge', 'TOTAL ACUMULADO GENERO', '#fff', 100, dateStartAgePerson, dateEndAgePerson, 'age', 'p')} src="./assets/iconos/share.svg" alt="share" />
                    </div>
                </div>
                <div className="__line_separator"></div>
            </div>
        </div>
    )
}