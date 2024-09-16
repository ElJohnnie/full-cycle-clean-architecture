import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for products", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                type: "a",
                name: "Smartphone",
                price: 699,
            });

            console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Smartphone");
        expect(response.body.price).toBe(699);
    });

    it("should not create a product with missing fields", async () => {
        const response = await request(app).post("/products").send({
            name: "Smartphone",
        });
        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const response1 = await request(app)
            .post("/products")
            .send({
                type: "a",
                name: "Smartphone",
                price: 699,
            });
        expect(response1.status).toBe(200);

        const response2 = await request(app)
            .post("/products")
            .send({
                type: "a",
                name: "Refrigerator",
                price: 999,
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/products").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const product1 = listResponse.body.products[0];
        expect(product1.name).toBe("Smartphone");
        expect(product1.price).toBe(699);
        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Refrigerator");
        expect(product2.price).toBe(999);

        const listResponseXML = await request(app)
            .get("/products")
            .set("Accept", "application/xml")
            .send();

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<products>`);
        expect(listResponseXML.text).toContain(`<product>`);
        expect(listResponseXML.text).toContain(`<name>Smartphone</name>`);
        expect(listResponseXML.text).toContain(`<price>699</price>`);
        expect(listResponseXML.text).toContain(`</product>`);
        expect(listResponseXML.text).toContain(`<name>Refrigerator</name>`);
        expect(listResponseXML.text).toContain(`<price>999</price>`);
        expect(listResponseXML.text).toContain(`</products>`);
    });
});