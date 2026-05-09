import { API_ENDPOINTS } from "./apiDetails";

export const authService = {
    register: async(name, email, password)=>{
        const response = await fetch(API_ENDPOINTS.auth.signup, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, password})
        });
       const data = await response.json();
       if(!response.ok) throw new Error(data.message || 'Signup failed')
        return data;
    },

    login: async(email,password)=>{
        const response = await fetch(API_ENDPOINTS.auth.login, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });
       const data = await response.json();
       if(!response.ok) throw new Error(data.message || 'Login failed')
       if(data.token) {
        sessionStorage.setItem('token', data.token);
       }
        return data;
    },
    getToken: () => {
        return sessionStorage.getItem('token');
    }

}