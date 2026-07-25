import { useEffect, useState } from "react";
import { getCandidates } from "../../services/api";

import {
    Users,
    TrendingUp,
    CheckCircle,
    XCircle
} from "lucide-react";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";



function Analytics() {


    const [stats, setStats] = useState({

        total: 0,

        hire: 0,

        reject: 0,

        average: 0

    });





    useEffect(() => {

        loadAnalytics();

    }, []);







    const loadAnalytics = async () => {


        try {


            const data = await getCandidates();


            const candidates = data.results || [];



            const total = candidates.length;



            const hire = candidates.filter(

                c => c.decision?.toLowerCase() === "hire"

            ).length;



            const reject = candidates.filter(

                c => c.decision?.toLowerCase() === "reject"

            ).length;



            const average = total

                ? Math.round(

                    candidates.reduce(

                        (sum, c) =>

                            sum + c.match_percentage,

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



        } catch (error) {


            console.error(error);


        }


    };









    const chartData = [


        {

            name: "Hire",

            value: stats.hire

        },


        {

            name: "Reject",

            value: stats.reject

        }


    ];





    const COLORS = [

        "#22c55e",

        "#ef4444"

    ];









    return (


        <div className="space-y-6 mt-8">





            <div>


                <h2 className="

                    text-2xl

                    font-bold

                    text-slate-800

                ">

                    AI Recruitment Analytics

                </h2>



                <p className="

                    text-slate-500

                    mt-1

                ">

                    Insights from AI candidate evaluations

                </p>


            </div>









            <div className="

                grid

                grid-cols-1

                md:grid-cols-2

                xl:grid-cols-4

                gap-6

            ">






                <AnalyticsCard

                    icon={Users}

                    title="Evaluations"

                    value={stats.total}

                    text="Total candidates"

                />



                <AnalyticsCard

                    icon={CheckCircle}

                    title="Hire Rate"

                    value={

                        stats.total

                        ?

                        Math.round(

                            (stats.hire / stats.total)

                            *

                            100

                        )

                        :

                        0

                    }

                    text="% successful matches"

                />



                <AnalyticsCard

                    icon={XCircle}

                    title="Reject Rate"

                    value={

                        stats.total

                        ?

                        Math.round(

                            (stats.reject / stats.total)

                            *

                            100

                        )

                        :

                        0

                    }

                    text="% rejected"

                />



                <AnalyticsCard

                    icon={TrendingUp}

                    title="Average Score"

                    value={`${stats.average}%`}

                    text="AI matching score"

                />





            </div>









            <div className="

                bg-white

                rounded-3xl

                shadow-lg

                border

                border-slate-200

                p-8

            ">



                <h3 className="

                    text-xl

                    font-bold

                    text-slate-800

                    mb-6

                ">

                    Hiring Decision Distribution

                </h3>





                <div className="h-[300px]">


                    <ResponsiveContainer

                        width="100%"

                        height="100%"

                    >


                        <PieChart>


                            <Pie

                                data={chartData}

                                dataKey="value"

                                nameKey="name"

                                cx="50%"

                                cy="50%"

                                outerRadius={100}

                                label

                            >


                                {

                                    chartData.map(

                                        (entry, index) => (


                                            <Cell

                                                key={index}

                                                fill={COLORS[index]}

                                            />


                                        )

                                    )

                                }


                            </Pie>


                            <Tooltip />


                            <Legend />



                        </PieChart>


                    </ResponsiveContainer>


                </div>


            </div>






        </div>


    );


}







function AnalyticsCard({

    icon: Icon,

    title,

    value,

    text

}) {


    return (


        <div className="

            bg-white

            rounded-3xl

            border

            border-slate-200

            shadow-lg

            p-6

            hover:-translate-y-1

            transition

        ">


            <div className="

                flex

                justify-between

                items-start

            ">



                <div>


                    <p className="

                        text-sm

                        text-slate-500

                    ">

                        {title}

                    </p>



                    <h3 className="

                        text-4xl

                        font-bold

                        text-slate-800

                        mt-3

                    ">

                        {value}

                    </h3>



                    <p className="

                        text-sm

                        text-slate-500

                        mt-2

                    ">

                        {text}

                    </p>


                </div>




                <Icon

                    size={30}

                    className="text-blue-600"

                />



            </div>


        </div>


    );


}




export default Analytics;