import EmailVerification from "@/models/email_verifications";

export const createEmailVerification = async (uuid: string, user_id: string) => {
  const hourFromNow = new Date(Date.now() + 1000 * 3600);
  const newEmail = new EmailVerification({
    secret_code: uuid,
    expires_in: hourFromNow,
    user_id,
  });
  await newEmail.save()
};
