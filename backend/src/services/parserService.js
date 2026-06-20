import pdfParse from "pdf-parse";
import fs from "fs";
export const parseResume = async (filePath) => {
  const pdfBuffer = fs.readFileSync(filePath);

  const data = await pdfParse(pdfBuffer);

  return data.text;
};