import { UnprocessableEntity } from "@/main/adapters/http-response";

type BodySchemaType = "string" | "number" | "boolean" | "object" | "array";

type BodySchemaProps<T> = {
  schema: {
    [key in keyof T]?: { type: BodySchemaType; required: boolean };
  };
};

export const schema = <T>(data: T, schema: BodySchemaProps<T>["schema"]): T => {
  if (!data) throw new UnprocessableEntity("Missing body");

  const params: Record<string, string[]> = {
    missing: [],
    invalid: [],
  };

  for (const key in schema) {
    if (schema[key]?.type === "array") {
      if (!Array.isArray(data[key])) {
        params.invalid.push(key);
        continue;
      }
    } else if (schema[key]?.required && data[key] === undefined) {
      params.missing.push(key);
      continue;
    }

    if (typeof data[key] !== schema[key]?.type) params.invalid.push(key);
  }

  if (params.missing.length > 0 || params.invalid.length > 0)
    throw new UnprocessableEntity({error: params});

  return data;
};
