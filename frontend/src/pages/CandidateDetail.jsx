import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function CandidateDetail() {


    const { candidate_id } = useParams();

    const navigate = useNavigate();


    const [candidate, setCandidate] = useState(null);

    const [loading, setLoading] = useState(true);





    useEffect(() => {

        loadCandidate();

    }, []);






    const loadCandidate = async () => {


        try {


            const response = await axios.get(

                `http://127.0.0.1:8000/candidate/${candidate_id}`

            );


            setCandidate(response.data);



        } catch (error) {


            console.error(error);



        } finally {


            setLoading(false);


        }


    };







    if (loading) {


        return (

            <div className="text-center py-10">

                Loading candidate details...

            </div>

        );

    }







    if (!candidate) {


        return (

            <div className="text-center py-10 text-red-600">

                Candidate not found

            </div>

        );

    }






    const profile = candidate.candidate;

    const evaluation = candidate.evaluation;







    return (


        <div className="
            min-h-screen
            bg-slate-100
            px-8
            py-10
        ">



            <div className="
                max-w-5xl
                mx-auto
            ">





                <button

                    onClick={() => navigate("/")}

                    className="
                        mb-6
                        bg-slate-800
                        hover:bg-slate-900
                        text-white
                        px-5
                        py-3
                        rounded-xl
                        font-semibold
                    "

                >

                    ← Back to Candidates

                </button>







                <div className="
                    space-y-8
                ">





                    <div className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        border-slate-200
                        p-8
                    ">



                        <h1 className="
                            text-3xl
                            font-bold
                            text-slate-800
                        ">

                            Candidate Profile

                        </h1>



                        <p className="
                            text-slate-500
                            mt-2
                        ">

                            AI Generated Candidate Evaluation

                        </p>







                        <div className="
                            mt-8
                            grid
                            md:grid-cols-2
                            gap-6
                        ">




                            <div>

                                <p className="text-sm text-slate-500">

                                    Candidate Name

                                </p>


                                <h2 className="
                                    text-xl
                                    font-semibold
                                ">

                                    {profile.candidate_name}

                                </h2>


                            </div>







                            <div>

                                <p className="text-sm text-slate-500">

                                    Resume

                                </p>


                                <h2 className="text-lg">

                                    {profile.resume_filename}

                                </h2>


                            </div>







                            <div>

                                <p className="text-sm text-slate-500">

                                    Created Date

                                </p>


                                <h2 className="text-lg">

                                    {profile.created_at}

                                </h2>


                            </div>





                        </div>




                    </div>









                    <div className="
                        grid
                        md:grid-cols-3
                        gap-6
                    ">





                        <div className="
                            bg-blue-50
                            rounded-2xl
                            p-6
                            border
                            border-blue-100
                        ">


                            <p className="text-sm text-slate-500">

                                Match Score

                            </p>


                            <h2 className="
                                text-4xl
                                font-bold
                                text-blue-700
                            ">

                                {evaluation.match_percentage}%

                            </h2>


                        </div>







                        <div className="
                            bg-green-50
                            rounded-2xl
                            p-6
                            border
                            border-green-100
                        ">


                            <p className="text-sm text-slate-500">

                                Decision

                            </p>


                            <h2 className="
                                text-3xl
                                font-bold
                                text-green-700
                            ">

                                {evaluation.decision}

                            </h2>


                        </div>







                        <div className="
                            bg-purple-50
                            rounded-2xl
                            p-6
                            border
                            border-purple-100
                        ">


                            <p className="text-sm text-slate-500">

                                Confidence Score

                            </p>


                            <h2 className="
                                text-4xl
                                font-bold
                                text-purple-700
                            ">

                                {evaluation.confidence_score}%

                            </h2>


                        </div>





                    </div>









                    <div className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        border-slate-200
                        p-8
                    ">


                        <h2 className="
                            text-2xl
                            font-bold
                            mb-4
                        ">

                            AI Reasoning

                        </h2>




                        <p className="
                            text-slate-600
                            leading-relaxed
                        ">

                            {evaluation.reason}

                        </p>




                    </div>





                </div>



            </div>



        </div>


    );


}


export default CandidateDetail;