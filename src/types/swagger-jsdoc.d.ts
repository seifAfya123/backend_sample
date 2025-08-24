declare module "swagger-jsdoc" {
  import { OAS3Definition, OAS3Options } from "swagger-jsdoc";

  export interface SwaggerDefinition {
    openapi: string;
    info: {
      title: string;
      version: string;
      description?: string;
    };
    servers?: { url: string }[];
  }

  export interface Options {
    definition: SwaggerDefinition;
    apis: string[];
  }

  export default function swaggerJsdoc(options: Options): object;
}
