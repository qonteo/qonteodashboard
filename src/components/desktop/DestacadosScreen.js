import React from 'react'
import { useSelector } from 'react-redux';
import { BoxPrimary } from '../boxes/BoxPrimary';
import { BoxRangeTime } from '../boxes/BoxRangeTime';



export const DestacadosScreen = () => {
    const { isMenu } = useSelector(state => state.ui);

    return (
        <div className={`_d__grid ${!isMenu ? "active" : ""}`}>
            <div>
            </div>
            <div className="contenedor contet_index ">
                <h2 className="text-primary text-center">Datos Destacados</h2>
                <div className="__grilla_4 mt">
                    <BoxPrimary textHeadLeft="carro-white.svg"  textBottom="MEJOR HORA DEL DÍA" cantidad={'11:05HRS'} text1="Carros" />
                    <BoxPrimary textHeadLeft="camion-white.svg" textBottom="MEJOR HORA DEL DÍA" cantidad={'11:05HRS'} text1="Camiones" />
                    <BoxPrimary textHeadLeft="moto-white.svg"   textBottom="MEJOR HORA DEL DÍA" cantidad={'11:05HRS'} text1="Motos" />
                    <BoxPrimary textHeadLeft="suvs-white.svg"   textBottom="MEJOR HORA DEL DÍA" cantidad={'11:05HRS'} text1="SUVs" />
                </div>
                <div className="__grilla_4 mt">
                    <BoxPrimary textHeadLeft="carro-white.svg"  textBottom="MEJOR DÍA DE LA SEMANA" cantidad={'LUNES'} text1="Carros" />
                    <BoxPrimary textHeadLeft="camion-white.svg" textBottom="MEJOR DÍA DE LA SEMANA" cantidad={'MARTES'} text1="Camiones" />
                    <BoxPrimary textHeadLeft="moto-white.svg"   textBottom="MEJOR DÍA DE LA SEMANA" cantidad={'MARTES'} text1="Motos" />
                    <BoxPrimary textHeadLeft="suvs-white.svg"   textBottom="MEJOR DÍA DE LA SEMANA" cantidad={'VIERNES'} text1="SUVs" />
                </div>
                <div className="__grilla_4 mt">
                    <BoxPrimary textHeadLeft="carro-white.svg"  textBottom="PROMEDIO DEL DÍA" cantidad={3200} text1="Carros" />
                    <BoxPrimary textHeadLeft="camion-white.svg" textBottom="PROMEDIO DEL DÍA" cantidad={3200} text1="Camiones" />
                    <BoxPrimary textHeadLeft="moto-white.svg"   textBottom="PROMEDIO DEL DÍA" cantidad={3200} text1="Motos" />
                    <BoxPrimary textHeadLeft="suvs-white.svg"   textBottom="PROMEDIO DEL DÍA" cantidad={3200} text1="SUVs" />
                </div>
                <div className="__grilla_2 mt">
                        <BoxRangeTime  />
                </div>

            </div>
        </div>
    )
}
