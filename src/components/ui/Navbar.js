import React from 'react'

export const Navbar = () => {
    return (
        <header>
             <div className="site_header">

                <div className="left_logo">
                    <img id="logoDataPerformanceMobile"  src="../assets/imagenes/logo.png"  alt="logo_qonteo"/>
                </div>
                <div className="right_text">
                    <h1 className="text_p">
                        Data <br></br> Street <br></br> Performance
                    </h1>
                </div>
            </div>
            <div className="logo_soda">
            <img id="logoSodaMobile" src="../assets/imagenes/soda_logo.png" alt="logo_qonteo" />
            </div>

        </header>
    )
}
