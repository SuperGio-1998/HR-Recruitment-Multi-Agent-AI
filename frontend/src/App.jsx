import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Layout from "./components/layout/Layout";

import CandidateTable from "./components/CandidateTable";
import SummaryCards from "./components/dashboard/SummaryCards";
import Analytics from "./components/dashboard/Analytics";
import AIActivity from "./components/dashboard/AIActivity";

import CandidateDetail from "./pages/CandidateDetail";
import ResumeUpload from "./components/upload/ResumeUpload";





function Dashboard() {



    const scrollToSection = (id) => {

        document
            .getElementById(id)
            ?.scrollIntoView({

                behavior: "smooth"

            });

    };







    return (


        <Layout>


            <div className="
                max-w-7xl
                mx-auto
                px-8
                py-10
            ">





                {/* Hero Section */}


                <div className="
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-700
                    rounded-3xl
                    p-10
                    text-white
                    shadow-lg
                    mb-12
                ">



                    <h1 className="
                        text-4xl
                        font-bold
                        mb-4
                    ">

                        AI Talent Intelligence Platform

                    </h1>





                    <p className="
                        text-lg
                        text-blue-100
                        max-w-2xl
                    ">

                        Analyze resumes, evaluate candidate skills,
                        and generate smarter hiring decisions using
                        AI-powered recruitment intelligence.

                    </p>







                    <div className="
                        mt-8
                        flex
                        gap-4
                    ">


                        <button

                            onClick={() =>
                                scrollToSection("evaluate")
                            }

                            className="
                                bg-white
                                text-blue-700
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                hover:bg-blue-50
                                transition
                            "

                        >

                            Evaluate New Candidate

                        </button>






                        <button

                            onClick={() =>
                                scrollToSection("candidates")
                            }

                            className="
                                border
                                border-white
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                hover:bg-white/10
                                transition
                            "

                        >

                            View Candidates

                        </button>



                    </div>




                </div>









                <div className="space-y-12">







                    {/* Dashboard Overview */}


                    <section>


                        <div className="mb-6">


                            <h2 className="
                                text-2xl
                                font-bold
                                text-slate-800
                            ">

                                Dashboard Overview

                            </h2>



                            <p className="
                                text-slate-500
                                mt-1
                            ">

                                Monitor recruitment performance and candidate statistics.

                            </p>


                        </div>



                        <SummaryCards />


                    </section>









                    {/* AI Intelligence */}


                    <section>


                        <div className="mb-6">


                            <h2 className="
                                text-2xl
                                font-bold
                                text-slate-800
                            ">

                                AI Intelligence

                            </h2>



                            <p className="
                                text-slate-500
                                mt-1
                            ">

                                Track AI-driven evaluation insights and recruitment workflow.

                            </p>


                        </div>





                        <div className="space-y-8">


                            <Analytics />


                            <AIActivity />


                        </div>




                    </section>









                    {/* Candidate Evaluation */}


                    <section id="evaluate">


                        <div className="mb-6">


                            <h2 className="
                                text-2xl
                                font-bold
                                text-slate-800
                            ">

                                Candidate Evaluation

                            </h2>



                            <p className="
                                text-slate-500
                                mt-1
                            ">

                                Upload resumes and let AI analyze candidate suitability.

                            </p>


                        </div>




                        <ResumeUpload />



                    </section>









                    {/* Candidate Management */}


                    <section id="candidates">


                        <div className="mb-6">


                            <h2 className="
                                text-2xl
                                font-bold
                                text-slate-800
                            ">

                                Candidate Management

                            </h2>



                            <p className="
                                text-slate-500
                                mt-1
                            ">

                                Review evaluated applicants and hiring recommendations.

                            </p>


                        </div>





                        <CandidateTable />



                    </section>








                </div>





            </div>


        </Layout>


    );


}









function App() {


    return (


        <BrowserRouter>


            <Routes>


                <Route

                    path="/"

                    element={<Dashboard />}

                />





                <Route

                    path="/candidate/:candidate_id"

                    element={

                        <Layout>

                            <CandidateDetail />

                        </Layout>

                    }

                />



            </Routes>


        </BrowserRouter>


    );


}





export default App;