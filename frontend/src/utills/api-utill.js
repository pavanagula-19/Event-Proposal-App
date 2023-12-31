import axios from "axios";
import { getToken } from "./storage-utills";

const BASE_URL = "https://eventproposalserver-t0ww.onrender.com";


//TO GET ALL PROPOSALS
export function allProposal_api() {
    return axios.get(`${BASE_URL}/proposal`)
        .then(res => res)
        .catch(err => alert("FROM SERVER : " + err.message));
}

//TO GET ALL SELECTED PROPOSALS
export function allSelectedProposal_api(id) {
    return fetch(`${BASE_URL}/proposal/selected/${id}`)
        .then(res => res.json())
        .catch(err => alert("FROM SERVER : " + err.message));
}

// single vendor
export function singleVendor_api(id) {
    return axios.get(`${BASE_URL}/vendor/${id}`)
        .then(res => res)
        .catch(err => alert("FROM SERVER : " + err.message));
}

//TO GET ALL PROPOSALS (SPECIFIC)
export function allProposalByVendor_api(id) {

    return fetch(`${BASE_URL}/proposal/vendor/${id}`, {
        method: "GET",
        headers: {
            "Authorization": getToken()
        }
    })
        .then(res => res.json())
        .catch(err => alert("FROM SERVER : " + err.message));
}

//TO CREATE NEW PROPOSAL
export function newProposal_api(data) {

    return fetch(`${BASE_URL}/proposal`, {
        method: "POST",
        headers: {
            "Authorization": getToken()
        },
        body: data
    })
        .then(res => res.json())
        .catch(err => alert("FROM SERVER : " + err.message));
}

//TO EDIT THE PROPOSAL
export function editProposal_api(data, id) {

    return fetch(`${BASE_URL}/proposal/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": getToken()
        },
        body: data
    })
        .then(res => res.json())
        .catch(err => alert("FROM SERVER : " + err.message));
}

//TO DELETE THE PROPOSAL
export function deleteProposalByVendor_api(id) {

    return fetch(`${BASE_URL}/proposal/${id}`, {
        method: "DELETE",
        headers: { "Authorization": getToken() }
    })
        .then(res => res.json())
        .catch(err => alert("FROM SERVER : " + err.message));
}

//TO LOG IN
export function loginToAccount(data, boolean) {
    return fetch(`${BASE_URL}/${boolean}/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => alert("FROM SERVER : " + err.message));
}

//TO REGISTER
export function registerAnAccount(data, boolean) {
    return fetch(`${BASE_URL}/${boolean}/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => alert("FROM SERVER : " + err.message));
}

//TO UPDATE PROFILE PIC
export function updateUserDp(dp, id, boolean) {
    return fetch(`${BASE_URL}/${boolean}/${id}`, {
        method: "PUT",
        body: dp
    })
        .then(res => res.json())
        .catch(err => alert(err.message));
}

//TO CHECK SECRET
export function secretCheck(data, boolean) {
    return fetch(`${BASE_URL}/${boolean}/secret-check`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => alert("FROM SERVER : " + err.message));
}

//TO RESET PASSWORD
export function passwordReset(data, boolean) {
    return fetch(`${BASE_URL}/${boolean}/password-reset`, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => alert("FROM SERVER : " + err.message));
}

export default BASE_URL;
