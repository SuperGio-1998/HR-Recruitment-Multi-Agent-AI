import { useEffect, useState } from "react";
import { getCandidates } from "../services/api";

import {
    Eye,
    User,
    FileText
} from "lucide-react";



function CandidateTable() {


    const [candidates, setCandidates] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");





    useEffect(() => {

        loadCandidates();

    }, []);





    const loadCandidates = async () => {


        try {


            const data = await getCandidates();


            setCandidates(

                data.results

            );


        } catch (err) {


            console.error(err);


            setError(

                "Failed to load candidates"

            );


        } finally {


            setLoading(false);


        }


    };








    if (loading) {

        return (

            <div className="
                bg-white
                rounded-3xl
                shadow-sm
                p-8
                text-center
            ">

                Loading candidates...

            </div>

        );

    }







    if (error) {

        return (

            <div className="
                bg-white
                rounded-3xl
                shadow-sm
                p-8
                text-center
                text-red-500
            ">

                {error}

            </div>

        );

    }








    return (


        <div className="

            bg-white

            rounded-3xl

            shadow-lg

            border

            border-slate-200

            overflow-hidden

        ">




            <div className="

                p-8

                border-b

                border-slate-200

            ">


                <h2 className="

                    text-2xl

                    font-bold

                    text-slate-800

                ">

                    Candidates

                </h2>



                <p className="

                    text-slate-500

                    mt-1

                ">

                    Manage evaluated applicants

                </p>


            </div>









            <div className="overflow-x-auto">


                <table className="

                    w-full

                ">


                    <thead className="

                        bg-slate-50

                    ">


                        <tr>


                            <th className="

                                text-left

                                px-8

                                py-5

                                text-sm

                                text-slate-500

                                font-semibold

                            ">

                                Candidate

                            </th>




                            <th className="

                                text-left

                                px-8

                                py-5

                                text-sm

                                text-slate-500

                                font-semibold

                            ">

                                Resume

                            </th>




                            <th className="

                                text-left

                                px-8

                                py-5

                                text-sm

                                text-slate-500

                                font-semibold

                            ">

                                Score

                            </th>




                            <th className="

                                text-left

                                px-8

                                py-5

                                text-sm

                                text-slate-500

                                font-semibold

                            ">

                                Decision

                            </th>




                            <th className="

                                text-left

                                px-8

                                py-5

                                text-sm

                                text-slate-500

                                font-semibold

                            ">

                                Action

                            </th>


                        </tr>


                    </thead>









                    <tbody>


                    {

                        candidates.map((candidate) => (



                            <tr

                                key={candidate.id}

                                className="

                                    border-t

                                    border-slate-100

                                    hover:bg-slate-50

                                    transition

                                "

                            >





                                <td className="

                                    px-8

                                    py-5

                                ">


                                    <div className="

                                        flex

                                        items-center

                                        gap-3

                                    ">


                                        <div className="

                                            w-10

                                            h-10

                                            rounded-full

                                            bg-blue-100

                                            flex

                                            items-center

                                            justify-center

                                        ">


                                            <User

                                                size={20}

                                                className="text-blue-600"

                                            />


                                        </div>




                                        <div>


                                            <p className="

                                                font-semibold

                                                text-slate-800

                                            ">


                                                {candidate.candidate_name}


                                            </p>



                                        </div>



                                    </div>



                                </td>









                                <td className="

                                    px-8

                                    py-5

                                ">


                                    <div className="

                                        flex

                                        items-center

                                        gap-2

                                        text-slate-600

                                    ">


                                        <FileText size={18}/>


                                        <span className="text-sm">

                                            {candidate.resume_filename}

                                        </span>


                                    </div>



                                </td>









                                <td className="

                                    px-8

                                    py-5

                                    min-w-[200px]

                                ">


                                    <div className="

                                        flex

                                        justify-between

                                        text-sm

                                        mb-2

                                    ">


                                        <span className="font-semibold">

                                            {candidate.match_percentage}%

                                        </span>


                                    </div>





                                    <div className="

                                        h-2

                                        bg-slate-200

                                        rounded-full

                                    ">


                                        <div

                                            className="

                                                h-2

                                                bg-gradient-to-r

                                                from-blue-500

                                                to-indigo-600

                                                rounded-full

                                            "

                                            style={{

                                                width:

                                                `${candidate.match_percentage}%`

                                            }}

                                        >


                                        </div>


                                    </div>



                                </td>









                                <td className="px-8 py-5">



                                    {

                                        candidate.decision === "Hire" ?


                                        <span className="

                                            px-4

                                            py-2

                                            rounded-full

                                            text-sm

                                            font-semibold

                                            bg-green-100

                                            text-green-700

                                        ">

                                            Hire

                                        </span>


                                        :


                                        <span className="

                                            px-4

                                            py-2

                                            rounded-full

                                            text-sm

                                            font-semibold

                                            bg-red-100

                                            text-red-700

                                        ">

                                            Reject

                                        </span>


                                    }



                                </td>









                                <td className="px-8 py-5">


                                    <button

                                        onClick={() =>

                                            window.location.href =

                                            `/candidate/${candidate.id}`

                                        }

                                        className="

                                            flex

                                            items-center

                                            gap-2

                                            px-4

                                            py-2

                                            rounded-xl

                                            bg-slate-900

                                            text-white

                                            text-sm

                                            font-semibold

                                            hover:bg-blue-600

                                            transition

                                        "

                                    >


                                        <Eye size={16}/>


                                        View


                                    </button>



                                </td>





                            </tr>



                        ))

                    }


                    </tbody>




                </table>



            </div>




        </div>


    );


}



export default CandidateTable;