// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import swaggerJson from '../Core/swaggerJson.js';


const docsDir = path.join(CONSTANTS.DIR, 'docs');

const port = (process.env.IS_CONTAINER) ? 8080 : 3000;

const server = `http://localhost:${port}`;

const document = await swaggerJson(docsDir, server);

export default swaggerJSDoc(document);
