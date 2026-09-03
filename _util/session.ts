import { auth } from "@/auth";
import { cache } from "react";
import { GetUserVerified } from "@/_lib/services/user.verified";

const GetSession = cache(async () => {
  const token = await auth();
  const session = token?.user;
  const publicId = session?.publicId as string | null;
  const name = session?.name as string | null;
  const userModel = session?.userModel as string | null;

  if (!publicId) {
    return {
      publicId: null,
      name: null,
      userModel: null,
    };
  }

  const verified = await GetUserVerified(publicId, userModel);

  if (verified) {
    return {
      publicId,
      name,
      verified: verified,
    };
  } else {
    return {
      verified: verified,
    };
  }
});

export default GetSession;
