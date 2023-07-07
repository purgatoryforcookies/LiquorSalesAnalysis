import axios from "axios";
import { LiquorSchema } from "./types";
import { QueryFunctionContext } from "react-query";
import { ZodError } from "zod";

const URL = 'http://localhost:3002'


const getSearchResults = async ({ queryKey }: QueryFunctionContext) => {

    return axios.get(URL + `/search?keyword=${queryKey[1]}`)
        .then(resp => {
            try {
                return LiquorSchema.parse(resp.data)
            } catch (error) {
                if (error instanceof ZodError) {
                    throw new Error('Invalid data')
                }
                else {
                    throw error
                }
            }
        })
}

const getEngineResults = async ({ queryKey }: QueryFunctionContext) => {

    return axios.get(URL + `/engine?id=${queryKey[1]}`)
        .then(resp => {
            try {
                return LiquorSchema.parse(resp.data)
            } catch (error) {
                if (error instanceof ZodError) {
                    throw new Error('Invalid data')
                }
                else {
                    throw error
                }
            }
        })
}

export { getSearchResults, getEngineResults }




