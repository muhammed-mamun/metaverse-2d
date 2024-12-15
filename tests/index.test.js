const { default: axios } = require("axios");

const BACKEND_URL = "http://localhost:3000";

describe("Authentication", ()=>{
    test('User is able to sign up only once',async ()  => {
        const username = "jui" + Math.random(); //jui0.2134
        const password = "123456";
        const response =await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })
        expect(response.statusCode).toBe(200); //signup has succeded

        const updatedResponse =await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })
        expect(response.statusCode).toBe(400); //user already have an account

      });

    test('user signup request fails if the username is empty',async () => {
        const username = `jui${Math.random()}`;
        const password = '123456'
        const response =await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            password,
        })
        expect(response.statusCode).toBe(400);
    })  

    test('signin succeeds if the username and password are correct', async () => {
        const username = `jui${Math.random()}`;
        const password = '123456';

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: 'admin'
        });

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.token).toBeDefined()

    })

    test('signin succeeds if the username and password are incorrect', async () => {
        const username = `jui${Math.random()}`;
        const password = '123456';

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type:'admin'
        });

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username: "ksadkjfhasd",
            password
        })
        expect(response.statusCode).toBe(403) //403 status code for unauthorized
        expect(response.body.token).toBeDefined()

    })

})

describe("User Information Endpoints", () =>{
    let token = "";
    beforeAll( async() => {
        const username = `jui${Math.random()}`
        const password = '123456';
        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: 'admin'
        })

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })

        token = response.data.token
    })
})

