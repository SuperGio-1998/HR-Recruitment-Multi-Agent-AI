import {
    CheckCircle,
    FileSearch,
    Brain,
    Sparkles
} from "lucide-react";



function AIActivity() {



    const activities = [


        {
            icon: FileSearch,

            title: "Resume Analysis Completed",

            description:
                "Resume document successfully parsed and information extracted.",

            time:
                "Latest evaluation"

        },


        {
            icon: Brain,

            title: "AI Skill Matching Finished",

            description:
                "Candidate skills compared against job requirements.",

            time:
                "AI evaluation completed"

        },


        {
            icon: Sparkles,

            title: "Recommendation Generated",

            description:
                "AI created hiring decision and confidence score.",

            time:
                "Decision ready"

        },


        {
            icon: CheckCircle,

            title: "Recruitment Process Complete",

            description:
                "Candidate evaluation is available for recruiter review.",

            time:
                "Completed"

        }


    ];







    return (


        <div className="

            bg-white

            rounded-3xl

            shadow-lg

            border

            border-slate-200

            p-8

        ">



            <div className="mb-8">


                <h2 className="

                    text-2xl

                    font-bold

                    text-slate-800

                ">

                    AI Processing Activity

                </h2>



                <p className="

                    text-slate-500

                    mt-1

                ">

                    Track AI recruitment workflow activities

                </p>


            </div>







            <div className="space-y-6">


                {


                    activities.map((activity, index) => {


                        const Icon = activity.icon;



                        return (


                            <div

                                key={index}

                                className="

                                    flex

                                    gap-4

                                    items-start

                                "

                            >



                                <div className="

                                    w-12

                                    h-12

                                    rounded-2xl

                                    bg-blue-50

                                    flex

                                    items-center

                                    justify-center

                                    shrink-0

                                ">


                                    <Icon

                                        size={24}

                                        className="text-blue-600"

                                    />


                                </div>







                                <div>


                                    <h3 className="

                                        font-semibold

                                        text-slate-800

                                    ">

                                        {activity.title}

                                    </h3>



                                    <p className="

                                        text-sm

                                        text-slate-500

                                        mt-1

                                    ">

                                        {activity.description}

                                    </p>



                                    <span className="

                                        text-xs

                                        text-blue-600

                                        mt-2

                                        block

                                    ">

                                        {activity.time}

                                    </span>


                                </div>





                            </div>


                        );


                    })


                }


            </div>





        </div>


    );


}




export default AIActivity;