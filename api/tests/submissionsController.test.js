const request = require("supertest");
const controller=require("../../app.js");

var path="/v1/submissions/";
var existingSubmission;

function createSubmissions(data){
    return request(controller).post(path)
        .set('Content-Type', 'application/json')
        .set('Accept','application/json')
        .send(data);
}

function modifySubmission(id,data){
    return request(controller).put(path+id)
        .set('Content-Type', 'application/json')
        .set('Accept','application/json')
        .send(data);
}

function lookUpSubmission(id){
    return request(controller).get(path+id);
}
function removeSubmission(id){
    return request(controller).delete(path+id);
}
/*
test("",async () => {
});
*/
test("GET /submissions should return 200 if there are submissions, 404 otherwise",async () => {
    const response = await request(controller).get(path);
    if(response.body.length>0){
        expect(response.status).toBe(200);
    }else{
        expect(response.status).toBe(404);
    }
});
test("POST /submission should return 400 if the body is empty", async () => {
    const response = await createSubmissions();
    expect(response.status).toBe(400);
});
test("POST /submissions should return 400 if any of the submissions data are not present",async () => {
    
    let submission = {
        Exam : 123,
        Workgroup : [1,2,3],
        Answers : ["Another","one","bites","the","dust"]
    }
    let submission1 = {
        Exam : 123,
        Workgroup : [1,2,3]
    }
    let submission2 = {
        Workgroup : [1,2,3],
        Answers : ["Another","one","bites","the","dust"]
    }
    let submission3 = {
        Exam : 123,
        Answers : ["Another","one","bites","the","dust"]
    }
    
    let data = [submission,submission1,submission2,submission3];
    
    const response1 = await createSubmissions(submission1);
    expect(response1.status).toBe(400);
    
    const response2 = await createSubmissions(submission2);
    expect(response2.status).toBe(400);
    
    const response3 = await createSubmissions(submission3);
    expect(response3.status).toBe(400);
    
    const response4 = await createSubmissions(data);
    expect(response4.status).toBe(400);
});

test("POST /submissions should return 400 if 'Exam' or any object of 'Workgroup' are not numbers",async () => {
    let submission1 = {
        Exam : "Anonymous",
        Workgroup : [1,2,3],
        Answers : ["Another","one","bites","the","dust"]
    }
    let submission2 = {
        Exam : 123,
        Workgroup : ["Incognito",2,3],
        Answers : ["Another","one","bites","the","dust"]
    }
    let submission3 = {
        Exam : 123,
        Workgroup : {Vault:101},
        Answers : ["Another","one","bites","the","dust"]
    }
    const response1 = await createSubmissions(submission1);
    expect(response1.status).toBe(400);
    
    const response2 = await createSubmissions(submission2);
    expect(response2.status).toBe(400);
    
    const response3 = await createSubmissions(submission3);
    expect(response3.status).toBe(400);
});

test("POST /submissions should return 201 if the submission or all the items in an array of submissions are well formed",async () => {

    let submission1 = {
        Exam : 123,
        Workgroup : [1,2,3],
        Answers : ["Another","one","bites","the","dust"]
    }
    
    let submission2 = {
        Exam : 456,
        Workgroup : [4,5,6],
        Answers : ["Pablo","Diego","José","Francisco","de","Paula","Juan","Nepomuceno","María","de","los","Remedios","Cipriano de","la","Santísima","Trinidad","Ruiz","y","Picasso"]
    }
    let submission3 = {
        Exam : 789,
        Workgroup : [7,8,9],
        Answers : ["Hello","darkness","my","old","friend"]
    }
    
    let data = [submission1,submission2,submission3];
    
    const response1 = await createSubmissions(submission1);
    existingSubmission=response1.body[0];
    expect(response1.status).toBe(201);
    
    const responseData = await createSubmissions(data);

    expect(responseData.status).toBe(201);
    
});
test("GET /submission/id should returns 400 if no id is provided",async () => {
    const response = await lookUpSubmission();
    expect(response.status).toBe(400);
});
test("GET /submission/id should returns 200 if the submission is present, 404 otherwise.",async () => {
    const response = await lookUpSubmission(existingSubmission);
    expect(response.status).toBe(200);
    
    const response1 = await lookUpSubmission("5c0c3f887ad3f41fa0b042d1");
    expect(response1.status).toBe(404);
});
test("GET /submission/id should returns 400 if the id is not an hexadecimal number of exactly 24 digits.",async () => {
    const response = await lookUpSubmission("5c0cff8870d3f41f70b042d73c4001");
    expect(response.status).toBe(400);
    const response1 = await lookUpSubmission("3202258926");
    expect(response1.status).toBe(400);
});
test("PUT /submission/id should returns 400 if no id is provided or if the id is not an hexadecimal number of exactly 24 digits",async () => {

    let submission = {
        Exam : "11223344aabbcc",
        Workgroup : [99,98,97],
        Answers : ["Sir","Integra","Fairbrook","Wingates","Hellsing"]
    }
    const response = await modifySubmission("abcdefg",submission);
    expect(response.status).toBe(400);

    const response1 = await modifySubmission("5c0cff8870d3f41f70b042d7abc",submission);
    expect(response1.status).toBe(400);
});

test("PUT /submission/id should returns 400 if the data are not properly defined",async () => {

    let submission1 = {
        Exam : "11aabb3bf4910g",
        Workgroup : [99,98,97],
        Answers : ["Sir","Integra","Fairbrook","Wingates","Hellsing"]
    }
    let submission2 = {
        Exam : "11223344aabbcc",
        Workgroup : "1, 2, 3",
        Answers : ["Sir","Integra","Fairbrook","Wingates","Hellsing"]
    }
    let submission3 = {
        Exam : "11223344aabbcc",
        Workgroup : [99,98,97],
        Answers : "answers!"
    }
    
    const response1 = await modifySubmission("5c0cff8870d3f41f70b042d7",submission1);
    expect(response1.status).toBe(400);

    const response2 = await modifySubmission("5c0cff8870d3f41f70b042d7",submission2);
    expect(response2.status).toBe(400);
    
    const response3 = await modifySubmission("5c0cff8870d3f41f70b042d7",submission3);
    expect(response3.status).toBe(400);
    
});

test("PUT /submission/id should returns 204 if the id is present and submission data well defined, 404 if the id is not present",async () => {

    let submission = {
        Exam : "11223344aabbcc",
        Workgroup : [99,98,97],
        Answers : ["Sir","Integra","Fairbrook","Wingates","Hellsing"]
    }
    const response = await modifySubmission(existingSubmission,submission);
    expect(response.status).toBe(204);

    const response1 = await modifySubmission("5c0d397889741e4cfa581f30",submission);
    expect(response1.status).toBe(404);
});

test("DELETE /submission/id should returns 400 if no id is provided or if the id is not an hexadecimal number of exactly 24 digits",async () => {

    const response = await removeSubmission("abcdefg");
    expect(response.status).toBe(400);

    const response1 = await removeSubmission("5c0cff8870d3f41f70b042d7abc");
    expect(response1.status).toBe(400);
});

test("DELETE /submission/id should returns 204 if the id is present and submission data well defined, 404 if the id is not present",async () => {

    const response1 = await removeSubmission("5c0d397889741e4cfa581f30");
    expect(response1.status).toBe(404);
    
    const response = await removeSubmission(existingSubmission);
    expect(response.status).toBe(204);
    
});

















