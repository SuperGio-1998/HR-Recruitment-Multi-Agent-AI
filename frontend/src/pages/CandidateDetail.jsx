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





                <div className="space-y-8">





                    <div className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        p-8
                    ">


                        <h1 className="
                            text-3xl
                            font-bold
                            text-slate-800
                        ">

                            Candidate Profile

                        </h1>



                        <p className="text-slate-500 mt-2">

                            AI Generated Candidate Evaluation

                        </p>




                        <div className="
                            mt-8
                            grid
                            md:grid-cols-3
                            gap-6
                        ">



                            <div>

                                <p className="text-sm text-slate-500">
                                    Candidate Name
                                </p>

                                <h2 className="text-xl font-semibold">
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
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        p-8
                    ">


                        <h2 className="
                            text-2xl
                            font-bold
                            mb-6
                        ">

                            AI Intelligence Summary

                        </h2>




                        <div className="
                            grid
                            md:grid-cols-4
                            gap-5
                        ">


                            <div className="bg-indigo-50 p-5 rounded-xl">

                                <p className="text-sm text-slate-500">
                                    Ranking
                                </p>

                                <h2 className="text-3xl font-bold text-indigo-700">

                                    {evaluation.ranking}

                                </h2>

                            </div>




                            <div className="bg-blue-50 p-5 rounded-xl">

                                <p className="text-sm text-slate-500">
                                    Overall Score
                                </p>

                                <h2 className="text-3xl font-bold text-blue-700">

                                    {evaluation.overall_score}

                                </h2>

                            </div>





                            <div className="bg-green-50 p-5 rounded-xl">

                                <p className="text-sm text-slate-500">
                                    Hire Probability
                                </p>

                                <h2 className="text-3xl font-bold text-green-700">

                                    {evaluation.hire_probability}%

                                </h2>

                            </div>





                            <div className="bg-purple-50 p-5 rounded-xl">

                                <p className="text-sm text-slate-500">
                                    Category
                                </p>

                                <h2 className="text-lg font-bold text-purple-700">

                                    {evaluation.candidate_category}

                                </h2>

                            </div>



                        </div>



                    </div>







                    <div className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        p-8
                    ">


                        <h2 className="text-2xl font-bold mb-6">

                            Score Breakdown

                        </h2>




                        <div className="space-y-4">


                            <div className="flex justify-between">

                                <span>
                                    Match Score
                                </span>

                                <b>
                                    {evaluation.match_percentage}%
                                </b>

                            </div>




                            <div className="flex justify-between">

                                <span>
                                    Technical Fit
                                </span>

                                <b>
                                    {evaluation.technical_fit_score}%
                                </b>

                            </div>




                            <div className="flex justify-between">

                                <span>
                                    Interview Score
                                </span>

                                <b>
                                    {evaluation.interview_score}%
                                </b>

                            </div>




                        </div>


                    </div>







                    <div className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        p-8
                    ">


                        <h2 className="text-2xl font-bold mb-4">

                            Decision

                        </h2>



                        <p className="
                            text-3xl
                            font-bold
                            text-green-700
                        ">

                            {evaluation.decision}

                        </p>



                    </div>








                    <div className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        p-8
                    ">


                        <h2 className="text-2xl font-bold mb-4">

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