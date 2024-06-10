const {glob} = require('glob');
const { compileFromFile } = require('json-schema-to-typescript');
const fs = require('fs');

// Function to generate TypeScript from schema.json
const generateTypes = async (file) => {
    try {
        const outputFile = file.replace('schema.json', 'schema.d.ts');
        const ts = await compileFromFile(file);
        fs.writeFileSync(outputFile, ts);
    } catch (error) {
        console.error(`Error generating types for ${file}: `, error)
    }
};

// Find all schema.json files
try {
    const schemas = glob.sync('src/**/schema.json');
    if (schemas.length === 0) {
        console.log('No schema.json files found');
        return;
    }

    schemas.forEach(generateTypes);
} catch (error) {
    console.error('Error finding schema.json files: ', error);
}
