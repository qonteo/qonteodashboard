import React, { useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/es';
import "../../helpers/roundbarchart";
import { useDispatch, useSelector } from 'react-redux';
import { getStartVehicles, setHoursVehicles, setMonthVehicles, setWeekVehicles } from '../../actions/vehicle';
import { BoxPrimary } from '../boxes/BoxPrimary';
import { BoxSecondary } from '../boxes/BoxSecondary';
import { GraficHours } from '../grafics/GraficHours';
import { GraficWeekLine } from '../grafics/GraficWeekLine';
import { GraficLineMonth } from '../grafics/GraficLineMonth';
import { setEndDateHourVehicle, setEndDateMonthVehicle, setEndDateWeekVehicle, setStartDateHourVehicle, setStartDateMonthVehicle, setStartDateWeekVehicle } from '../../actions/date';
import { DateChange } from '../date/DateChange';
import { DateChangeMonth } from '../date/DateChangeMonth';
import { downloadImageDesktop, exportExcel, exportPdf } from '../../helpers/exports';
import { formatNumber } from '../../helpers/calculo';
import { getTypesVehicle } from '../../actions/typeVehicle';
import { useButtons } from '../../hooks/useButtons';
import { useDate2 } from '../../hooks/useDate2';
import { types } from '../../types/types';

const currentDate = moment().format("YYYY-MM-DD");
export const QonteoDesktop = React.memo(() => {
    const dispatch = useDispatch();
    const { isMenu } = useSelector(state => state.ui);
    const {
        vehicleHours,
        vehicleDaysOfWeek,
        vehicleDaysOfMonth,
        maxHour,
        maxWeek,
        maxMonth
    } = useSelector(state => state.vehicle);

   
    

    const {
        dateStartHourVehicle, dateEndHourVehicle,
        dateStartWeekVehicle, dateEndWeekVehicle,
        dateStartMonthVehicle, dateEndMonthVehicle,
    } = useSelector(state => state.date);

    const { bus, car, bike, suv, truck, other,
        countTodayTypes, todayPercentTypes,
        countYesterdayTypes, countWeekTypes,
        weekPercentTypes, countTypes,
        creationDate
    } = useSelector(state => state.typeVehicle);


    useEffect(() => {
        dispatch(getStartVehicles());
        dispatch(getTypesVehicle())

    }, [dispatch])

    const [DateHour, , , setStartDateHrTotal, setEndDateHrTotal] = useDate2(setHoursVehicles, '', 'total', 'dateStartHourVehicle', 'dateEndHourVehicle', '');
    const [DateWeek, , , setStartDateWkTotal, setEndDateWkTotal] = useDate2(setWeekVehicles,'', 'total', 'dateStartWeekVehicle', 'dateEndWeekVehicle', '');
    const [DateMonth, , , setStartDateMntTotal, setEndDateMntTotal] = useDate2(setMonthVehicles, '', 'total', 'dateStartMonthVehicle', 'dateEndMonthVehicle', '');

    const [ButtonHourTotal, hourstotalrst] = useButtons({
        0: 'HOY',
        7: '07 D??AS',
        15: '15 D??AS',
        30: '30 D??AS'
    },setHoursVehicles,'','total','dateStartHourVehicle','dateEndHourVehicle','hourstotalrst',0,setStartDateHrTotal,setEndDateHrTotal)
    const [ButtonWeekTotal, weektotalrst] = useButtons({
        7: 'ULTIMA SEMANA',
        30: '30 D??AS',
    }, setWeekVehicles,'', 'total', 'dateStartWeekVehicle', 'dateEndWeekVehicle', 'weektotalrst', 0, setStartDateWkTotal, setEndDateWkTotal)
    const [ButtonMonthTotal, monthtotalrst] = useButtons({
        30: '??LTIMO MES',
        60: '??LTIMO DOS MES',
        90: '??LTIMO TRES MES',
    }, setMonthVehicles, '', 'total', 'dateStartMonthVehicle', 'dateEndMonthVehicle', 'monthtotalrst', 0, setStartDateMntTotal, setEndDateMntTotal)

    return (
        <div className={`_d__grid ${!isMenu ? "active" : ""}`}>
            <div>
            </div>
            <div className="contenedor contet_index ">
                <div className="title __desktop mb mt">
                <span className="text-primary">{types.groupName}</span>
                </div>
                <h2 className="mt __title_">Veh??culos</h2>
                <div className="__grilla_4 __padding_especial">
                    <BoxPrimary date={currentDate} cantidad={formatNumber(countTodayTypes)} text1="Veh??culos en tr??nsito" text2="hoy" />
                    <BoxSecondary ispercent={true} count={countYesterdayTypes} percent={todayPercentTypes} text1="ayer" text2="Veh??culos en tr??nsito" />
                    <BoxSecondary ispercent={true} count={countWeekTypes} percent={weekPercentTypes} text1="esta semana" text2="Veh??culos en tr??nsito" />
                    <BoxSecondary count={countTypes} text1="Total" text2="Veh??culos en tr??nsito" initDate={moment('2020-07-24').format("YYYY-MM-DD")} endDate={currentDate} />
                </div>
                <div className="mt">
                    <div className="__line_separator"></div>
                    <div id="graficHours" className="exportImgCanvas chart-container w-100 bg-gray" style={{padding: 10, height:650}}>
                        <h2 className=" __title_grafic" style={{color:"#0a18f1"}}>Tiempo promedio de veh??culos en estaci??n de servicios</h2>
                        <table className="__table_plates" style={{padding:50}}>

                            <thead>
                                <tr>
                                    <th className="text-gris"></th>
                                    <th className="text-gris"></th>
                                    <th className="text-gris" style={{textAlign: 'left', color: "#454545", fontWeight: 'normal'}}>Hoy</th>
                                    <th className="text-gris" style={{textAlign: 'left', color: "#454545", fontWeight: 'normal'}}>Esta Semana</th>
                                    <th className="text-gris" style={{textAlign: 'left', color: "#454545", fontWeight: 'normal'}}>Este Mes</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="text-bold text-gris">
                                        <img src={`./assets/iconos/Icono-carro-azul.svg`} style={{padding:10}} width='80' alt="icon_vehicle"/>
                                    </td>
                                    <td className="text-gris font-500">Carros</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{car.asd_today}</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{car.asd_week}</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{car.asd_month}</td>
                                </tr>
                                <tr>
                                    <td className="text-bold text-gris">
                                        <img src={`./assets/iconos/Icono-camion-azul.svg`} style={{padding:10}} width='80' alt="icon_vehicle"/>
                                    </td>
                                    <td className="text-gris font-500">Camiones</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{truck.asd_today}</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{truck.asd_week}</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{truck.asd_month}</td>
                                </tr>
                                <tr>
                                    <td className="text-bold text-gris">
                                        <img src={`./assets/iconos/Icono-Moto-azul.svg`} style={{padding:10}} width='80' alt="icon_vehicle"/>
                                    </td>
                                    <td className="text-gris font-500">Moto</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{bike.asd_today}</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{bike.asd_week}</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{bike.asd_month}</td>
                                </tr>
                                <tr>
                                    <td className="text-bold text-gris">
                                        <img src={`./assets/iconos/Icono-camioneta-azul.svg`} style={{padding:10}} width='80' alt="icon_vehicle"/>
                                    </td>
                                    <td className="text-gris font-500">SUV's</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{suv.asd_today}</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{suv.asd_week}</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{suv.asd_month}</td>
                                </tr>
                                <tr>
                                    <td className="text-bold text-gris">
                                        <img src={`./assets/iconos/Icono-Bus-azul.svg`} style={{padding:10}} width='80' alt="icon_vehicle"/>
                                    </td>
                                    <td className="text-gris font-500">Buses</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{bus.asd_today}</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{bus.asd_week}</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{bus.asd_month}</td>
                                </tr>
                                <tr>
                                    <td className="text-bold text-gris">
                                        <img src={`./assets/iconos/Icono-otros-Azul.svg`} style={{padding:10}} width='50' alt="icon_vehicle"/>
                                    </td>
                                    <td className="text-gris font-500">Otros</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{other.asd_today}</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{other.asd_week}</td>
                                    <td className="text-left font-500" style={{fontWeight: "bold"}}>{other.asd_month}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt">
                <div className="__line_separator"></div>
                    <h2 className=" __title_grafic">Total veh??culos por categor??a</h2>
                    {/*
                    <div className="__grilla_4 mt">
                        <BoxPrimary textHeadLeft="carro-white.svg" textBottom="HOY"  cantidad={formatNumber(car.today)} text1="Carros"  />
                        <BoxPrimary textHeadLeft="camion-white.svg" textBottom="HOY"  cantidad={formatNumber(truck.today)} text1="Camiones"/>
                        <BoxPrimary textHeadLeft="moto-white.svg" textBottom="HOY"  cantidad={formatNumber(bike.today)} text1="Motos"     />
                        <BoxPrimary textHeadLeft="suvs-white.svg" textBottom="HOY"  cantidad={formatNumber(suv.today)} text1="SUVs"      />
                    </div>
                    <div className="__grilla_4 mt">
                        <BoxPrimary textHeadLeft="bus-white.svg" textBottom="HOY"  cantidad={formatNumber(bus.today)} text1="Buses"  />
                        <BoxPrimary textHeadLeft="carro-white.svg" textBottom="HOY"  cantidad={formatNumber(other.today)} text1="Otros"  />
                    </div>
                    <div className="__grilla_4 mt">
                        <BoxPrimary textHeadLeft="carro-white.svg" textBottom="ESTA SEMANA"  cantidad={formatNumber(car.week)} text1="Carros"  />
                        <BoxPrimary textHeadLeft="camion-white.svg" textBottom="ESTA SEMANA"  cantidad={formatNumber(truck.week)} text1="Camiones"/>
                        <BoxPrimary textHeadLeft="moto-white.svg" textBottom="ESTA SEMANA"  cantidad={formatNumber(bike.week)} text1="Motos"     />
                        <BoxPrimary textHeadLeft="suvs-white.svg" textBottom="ESTA SEMANA"  cantidad={formatNumber(suv.week)} text1="SUVs"      />
                    </div>
                    <div className="__grilla_4 mt">
                        <BoxPrimary textHeadLeft="bus-white.svg" textBottom="ESTA SEMANA"  cantidad={formatNumber(bus.week)} text1="Buses"  />
                        <BoxPrimary textHeadLeft="carro-white.svg" textBottom="ESTA SEMANA"  cantidad={formatNumber(other.week)} text1="Otros"  />
                    </div>
                    */}
                    <div className="__grilla_4 mt __date_small">
                        <BoxPrimary date={creationDate} dateEnd={moment().format("YYYY-MM-DD")} textHeadLeft="carro-white.svg" textBottom="TOTAL"  cantidad={formatNumber(car.total)} text1="Carros"  />
                        <BoxPrimary date={creationDate} dateEnd={moment().format("YYYY-MM-DD")} textHeadLeft="camion-white.svg" textBottom="TOTAL"  cantidad={formatNumber(truck.total)} text1="Camiones"/>
                        <BoxPrimary date={creationDate} dateEnd={moment().format("YYYY-MM-DD")} textHeadLeft="moto-white.svg" textBottom="TOTAL"  cantidad={formatNumber(bike.total)} text1="Motos"     />
                        <BoxPrimary date={creationDate} dateEnd={moment().format("YYYY-MM-DD")} textHeadLeft="suvs-white.svg" textBottom="TOTAL"  cantidad={formatNumber(suv.total)} text1="SUVs"      />
                    </div>
                    <div className="__grilla_4 mt __date_small">
                        <BoxPrimary date={creationDate} dateEnd={moment().format("YYYY-MM-DD")} textHeadLeft="bus-white.svg" textBottom="TOTAL"  cantidad={formatNumber(bus.total)} text1="Buses"  />
                        <BoxPrimary date={creationDate} dateEnd={moment().format("YYYY-MM-DD")} textHeadLeft="carro-white.svg" textBottom="TOTAL"  cantidad={formatNumber(other.total)} text1="Otros"  />
                    </div>
                 
                 
                    <div className="__line_separator"></div>
                    <h2 className=" __title_grafic">Total veh??culos por hora del d??a</h2>
                    <ButtonHourTotal />
                    <div className="__detail_top_date">
                        <div className="__text_top">Hora m??s transitada: {maxHour.hour} con {maxHour.total} veh??culos</div>
                        <DateChange startDate={moment('2020-07-02').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setHoursVehicles} methodStart={setStartDateHourVehicle}
                        methodEnd={setEndDateHourVehicle}
                        flexColumn={false}
                        />
                    </div>
                    <div className="mt">
                        <div id="graficHours" className="exportImgCanvas chart-container w-100 bg-yellow ">
                            <GraficHours data={vehicleHours} label="Tiempo (horas)" dtsetbg="#0a18f1"
                                optionbg="#454545"
                                title="Hora:"
                                labelop="tr??nsito de veh??culos :"
                                scalebg="#0502D3"
                                scltxtlbl="Cantidad de veh??culos"

                            />
                            <GraficHours data={vehicleHours} label="Tiempo (horas)" dtsetbg="#0a18f1"
                                optionbg="#454545"
                                title="Hora:"
                                labelop="tr??nsito de veh??culos :"
                                scalebg="#0502D3"
                                scltxtlbl="Cantidad de veh??culos"
                                pl={50}
                                pr={50}
                                pt={200}
                                pb={30}


                            />
                            <div className="title_todayhoras __export_data">
                                <img onClick={() => exportExcel('hour', dateStartHourVehicle, dateEndHourVehicle, 'HORA-DEL-DIA')} src="./assets/iconos/downloadcsv.svg" alt="export-svg" />
                                <img onClick={() => exportPdf('graficHours', dateStartHourVehicle, dateEndHourVehicle,
                                    'TOTAL DE VEHICULOS POR HORA DEL DIA',
                                    `HORA M??S TRANSITADA: ${maxHour.hour} CON ${formatNumber(maxHour.total)} VEH??CULOS`,'POR-HORA-DEL-DIA')} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                                <img onClick={() => downloadImageDesktop('graficHours', 'TOTAL DE VEH??CULOS POR HORA DEL D??A',
                                 dateStartHourVehicle, dateEndHourVehicle, '#fee700', 380, 'hour', 'v',`HORA M??S TRANSITADA: ${maxHour.hour} CON ${formatNumber(maxHour.total)} VEH??CULOS`)} src="./assets/iconos/share.svg" alt="share" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total veh??culos por d??as de la semana</h2>
                <ButtonWeekTotal />
                <div className="__detail_top_date">
                    <div className="__text_top">D??a de la semana m??s transitado: {maxWeek.day} con {maxWeek.total}  veh??culos</div>
                    <DateChange
                        startDate={moment('2020-07-02').format("YYYY-MM-DD")}
                        endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                        method={setWeekVehicles} methodStart={setStartDateWeekVehicle}
                        methodEnd={setEndDateWeekVehicle}
                        flexColumn={false}
                    />
                </div>


                <div className="mt">
                    <div id="graficWeek" className="exportImgCanvas chart-container w-100">
                    <GraficWeekLine
                            data={vehicleDaysOfWeek}
                            label="Tiempo (D??as)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="D??a"
                            labelop="tr??nsito de veh??culos"
                        />
                        <GraficWeekLine
                            data={vehicleDaysOfWeek}
                            label="Tiempo (D??as)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="D??a"
                            labelop="tr??nsito de veh??culos"
                            pl={50}
                            pr={50}
                            pt={200}
                            pb={30}
                        />

                        <div className="title_todayhoras __export_data">
                            <img onClick={() => exportExcel('week', dateStartWeekVehicle, dateEndWeekVehicle, 'DIA-DE-LA-SEMANA')} src="./assets/iconos/downloadcsv.svg" alt="export-svg" />
                            <img onClick={() => exportPdf('graficWeek', dateStartWeekVehicle, dateEndWeekVehicle,
                                'TOTAL DE VEHICULOS POR D??AS DE LA SEMANA',
                                `D??A M??S TRANSITADO: ${maxWeek.day} CON ${formatNumber(maxWeek.total)} VEH??CULOS`, 'DIA-DE-LA-SEMANA')} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                            <img onClick={() => downloadImageDesktop('graficWeek', 'TOTAL DE VEH??CULOS POR D??A DE SEMANA', dateStartWeekVehicle, dateEndWeekVehicle, '#fff', 380, 'week', 'v', `D??A M??S TRANSITADO: ${maxWeek.day} CON ${formatNumber(maxWeek.total)} VEH??CULOS`)} src="./assets/iconos/share.svg" alt="share" />
                        </div>
                    </div>

                </div>


                <div className="__line_separator"></div>
                <h2 className=" __title_grafic">Total de veh??culos por d??as del mes</h2>
                <ButtonMonthTotal />
                <div className="__detail_top_date month">
                    <div className="__text_top">D??a del mes m??s transitado: {maxMonth.day} con {maxMonth.total} veh??culos</div>
                    <DateChangeMonth
                        startDate={moment('2020-07-02').format("YYYY-MM-DD")}
                        endDate={moment().endOf('month').format("YYYY-MM-DD")}
                        method={setMonthVehicles}
                        methodStart={setStartDateMonthVehicle}
                        methodEnd={setEndDateMonthVehicle}
                        flexColumn={false}
                    />
                </div>

                <div className="mt mb">
                    <div id="graficMonth" className="exportImgCanvas chart-container w-100">
                        <GraficLineMonth
                            data={vehicleDaysOfMonth}
                            label="Tiempo (D??as)"
                            dtsetbg="#FEE700"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="D??a"
                            labelop="tr??nsito de veh??culos"
                            lineColor="#FEE700"
                        />
                        <GraficLineMonth
                            data={vehicleDaysOfMonth}
                            label="Tiempo (D??as)"
                            dtsetbg="#FEE700"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="D??a"
                            labelop="tr??nsito de veh??culos"
                            lineColor="#FEE700"
                            pl={50}
                            pr={50}
                            pt={200}
                            pb={30}
                        />
                        <div className="title_todayhoras">
                            {moment(dateStartMonthVehicle).format("MMMM")} {moment(dateStartMonthVehicle).format("YYYY")}- {moment(dateEndMonthVehicle).format("MMMM")} {moment(dateEndMonthVehicle).format("YYYY")}
                        </div>
                        <div className="title_todayhoras __export_data">
                            <img onClick={() => exportExcel('month', dateStartMonthVehicle, dateEndMonthVehicle, 'DIA-DEL-MES')} src="./assets/iconos/downloadcsv.svg" alt="export-svg" />
                            <img onClick={() => exportPdf('graficMonth', dateStartMonthVehicle, dateEndMonthVehicle,
                                'TOTAL DE VEHICULOS POR D??AS DEL MES',
                                `D??A DEL MES M??S TRANSITADO: ${maxMonth.day} CON ${formatNumber(maxMonth.total)} VEH??CULOS`, 'DIA-DEL-MES', true)} src="./assets/iconos/Impresion.svg" alt="export-pdf" />
                            <img onClick={() => downloadImageDesktop('graficMonth', `TOTAL DE VEH??CULOS POR D??A DEL MES - ${moment(dateStartMonthVehicle).format("MMMM").toUpperCase()}/${moment(dateEndMonthVehicle).format("MMMM").toUpperCase()}`, dateStartMonthVehicle, dateEndMonthVehicle, '#fff', 270, 'month', 'v', 
                            `D??A DEL MES M??S TRANSITADO: ${maxMonth.day} CON ${formatNumber(maxMonth.total)} VEH??CULOS`, true)} src="./assets/iconos/share.svg" alt="share" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
