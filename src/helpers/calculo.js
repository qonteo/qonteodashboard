const formatNumber=(num)=> {
    if(num===null){
        return 0
    }
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}



const porcentajepersona=(total=100, num=20)=> {
    const resultado=Math.round((num * 100) / total);
    return resultado;
}



export {
    formatNumber,
    porcentajepersona,
}