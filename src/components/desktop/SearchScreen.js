import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { setEndDatePlate, setStartDatePlate } from '../../actions/date';
import { initSortByClient, initSortByDate, initSortByHour, initSortByLocation, initSortByMembership, initSortByPlate, initSortByTimes, PlateData, PlateSearch, setDatePlates } from '../../actions/plate';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2'
import { BoxPLate } from '../boxes/BoxPLate';
import { DateChange } from '../date/DateChange';
import Pagination from 'react-paginating';



export const SearchScreen = () => {
    const dispatch = useDispatch();
    const { isMenu } = useSelector(state => state.ui);
    const {dateStartPlate,dateEndPlate} = useSelector( state => state.date );
    const [currentPage, setCurrentPage] = useState(1)
    const {
        topPlate,
        topPLateMonth,
        countPlate,
        totalPlates,
        isLoading
    } = useSelector(state => state.plate);

    const [valueInput, handleInputChange,resetForm] = useForm({
        lINputPlate: ''
    })
    const { lINputPlate } = valueInput


    useEffect(() => {
        dispatch(PlateData())
    }, [dispatch])

    console.log("TOTAL PLATES", totalPlates);

    const searchPlate = (e) => {
        e.preventDefault();
        if(lINputPlate.length>1 && lINputPlate.length<6){
            return Swal.fire('Error','Debe de contener al menos 6 caracteres','error')
        }
        dispatch(PlateSearch(lINputPlate))
        resetForm()
        setCurrentPage(1)
       
    }

    const handlePageChange = (page, e) => {
        setCurrentPage(page)
        let searchValue=false;
        let rangeDate=false;
        if(dateStartPlate!=='2020-07-01' || dateEndPlate!==moment().format('YYYY-MM-DD')){
            rangeDate=`&date_from=${dateStartPlate}&date_to=${dateEndPlate}`
        }
        searchValue= lINputPlate.length>5 ? lINputPlate : false;
        const offset=(page-1)*10
        dispatch(PlateData(offset,searchValue,rangeDate)) 
    }
    const sortPlate = () => {
        dispatch(initSortByPlate())
    }
    const sortDate = () => {
        dispatch(initSortByDate())
    }
    const sortHour = () => {
        dispatch(initSortByHour())
    }
    const sortLocation = () => {
        dispatch(initSortByLocation())
    }
    const sortTimes = () => {
        dispatch(initSortByTimes())
    }
    const sortClient = () => {
        dispatch(initSortByClient())
    }
    const sortMembership = () => {
        dispatch(initSortByMembership())
    }


    return (
        <div className={`_d__grid ${!isMenu ? "active" : ""}`}>
            <div>
            </div>
            <div className="contenedor contet_index ">
                <h2 className="mt __title_">VEHÍCULOS - PLACAS </h2>

                <div className="__grid_plate mt">
                    <div className="box__share">
                        <BoxPLate plate={topPlate.plate} nveces={topPlate.occurency} textTop="Top Vehículo " date="2020-08-15" />
                        <BoxPLate plate={topPLateMonth.plate} nveces={topPLateMonth.occurency} textTop="Top Vehículo este mes" date="2020-08-15" />
                    </div>
                    <div className=" __p_plage">
                        <p>Buscador de Placa</p>

                        <form onSubmit={searchPlate} className="buscador">
                            <div className="cont_s">
                                <input name="lINputPlate" onChange={handleInputChange} type="text" className="input_search" placeholder="Busca aqui tu placa" value={lINputPlate} />
                                <div className="icon_search">
                                    <img onClick={searchPlate} src="assets/iconos/icon-search.svg" alt="" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="content_plates_filtered mt">
                    <div className="__group_filtered_export __d_flex">
                        <div className="__title_plates_list">PLACAS</div>
                        <div className=" __filtered_ranges_date __d_flex">
                            <img src="./assets/iconos/filter.svg" alt="filter" />
                            <DateChange startDate={moment('2020-07-02').format("YYYY-MM-DD")}
                                endDate={moment().add(1, 'days').format("YYYY-MM-DD")}
                                method={setDatePlates} methodStart={setStartDatePlate}
                                methodEnd={setEndDatePlate}
                                flexColumn={false}
                                isPlate={true}
                                methodPlate={setCurrentPage}
                                inputReset={'.input_search'}
                            />
                        </div>
                    </div>
                    <table className="__table_plates">

                        <thead>
                            <tr>
                                <th className="text-left"   onClick={sortPlate}>Placa</th>
                                <th className="text-left"   onClick={sortDate}>Fecha</th>
                                <th className="text-left"   onClick={sortHour}>Hora</th>
                                <th className="text-left"   onClick={sortLocation}>Ubicación</th>
                                <th className="text-center" onClick={sortTimes}># Veces</th>
                                <th className="text-center" onClick={sortClient}>Cliente</th>
                                <th className="text-center" onClick={sortMembership}>Membresía</th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading && (

                                <tr aria-colspan="7" className="__loading_data text-center"><td colSpan="7"><img src="./assets/load/qonteo.gif" alt="spinner_loaded" /></td></tr>

                            )}
                            {
                                totalPlates.map(({ plate, date, time, location, occurency, client_p, membership_p }, index) =>
                                    <tr key={index}>
                                        <td className="text-bold text-gris">{plate}</td>
                                        <td className="text-gris font-500">{date}</td>
                                        <td className="text-gris font-500">{time}</td>
                                        <td className="text-gris font-500">{location}</td>
                                        <td className="text-center text-gris font-500" >{occurency}</td>
                                        <td className="text-center text-gris font-500">{client_p ? 'SI' : 'NO'}</td>
                                        <td className="text-center text-gris font-500">{membership_p ? 'SI' : 'NO'}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                    <Pagination
                        className="pagination"
                        total={countPlate}
                        limit={10}
                        pageCount={10}
                        currentPage={currentPage}
                    >
                        {({
                            pages,
                            currentPage,
                            hasNextPage,
                            hasPreviousPage,
                            previousPage,
                            nextPage,
                            totalPages,
                            getPageItemProps
                        }) => (
                                <ul role="button">


                                    {hasPreviousPage && (
                                        <li role="button"
                                            {...getPageItemProps({
                                                pageValue: previousPage,
                                                onPageChange: handlePageChange
                                            })}
                                        >
                                            {'<'}
                                        </li>
                                    )}

                                    {pages.map(page => {

                                        let active = null;
                                        if (currentPage === page) {
                                            active = 'active';
                                        }
                                        return (
                                            <li role="button"
                                                {...getPageItemProps({
                                                    pageValue: page,
                                                    key: page,
                                                    className: active,
                                                    "aria-label":"pagina",
                                                    onPageChange: handlePageChange
                                                })}
                                            >
                                                {page}
                                            </li>
                                        );
                                    })}

                                    {hasNextPage && (
                                        <li role="button"
                                            {...getPageItemProps({
                                                pageValue: nextPage,
                                                onPageChange: handlePageChange
                                            })}
                                        >
                                            {'>'}
                                        </li>
                                    )}
                                </ul>
                            )}
                    </Pagination>




                </div>



            </div>
        </div>
    )
}
