import { useEffect, useState } from "react";
import axios from "axios";

import {
    Users,
    BadgeCheck,
    CircleX,
    Trophy
} from "lucide-react";



function SummaryCards() {


    const [stats, setStats] = useState({

        total: 0,

        hire: 0,

        reject: 0,

        average: 0

    });





    useEffect(() => {

        loadSummary();

    }, []);






    const loadSummary = async () => {


        try {


            const response = await axios.get(

                "http://127.0.0.1:8000/candidates"

            );


            const candidates = response.data.results || [];


            const total = candidates.length;


            const hire = candidates.filter(

                c => c.decision?.toLowerCase() === "hire"

            ).length;


            const reject = candidates.filter(

                c => c.decision?.toLowerCase() === "reject"

            ).length;


            const average =

                total > 0

                    ? Math.round(

                        candidates.reduce(

                            (sum, c) =>

                                sum + (c.match_percentage || 0),

                            0

                        ) / total

                    )

                    : 0;



            setStats({

                total,

                hire,

                reject,

                average

            });


        } catch (err) {

            console.error(err);

        }


    };






    const cards = [

        {

            title: "Total Candidates",

            value: stats.total,

            subtitle: "Evaluated resumes",

            icon: Users,

            bg: "from-blue-500 to-cyan-500"

        },

        {

            title: "Hire",

            value: stats.hire,

            subtitle: "Successful matches",

            icon: BadgeCheck,

            bg: "from-emerald-500 to-green-500"

        },

        {

            title: "Reject",

            value: stats.reject,

            subtitle: "Needs review",

            icon: CircleX,

            bg: "from-rose-500 to-red-500"

        },

        {

            title: "Average Score",

            value: `${stats.average}%`,

            subtitle: "Overall AI rating",

            icon: Trophy,

            bg: "from-amber-500 to-orange-500"

        }

    ];






    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


            {

                cards.map((card) => {


                    const Icon = card.icon;


                    return (


                        <div

                            key={card.title}

                            className="

                                bg-white

                                rounded-3xl

                                p-6

                                shadow-lg

                                border

                                border-slate-200

                                hover:shadow-2xl

                                hover:-translate-y-2

                                transition-all

                                duration-300

                                overflow-hidden

                                relative

                            "

                        >



                            <div className={`

                                absolute

                                top-0

                                left-0

                                h-2

                                w-full

                                bg-gradient-to-r

                                ${card.bg}

                            `}></div>





                            <div className="

                                flex

                                justify-between

                                items-start

                            ">



                                <div>


                                    <p className="

                                        text-sm

                                        text-slate-500

                                        font-medium

                                    ">

                                        {card.title}

                                    </p>



                                    <h2 className="

                                        text-5xl

                                        font-bold

                                        text-slate-800

                                        mt-4

                                    ">

                                        {card.value}

                                    </h2>



                                    <p className="

                                        text-sm

                                        text-slate-500

                                        mt-3

                                    ">

                                        {card.subtitle}

                                    </p>


                                </div>





                                <div className={`

                                    bg-gradient-to-r

                                    ${card.bg}

                                    w-16

                                    h-16

                                    rounded-2xl

                                    flex

                                    items-center

                                    justify-center

                                    shadow-lg

                                `}>


                                    <Icon

                                        size={30}

                                        className="text-white"

                                    />


                                </div>





                            </div>





                            <div className="

                                mt-6

                                w-full

                                bg-slate-200

                                rounded-full

                                h-2

                            ">


                                <div

                                    className={`

                                        h-2

                                        rounded-full

                                        bg-gradient-to-r

                                        ${card.bg}

                                    `}

                                    style={{

                                        width:

                                            card.title === "Average Score"

                                                ? `${stats.average}%`

                                                : "100%"

                                    }}

                                ></div>


                            </div>



                        </div>


                    );


                })

            }


        </div>

    );


}



export default SummaryCards;