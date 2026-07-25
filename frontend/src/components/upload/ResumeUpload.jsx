import { useState } from "react";

import {
    UploadCloud,
    FileText,
    Sparkles
} from "lucide-react";

import axios from "axios";



function ResumeUpload() {


    const [jobRequirement, setJobRequirement] = useState("");

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");







    const handleSubmit = async (e) => {


        e.preventDefault();


        if (!file) {

            setMessage("Please upload a resume PDF");

            return;

        }



        try {


            setLoading(true);


            const formData = new FormData();


            formData.append(

                "job_requirement",

                jobRequirement

            );


            formData.append(

                "file",

                file

            );



            await axios.post(

                "http://127.0.0.1:8000/evaluate-resume",

                formData

            );



            setMessage(

                "Candidate evaluated successfully"

            );


            setFile(null);

            setJobRequirement("");



        } catch (error) {


            console.error(error);


            setMessage(

                "Evaluation failed"

            );


        } finally {


            setLoading(false);


        }


    };








    return (


        <div className="

            bg-white

            rounded-3xl

            shadow-lg

            border

            border-slate-200

            p-8

        ">



            <div className="flex items-center gap-3 mb-6">


                <div className="

                    w-12

                    h-12

                    rounded-2xl

                    bg-gradient-to-r

                    from-blue-500

                    to-indigo-600

                    flex

                    items-center

                    justify-center

                    shadow-lg

                ">


                    <Sparkles

                        className="text-white"

                        size={24}

                    />


                </div>



                <div>


                    <h2 className="

                        text-2xl

                        font-bold

                        text-slate-800

                    ">

                        Evaluate New Candidate

                    </h2>



                    <p className="

                        text-slate-500

                        text-sm

                    ">

                        Upload a resume and let AI evaluate candidate suitability.

                    </p>


                </div>


            </div>








            <form

                onSubmit={handleSubmit}

                className="space-y-6"

            >






                <div>


                    <label className="

                        block

                        text-sm

                        font-semibold

                        text-slate-700

                        mb-2

                    ">

                        Job Requirement

                    </label>



                    <textarea

                        value={jobRequirement}

                        onChange={(e)=>

                            setJobRequirement(e.target.value)

                        }

                        placeholder="Example: Senior QA Engineer with Selenium, API Testing, SQL, Python"

                        className="

                            w-full

                            h-32

                            rounded-2xl

                            border

                            border-slate-200

                            p-4

                            focus:ring-2

                            focus:ring-blue-500

                            outline-none

                            resize-none

                        "

                    />


                </div>








                <div>


                    <label className="

                        block

                        text-sm

                        font-semibold

                        text-slate-700

                        mb-2

                    ">

                        Resume PDF

                    </label>





                    <label className="

                        flex

                        flex-col

                        items-center

                        justify-center

                        border-2

                        border-dashed

                        border-slate-300

                        rounded-3xl

                        p-8

                        cursor-pointer

                        hover:border-blue-500

                        hover:bg-blue-50

                        transition

                    ">


                        <UploadCloud

                            size={40}

                            className="text-blue-600 mb-3"

                        />



                        <p className="

                            font-semibold

                            text-slate-700

                        ">

                            Drop your resume here

                        </p>



                        <p className="

                            text-sm

                            text-slate-500

                            mt-1

                        ">

                            or click to browse PDF file

                        </p>



                        <input

                            type="file"

                            accept=".pdf"

                            className="hidden"

                            onChange={(e)=>

                                setFile(e.target.files[0])

                            }

                        />



                    </label>







                    {

                        file && (


                            <div className="

                                mt-4

                                flex

                                items-center

                                gap-3

                                bg-slate-50

                                rounded-xl

                                p-3

                            ">


                                <FileText

                                    className="text-blue-600"

                                    size={20}

                                />


                                <span className="text-sm">

                                    {file.name}

                                </span>


                            </div>


                        )

                    }



                </div>








                <button

                    type="submit"

                    disabled={loading}

                    className="

                        w-full

                        rounded-2xl

                        py-4

                        font-semibold

                        text-white

                        bg-gradient-to-r

                        from-blue-600

                        to-indigo-700

                        hover:scale-[1.02]

                        transition

                        shadow-lg

                        disabled:opacity-50

                    "

                >


                    {

                        loading

                        ?

                        "Analyzing Candidate..."

                        :

                        "Analyze Candidate with AI"

                    }



                </button>







                {

                    message && (

                        <p className="

                            text-sm

                            text-center

                            text-slate-600

                        ">

                            {message}

                        </p>

                    )

                }



            </form>




        </div>


    );


}



export default ResumeUpload;