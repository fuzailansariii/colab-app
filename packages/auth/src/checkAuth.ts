import { getServerSession } from "next-auth";
import { authOptions } from "./options";

export async function auth() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.id) {
    return null;
  }
  const userId = session.user.id;
  return { userId, session };
}
