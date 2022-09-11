import moment from 'moment'
import jsPDF from 'jspdf'
import { saveAs } from 'file-saver';
import { fetchConToken } from "./fetch";

const downloadImage = async (grafic, text, bgColor, numberX, initDate, finDate, interval, type) => {
    const canvas = document.querySelector(`#${grafic} canvas:last-of-type`);
    let ctx = canvas.getContext("2d");
    ctx.font = "bold 12px Barlow";
    ctx.fillStyle = "black";
    ctx.fillText(`${text}`, parseInt(numberX), 50); //10

    ctx.font = "9px Barlow";
    ctx.fillStyle = "black";
    ctx.fillText(`${moment(initDate).format("YYYY/MM/DD")} - ${moment(finDate).format("YYYY/MM/DD")}`, 120, 85);

    ctx.font = "11px Barlow";
    ctx.fillStyle = "black";
    ctx.fillText(`Reporte generado ${moment().format("YYYY-MM-DD HH:mm:ss")} CO.PMXCO.BOG.A01`, 30, 70);
    const img = document.getElementById("logoDataPerformanceMobile");
    ctx.drawImage(img, 10, 10, 40, 20);

    const img2 = document.getElementById("logoSodaMobile");
    ctx.drawImage(img2, 290, 15, 40, 10);

    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    const url_base64jp = canvas.toDataURL("image/jpg");
    ctx.clearRect(10, 37, 600, 30);
    ctx.clearRect(35, 70, 300, 50);

    const linkHref = document.createElement('a');

    const resp = await fetchConToken('/upload-image', {
        data: {
            user_id: "704",
            type,
            interval,
            date_from: moment(initDate).format('YYYY/MM/DD"'),
            date_to: moment(finDate).format('YYYY/MM/DD"'),
            image: url_base64jp
        }
    }, 'POST');
    const body = await resp.json();
    linkHref.setAttribute('target', '__blank');
    linkHref.href = body.url;
    linkHref.click();
}
const exportGraficVehicle = async (type,interval,dateFrom,dateTo) => {
    const peticion=await fetchConToken('/export', {
        "type": type,
        "format": "csv",
        "interval": interval,
        "date_from":dateFrom,
        "date_to":dateTo
    },'POST')
    const json=await peticion.blob();
    return json;
}

const exportExcel = (type, inititalDate, endDate, filename) => {
    exportGraficVehicle('p', type, moment(inititalDate).format("YYYY-MM-DD"), moment(endDate).format("YYYY-MM-DD")).then(r => saveAs(r, `DSP-SODA-CO-PMXCO-BOG-A01-${moment(inititalDate).format("YYYYMMDD")}-${moment(endDate).format("YYYYMMDD")}-TOTAL-${filename}.csv`))
}

const exportPdf = (grafic, initDate, finDate, title, text, year) => {

    const url_base64jp = document.querySelector(`#${grafic} canvas`).toDataURL("image/jpg");
    const doc = new jsPDF('l', 'pt');
    const img = new Image()
    img.src = './assets/pdf/logoleft.png'
    const img2 = new Image()
    img2.src = './assets/pdf/logorigth.png'
    doc.addImage(img, 'png', 30, 10, 100, 20)
    doc.addImage(img2, 'png', 750, 13, 65, 15)

    doc.text(250, 90, title)

    doc.setFontSize(9);
    doc.text(650, 140, `Rango: ${moment(initDate).format("YYYY/MM/DD")} - ${moment(finDate).format("YYYY/MM/DD")}`)

    doc.setFontSize(9);
    doc.text(50, 140, text)


    if (year === true) {
        doc.setFontSize(13);
        doc.text(330, 180, `${moment(initDate).format("MMMM").toUpperCase()} ${moment(initDate).format("YYYY")} - ${moment(finDate).format("MMMM").toUpperCase()} ${moment(initDate).format("YYYY")}`)
    }



    doc.addImage(url_base64jp, 'jpg', 120, 150, 600, 400);


    doc.setFontSize(9);
    doc.text(50, 570, `Reporte generado ${moment().format("YYYY-MM-DD HH:mm:ss")} CO.PMXCO.BOG.A01`)


    doc.save(`DSP-SODA-CO-PMXCO-BOG-A01-${moment(initDate).format("YYYYMMDD")}-${moment(finDate).format("YYYYMMDD")}-${title.replace(/\s/g, '-')}.pdf`)
}

const downloadImageDesktop = (grafic, text, initDate, finDate, bgColor, numberX, interval, type, textMax, year = false) => {
    const canvas = document.querySelector(`#${grafic} canvas:last-of-type`);
    let ctx = canvas.getContext("2d");

    ctx.font = "25px Barlow";
    ctx.fillStyle = "black";
    ctx.fillText(`${text}`, numberX, 60);


    ctx.font = "18px Barlow";
    ctx.fillStyle = "black";
    ctx.fillText(`${textMax}`, 20, 150);

    if (year === true) {
        ctx.font = "18px Barlow";
        ctx.fillStyle = "black";
        ctx.fillText(`${moment(initDate).format("MMMM").toUpperCase()} ${moment(initDate).format("YYYY")} - ${moment(finDate).format("MMMM").toUpperCase()} ${moment(initDate).format("YYYY")}`, 480, 200);
    }

    ctx.font = "18px Barlow";
    ctx.fillStyle = "black";
    ctx.fillText(`Rango: ${moment(initDate).format("YYYY/MM/DD")} - ${moment(finDate).format("YYYY/MM/DD")}`, 800, 150);

    ctx.font = "15px Barlow";
    ctx.fillStyle = "black";
    ctx.fillText(`Reporte generado ${moment().format("YYYY-MM-DD HH:mm:ss")} CO.PMXCO.BOG.A01`, 30, 750, canvas.width);
    const img = document.getElementById("logoDataPerformance");
    ctx.drawImage(img, 40, 40, 200, 40);
    const img2 = document.getElementById("logoSoda");
    ctx.drawImage(img2, 970, 50, 100, 25);

    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    const url_base64jp = canvas.toDataURL("image/jpg")
    ctx.clearRect(250, 33, 1000, 30);
    ctx.clearRect(380, 80, 600, 30);
    ctx.clearRect(900, 740, 600, 50);
    const linkHref = document.createElement('a');



    fetchConToken('/upload-image', {
        data: {
            user_id: "704",
            type,
            interval,
            date_from: moment(initDate).format('YYYY/MM/DD"'),
            date_to: moment(finDate).format('YYYY/MM/DD"'),
            image: url_base64jp
        }
    }, 'POST').then(resp => resp.json()).then((resp) => {
        linkHref.setAttribute('target', '__blank');
        linkHref.href = resp.url;
        linkHref.click();
    })
}



const downloadHeatMapImage = () => {
    const svgElement = document.querySelector('#heatmap svg');
    const xml = new XMLSerializer()
    const svgAsXML = xml.serializeToString(svgElement);
    const url = "data:image/svg+xml," + encodeURIComponent(svgAsXML);

    const can = document.createElement('canvas'); // Not shown on page
    can.width = 1100;
    can.height = 800
    const ctx = can.getContext('2d');
    ctx.font = "25px Barlow";
    ctx.fillStyle = "black";
    ctx.fillText('TOTAL SEMANA-ACUMULADO PERSONAS POR HORA DEL DÍA', 270, 60);
    ctx.font = "16px Barlow";
    ctx.fillStyle = "black";
    ctx.fillText('(Ultimos 7 Días)', 530, 90);

    ctx.font = "15px Barlow";
    ctx.fillStyle = "black";
    ctx.fillText(`Reporte generado ${moment().format("YYYY-MM-DD HH:mm:ss")} CO.PMXCO.BOG.A01`, 30, 780, can.width);
    const img = document.getElementById("logoDataPerformance");
    ctx.drawImage(img, 40, 40, 200, 40);
    const img2 = document.getElementById("logoSoda");
    ctx.drawImage(img2, 970, 50, 100, 25);

    const image = document.createElement('img');
    image.src = url;
    const linkHref = document.createElement('a');
    setTimeout(() => {
        ctx.drawImage(image, 280, 125, 500, 600);
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, can.width, can.height);
        ctx.restore();
        const base_64 = can.toDataURL('image/png')

        fetchConToken('/upload-image', {
            data: {
                user_id: "704",
                type: 'p',
                interval: 'hour',
                date_from: moment().subtract(7, 'd').format('YYYY/MM/DD"'),
                date_to: moment().format('YYYY/MM/DD"'),
                image: base_64
            }
        }, 'POST').then(resp => resp.json()).then((resp) => {
            linkHref.setAttribute('target', '__blank');
            linkHref.href = resp.url;
            linkHref.click();
        })


    }, 500);

}


const downloadPdfHeatMap = () => {
    const doc = new jsPDF('l', 'pt');
    const img = new Image()
    img.src = './assets/pdf/logoleft.png'
    const img2 = new Image()
    img2.src = './assets/pdf/logorigth.png'
    doc.addImage(img, 'png', 30, 10, 100, 20)
    doc.addImage(img2, 'png', 750, 13, 65, 15)

    doc.text(190, 70, "TOTAL SEMANA-ACUMULADO PERSONAS POR HORA DEL DÍA")


    doc.setFontSize(15);
    doc.text(380, 100, "(Ultimos 7 Días)")


    doc.setFontSize(9);
    doc.text(50, 570, `Reporte generado ${moment().format("YYYY-MM-DD HH:mm:ss")} CO.PMXCO.BOG.A01`)



    const svgElement = document.querySelector('#heatmap svg');
    const xml = new XMLSerializer();
    const svgAsXML = xml.serializeToString(svgElement);
    const url = "data:image/svg+xml," + encodeURIComponent(svgAsXML);

    const can = document.createElement('canvas'); // Not shown on page
    can.width = 800;
    can.height = 800
    const ctx = can.getContext('2d');

    const image = document.createElement('img');
    image.src = url;

    setTimeout(() => {
        ctx.drawImage(image, 150, 125, 500, 600);
        const base_64 = can.toDataURL('image/png')
        doc.addImage(base_64, 'jpg', 170, 40, 500, 550);

        doc.save(`DSP-SODA-CO-PMXCO-BOG-A01-MAPA-DE-CALOR-ULTIMOS-7-DIAS.pdf`)
    }, 500);


}



export {
    downloadImage,
    exportExcel,
    exportPdf,
    downloadImageDesktop,
    downloadHeatMapImage,
    downloadPdfHeatMap
}