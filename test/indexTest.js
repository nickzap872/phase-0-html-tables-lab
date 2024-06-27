const chai = require("chai");
const fs = require("fs");
const path = require("path");
const globalJsdom = require("global-jsdom");

chai.use(require("chai-dom"));
const { expect } = chai;

const html = fs.readFileSync(path.resolve(__dirname, "..", "index.html"), "utf-8");

globalJsdom(html);

describe("index.html", () => {
  describe("valid document structure", () => {
    it("has a DOCTYPE tag", () => {
      expect(html).to.contain("<!DOCTYPE html>");
    });

    it("has opening and closing HTML tags", () => {
      expect(html).to.contain("<html");
      expect(html).to.contain("</html>");
    });

    it("has <head> and <body> tags nested in the <html> tag", () => {
      expect(html).to.contain("<head>");
      expect(html).to.contain("</head>");
      expect(html).to.contain("<body>");
      expect(html).to.contain("</body>");
    });

    it("has a language attribute in the <html> tag", () => {
      const htmlElement = document.querySelector("html");
      expect(htmlElement).to.have.attribute("lang", "en");
    });
  });

  describe("valid table structure", () => {
    it("has a table element", () => {
      const table = document.querySelector("table");
      expect(table).to.exist;
    });

    it("has a header row with three headers", () => {
      const headers = document.querySelectorAll("table thead tr th");
      expect(headers.length).to.equal(3);
      expect(headers[0]).to.contain.text("City");
      expect(headers[1]).to.contain.text("State");
      expect(headers[2]).to.contain.text("2017 estimate");
    });

    it("has four rows of city data", () => {
      const rows = document.querySelectorAll("table tbody tr");
      expect(rows.length).to.equal(4); // 4 data rows

      const data = [
        ["New York", "New York", "8,622,698"],
        ["Los Angeles", "California", "3,999,759"],
        ["Chicago", "Illinois", "2,716,450"],
        ["Houston", "Texas", "2,312,717"]
      ];

      data.forEach((cityData, index) => {
        const cells = rows[index].querySelectorAll("td");
        expect(cells.length).to.equal(3); // Each row should have 3 cells
        expect(cells[0]).to.contain.text(cityData[0]);
        expect(cells[1]).to.contain.text(cityData[1]);
        expect(cells[2]).to.contain.text(cityData[2]);
      });
    });
  });
});
