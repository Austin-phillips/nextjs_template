export async function POST(req: Request) {
  const body = await req.json();
  const { email, code } = body;

  const isValid = code === '123456';

  if (!isValid) {
    return Response.json({ message: 'Invalid code' }, { status: 400 });
  }

  return Response.json({ message: 'Data is valid' });
}