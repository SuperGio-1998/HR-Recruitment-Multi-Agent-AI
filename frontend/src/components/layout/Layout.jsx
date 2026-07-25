function Layout({ children }) {


    return (

        <div className="min-h-screen bg-slate-100">


            <nav className="
                bg-white
                border-b
                border-slate-200
                shadow-sm
            ">


                <div className="
                    max-w-7xl
                    mx-auto
                    px-8
                    py-5
                    flex
                    justify-between
                    items-center
                ">



                    <div>


                        <h1 className="
                            text-2xl
                            font-bold
                            text-slate-800
                        ">

                            HR Recruitment AI

                        </h1>



                        <p className="
                            text-sm
                            text-slate-500
                            mt-1
                        ">

                            AI Powered Recruitment Platform

                        </p>


                    </div>





                    <div className="
                        text-sm
                        font-semibold
                        text-slate-600
                    ">

                        Recruitment Dashboard

                    </div>




                </div>


            </nav>







            {children}





        </div>

    );


}


export default Layout;