import {Services} from "./../../../Utility";

export const signupActions = {
    registerUser : (body) => {
        const dataset = {
            method : 'POST',
            body:JSON.stringify(body),
            'Access-Control-Allow-Origin': '*'
        };
        return Services.getData(dataset);
    }
}