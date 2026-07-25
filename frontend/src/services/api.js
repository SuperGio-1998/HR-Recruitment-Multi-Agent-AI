import axios from "axios";



const API_URL = "http://127.0.0.1:8000";





export const getCandidates = async (filters = {}) => {


    const params = {};



    if (filters.name) {

        params.name = filters.name;

    }



    if (filters.decision) {

        params.decision = filters.decision;

    }



    if (filters.min_score) {

        params.min_score = filters.min_score;

    }



    if (filters.sort) {

        params.sort = filters.sort;

    }






    const response = await axios.get(

        `${API_URL}/candidates`,

        {

            params

        }

    );



    return response.data;


};







export const getCandidateDetail = async (candidate_id) => {


    const response = await axios.get(

        `${API_URL}/candidate/${candidate_id}`

    );



    return response.data;


};