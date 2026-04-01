import data from "../../../data/cases.json";

export async function GET() {
  return Response.json(data);
}
