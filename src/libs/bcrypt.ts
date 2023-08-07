import bcrypt from "bcrypt";

export const compare = async (
  password: string,
  hashedPass: string
): Promise<boolean> => {
  try {
    const result = await bcrypt.compare(password, hashedPass);
    return result;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

export const generate = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10; // You can adjust this according to your needs
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error generating hashed password");
  }
};
