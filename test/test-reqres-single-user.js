const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJsonSchema = require('chai-json-schema');
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

// Test data
// Constants
const BASE_URL = 'https://reqres.in';
const FIRST_USER_ENDPOINT = '/api/users/1';

// User data (Typically I query a DB, to compare an API response to a data from a database, providing hardcoded test data in this case)
const EXPECTED_USER_DATA = {
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
}

const EXPECTED_SUPPORT_DATA = {
    url: 'https://reqres.in/#support-heading',
    text: 'To keep ReqRes free, contributions towards server costs are appreciated!'
}

// Expected attributes
const RESPONSE_BODY_ATTRIBUTES = ['data', 'support'];

// Json Schema
const USER_JSON_SCHEMA = {
    type: 'object',
    required: ['data', 'support'],
    properties: {
        data: {
            type: 'object',
            required: ['id', 'email', 'first_name', 'last_name', 'avatar'],
            properties: {
                id: {
                    type: 'number'
                },
                email: {
                    type: 'string'
                },
                first_name: {
                    type: 'string'
                },
                last_name: {
                    type: 'string'
                },
                avatar: {
                    type: 'string'
                }
            }
        },
        support: {
            type: 'object',
            required: ['url', 'text'],
            properties: {
                url: {
                    type: 'string'
                },
                text: {
                    type: 'string'
                }
            }
        }
    }
}

// Tests
describe(`Test ${BASE_URL + FIRST_USER_ENDPOINT} endpoint`, () => {
    let endpointResponse;
    let timeStart;
    let timeFinish;

    it('Should get 200 response', (done) => {
        console.log(`Requesting the ${BASE_URL + FIRST_USER_ENDPOINT} endpoint: start...`);
        timeStart = Date.now();

        chai.request(BASE_URL)
            .get(FIRST_USER_ENDPOINT)
            .end((err, res) => {
                // Verify no errors thrown
                expect(err).to.be.null;

                // Verify status code
                expect(res).to.have.status(200);

                // Store response into variable
                endpointResponse = res.body;

                timeFinish = Date.now();
                console.log(`Request to the ${BASE_URL + FIRST_USER_ENDPOINT} endpoint: succesfull! \nTime taken ${timeFinish - timeStart} ms`);

                // Call done to signal callback end
                done();
            });
    });

    it('Should verify body attributes and JSON Schema', (done) => {
        // Verify response contains expected attributes
        console.log('Validating response attributes: start...');
        expect(endpointResponse).to.contain.keys(RESPONSE_BODY_ATTRIBUTES);
        console.log('Validating response attributes: passed!');

        // Validate JSON schema
        console.log('Validating JSON Schema: start...');
        expect(endpointResponse).to.be.jsonSchema(USER_JSON_SCHEMA);
        console.log('Validating JSON Schema: passed!');
       
        // Call done to signal callback end
        done();
    });

    it('Should verify first user data from response', (done) => {
        // Verify data from response
        const userInfoFromResponse = endpointResponse.data;
        const supportInfoFromResponse = endpointResponse.support;

        // User validation
        console.log('Validating User data: start...');
        expect(userInfoFromResponse.id).to.be.equal(EXPECTED_USER_DATA.id);
        expect(userInfoFromResponse.email).to.be.equal(EXPECTED_USER_DATA.email);
        expect(userInfoFromResponse.first_name).to.be.equal(EXPECTED_USER_DATA.first_name);
        expect(userInfoFromResponse.last_name).to.be.equal(EXPECTED_USER_DATA.last_name);
        expect(userInfoFromResponse.avatar).to.be.equal(EXPECTED_USER_DATA.avatar);
        console.log('Validating User data: passed!');

        // Support validation
        console.log('Validating Support data: start...');
        expect(supportInfoFromResponse.url).to.be.equal(EXPECTED_SUPPORT_DATA.url);
        expect(supportInfoFromResponse.text).to.be.equal(EXPECTED_SUPPORT_DATA.text);
        console.log('Validating Support data: passed!');

        // Call done to signal callback end
        done();  
    });
});