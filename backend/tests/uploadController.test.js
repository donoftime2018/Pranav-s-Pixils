const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const cloudinaryConfigPath = require.resolve('../config/cloudinaryConfig');
const controllerPath = require.resolve('../controllers/fileUploadController');

function loadController(cloudinaryStub) {
  const previous = require.cache[cloudinaryConfigPath];
  require.cache[cloudinaryConfigPath] = { exports: cloudinaryStub };
  delete require.cache[controllerPath];

  const controller = require('../controllers/fileUploadController');

  return {
    controller,
    restore() {
      if (previous) {
        require.cache[cloudinaryConfigPath] = previous;
      } else {
        delete require.cache[cloudinaryConfigPath];
      }
      delete require.cache[controllerPath];
    }
  };
}

test('uploadFile accepts req.files array uploads', async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pixils-upload-'));
  const filePath = path.join(tempDir, 'sample.jpg');
  fs.writeFileSync(filePath, 'abc');

  const fakeCloudinary = {
    uploader: {
      upload: async (uploadedPath) => ({ url: `https://cloudinary.test/${path.basename(uploadedPath)}` })
    }
  };

  const { controller, restore } = loadController(fakeCloudinary);

  try {
    let statusCode = 200;
    let payload;
    const res = {
      status(code) {
        statusCode = code;
        return this;
      },
      json(body) {
        payload = body;
        return this;
      }
    };

    await controller({ files: [{ path: filePath }] }, res);

    assert.equal(statusCode, 200);
    assert.deepEqual(payload.urls, ['https://cloudinary.test/sample.jpg']);
    assert.equal(fs.existsSync(filePath), false);
  } finally {
    restore();
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('uploadFile rejects missing files', async () => {
  const fakeCloudinary = {
    uploader: {
      upload: async () => ({ url: 'https://cloudinary.test/ignored.jpg' })
    }
  };

  const { controller, restore } = loadController(fakeCloudinary);

  try {
    let statusCode = 200;
    let payload;
    const res = {
      status(code) {
        statusCode = code;
        return this;
      },
      json(body) {
        payload = body;
        return this;
      }
    };

    await controller({}, res);

    assert.equal(statusCode, 400);
    assert.deepEqual(payload, { message: 'No file uploaded' });
  } finally {
    restore();
  }
});
