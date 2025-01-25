export async function POST(req: Request) {
  const body = await req.json();
  const { email, code } = body;

  // TODO: Send code via Email
  return Response.json({ message: 'Data is valid' });
}