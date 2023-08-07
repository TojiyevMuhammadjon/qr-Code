import { Request, Response } from "express";
import { IAuthLogin, IAuthRegister, IUser } from "../../types/auth.types";
import Users from "../../models/users.scheme";
import { compare, generate } from "../../libs/bcrypt";
import { sign, verify } from "../../libs/jwt";
import qrCode from "qrcode";
import { v4 as uuid } from "uuid";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const user: IUser | null = await Users.findOne({ username });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid password" });
      } else {
        const user_id: any = user._id?.toString(); // Use optional chaining operator to check if _id is defined
        if (!user_id) {
          res.status(500).json({ message: "User ID is undefined" });
          return;
        }

        const token = sign({ userId: user_id });
        const imagename = `${uuid()}.png`;
        const pathimages = process.cwd() + "/uploads/" + imagename;

        await qrCode.toFile(`${pathimages}`, user_id, {
          color: {
            dark: "#3735a2",
            light: "#f8f9fa",
          },
        });
        res.status(200).json({ token });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
};

export const loginIn = async (req: Request, res: Response): Promise<void> => {
  res.render("login");
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, username, password, city } = req.body;

  try {
    const existingUser: IUser | null = await Users.findOne({ username });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
    } else {
      const hashedPassword = await generate(password);

      const imagename = `${uuid()}.png`;

      const newUser = new Users({
        name,
        username,
        password: hashedPassword,
        city,
        imagename,
      });
      await newUser.save();

      const pathimages = process.cwd() + "/uploads/" + imagename;

      await qrCode.toFile(`${pathimages}`, newUser.id, {
        color: {
          dark: "#3735a2",
          light: "#f8f9fa",
        },
      });
      // const qrCodeImagePath = `${process.cwd() + "/uploads/" + imagename}`; // Save the image name (e.g., "abc123.png") instead of the full path

      const qrCodeDataUrl = await qrCode.toDataURL(newUser.id.toString(), {
        color: {
          dark: "#3735a2",
          light: "#f8f9fa",
        },
      });
  
      // Send the QR code data URL back to the client along with the success message
      res.status(201).json({
        message: "User registered successfully",
        imageUrl: qrCodeDataUrl,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error during registration", error });
  }
};

export const registerIn = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.render("register");
};
