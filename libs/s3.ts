import * as AWS from "aws-sdk";

// Configura las credenciales y la región de AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

// Crea una instancia de S3
const s3 = new AWS.S3();

// Función para cargar la imagen a S3 desde una URI de datos
export async function uploadImageToS3(
  dataUri: string,
  bucketName: string,
  fileName: string
): Promise<string> {
  // Convierte la URI de datos en un búfer
  // Convierte la URI de datos en un búfer
  const uriParts = dataUri.split(";base64,");
  const mimeType = uriParts[0].split(":")[1];
  const imageData = uriParts[1];
  const fileBuffer = Buffer.from(imageData, "base64");

  // Configura los parámetros para la carga a S3
  const params: AWS.S3.PutObjectRequest = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType, // Establece el tipo de contenido según tu necesidad
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    console.error("Error al cargar la imagen a S3:", error);
    throw error;
  }
}
