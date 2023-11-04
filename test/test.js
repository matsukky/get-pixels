const fs = require("fs");
const path = require("path");
const ndarray = require("ndarray");
const getPixels = require("../node-pixels.js")


var EXPECTED_IMAGE = ndarray(
[0,0,0,255,255,0,0,255,255,255,0,255,255,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,255,0,255,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],[16,8,4],[4,64,1])

function testImage(img, tol) {
  expect(img.shape[0]).toBe(16);
  expect(img.shape[1]).toBe(8);

  for (let i = 0; i < 16; ++i) {
    for (let j = 0; j < 8; ++j) {
      for (let k = 0; k < 3; ++k) {
        if (tol) {
          expect(Math.abs(img.get(i, j, k) - EXPECTED_IMAGE.get(i, j, k))).toBeLessThan(tol);
        } else {
          expect(img.get(i, j, k)).toBe(EXPECTED_IMAGE.get(i, j, k));
        }
      }
    }
  }
}

describe("get-pixels", () => {
  test("get-pixels-png", (done) => {
    getPixels("test/lena.png", (err, pixels) => {
      if (err) {
        expect(false).toBe(true);
      } else {
        expect(pixels.shape.join(",")).toBe("512,512,4");
      }
      done();
    });
  });

  test("get-pixels-png", (done) => {
    getPixels("test/test_pattern.png", (err, pixels) => {
      if (err) {
        console.error(err);
        done.fail("failed to parse png");
        return;
      }
      testImage(pixels);
      done();
    });
  });

  test("get-pixels-jpg", (done) => {
    getPixels("test/test_pattern.jpg", (err, pixels) => {
      if (err) {
        console.error(err);
        done.fail("failed to parse jpg");
        return;
      }
      testImage(pixels, 4);
      done();
    });
  });

  test("get-pixels-gif", (done) => {
    getPixels("test/test_pattern.gif", (err, pixels) => {
      if (err) {
        console.error(err);
        done.fail("failed to parse gif");
        return;
      }
      testImage(pixels.pick(0));
      done();
    });
  });

  test("data url", (done) => {
    const url = "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7";
    getPixels(url, (err, data) => {
      if (err) {
        console.error(err);
        done.fail("failed to read data url");
        return;
      }
      expect(true).toBe(true); // data url opened without crashing
      done();
    });
  });

  test("get-pixels-buffer", (done) => {
    const buffer = fs.readFileSync(path.join(__dirname, "test_pattern.png"));
    getPixels(buffer, "image/png", (err, pixels) => {
      if (err) {
        console.error(err);
        done.fail("failed to parse buffer");
        return;
      }
      testImage(pixels);
      done();
    });
  });

   test("get-url png img", (done) => {
    const url = "https://raw.githubusercontent.com/matsukky/get-pixels/master/test/test_pattern.png";
    getPixels(url, (err, pixels) => {
      if (err) {
        console.error("Error:", err);
        done.fail("failed to read web image data");
        return;
      }
      testImage(pixels);
      done();
    });
  });

  test("get-url jpg img", (done) => {
    const url = "https://raw.githubusercontent.com/matsukky/get-pixels/master/test/test_pattern.jpg";
    getPixels(url, (err, pixels) => {
      if (err) {
        console.error("Error:", err);
        done.fail("failed to read web image data");
        return;
      }
      testImage(pixels, 4);
      done();
    });
  });

  test("get-url gif img", (done) => {
    const url = "https://raw.githubusercontent.com/matsukky/get-pixels/master/test/test_pattern.gif";
    getPixels(url, (err, pixels) => {
      if (err) {
        console.error("Error:", err);
        done.fail("failed to read web image data");
        return;
      }
      testImage(pixels.pick(0));
      done();
    });
  });
});